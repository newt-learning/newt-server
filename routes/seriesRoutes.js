const userDbConn = require("../connections/usersDbConn");
const requireLogin = require("../middleware/requireLogin");
const _ = require("lodash");

const Series = userDbConn.model("series");
const Content = userDbConn.model("content");

module.exports = (app) => {
  // GET request to fetch user's series'
  app.get("/api/series", requireLogin, (req, res) => {
    const userId = req.user.uid;

    Series.find({ _user: userId }, (error, series) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(series);
      }
    });
  });

  // POST request to add a series to DB
  app.post("/api/series/create", requireLogin, (req, res) => {
    const data = req.body;
    data._user = req.user.uid;
    data.dateAdded = Date.now();
    data.lastUpdated = Date.now();

    // Copy videos info to be later used to create individual content
    let contentToAdd = [...data.videos];
    // Delete the videos field in the data object so it isn't added into the
    // Series model
    delete data.videos;

    // Initialize Series with data passed. The _id will be used as a pointer in
    // Content. All that's left is adding all the contentIds once the videos have
    // been added to the database.
    const series = new Series(data);

    // Add series id and dates to each video
    contentToAdd = _.map(contentToAdd, (video) => {
      return {
        ...video,
        seriesId: series._id,
        _user: req.user.uid,
        dateAdded: Date.now(),
        lastUpdated: Date.now(),
      };
    });

    // Create content item for each video in series
    Content.create(contentToAdd, async (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // Extract only the ids for each content item
        const contentIds = _.map(content, ({ _id }) => _id);

        // Add contentIds to series model
        series.contentIds = contentIds;

        // Save series to DB and send to client
        series.save((error) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.send(series);
          }
        });
      }
    });
  });

  app.put("/api/series/:seriesId", requireLogin, (req, res) => {
    const { seriesId } = req.params;
    const data = req.body;
    // Update last updated field
    data.lastUpdated = Date.now();

    Series.findByIdAndUpdate(seriesId, data, { new: true }, (error, series) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(series);
      }
    });
  });

  // PUT request to update shelf and all associated content for a series
  app.put("/api/series/:seriesId/update-shelf", requireLogin, (req, res) => {
    const { seriesId } = req.params;
    const data = req.body;
    // Update last updated field
    data.lastUpdated = Date.now();

    Series.findByIdAndUpdate(seriesId, data, (error, series) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const { contentIds } = series;

        // Query content for those in contentIds of series, AND that are not Finished.
        // The not finished part is so the history of finishing certain videos in
        // the series is not written over. For example if a series in 'Currently
        // Learning' and 1 out of 5 videos are completed (20%), and then you decide
        // to move it to the "Want to Learn" shelf, only the unfinished videos (4/5)
        // shelves are changed. So if you ever move the series back to Currently Learning,
        // it'll still be 20% complete.
        Content.updateMany(
          {
            _id: { $in: contentIds },
            shelf: { $ne: "Finished Learning" },
          },
          data,
          (error) => {
            if (error) {
              res.status(500).send(error);
            } else {
              res.sendStatus(200);
            }
          }
        );
      }
    });
  });

  // DELETE request to delete a series
  app.delete("/api/series/:seriesId", requireLogin, (req, res) => {
    const { seriesId } = req.params;

    Series.findById(seriesId, (error, series) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const { contentIds } = series;

        // Delete all the Content in the series
        Content.deleteMany({ _id: { $in: contentIds } }, (error) => {
          if (error) {
            res.status(500).send(error);
          } else {
            // Now delete Series
            Series.findByIdAndDelete(seriesId, (error) => {
              if (error) {
                res.status(500).send(error);
              } else {
                res.sendStatus(200);
              }
            });
          }
        });
      }
    });
  });
};
