const userDbConn = require("../connections/usersDbConn");
const requireLogin = require("../middleware/requireLogin");
const _ = require("lodash");

const Playlist = userDbConn.model("playlists");
const Content = userDbConn.model("content");
const Series = userDbConn.model("series");

module.exports = (app) => {
  // GET request to fetch all of a user's playlists
  app.get("/api/playlists", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    Playlist.find({ _user: userId }, (error, playlists) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(playlists);
      }
    });
  });

  // GET request to fetch individual playlist by id
  app.get("/api/playlists/:playlistId", requireLogin, (req, res) => {
    const { playlistId } = req.params;

    Playlist.findById(playlistId)
      .populate({ path: "content", model: Content })
      .populate({
        path: "series",
        model: Series,
        // Populate content in the series
        populate: { path: "contentIds", model: Content },
      })
      .exec((error, playlist) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(playlist);
        }
      });
  });

  // POST request to create a playlist
  app.post("/api/playlists/create", requireLogin, async (req, res) => {
    try {
      const data = req.body;
      // Add user id and dates to data object
      data._user = req.user.uid;
      data.dateAdded = Date.now();
      data.lastUpdated = Date.now();

      // Create Playlist, save to database and send back to client
      const playlist = new Playlist(data);
      await playlist.save();
      res.send(playlist);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // POST request to create a user playlist from a Newt playlist (from Discover page)
  app.post("/api/playlists/create-from-newt", requireLogin, (req, res) => {
    let { playlistData, playlistContentData } = req.body;
    // Add user id and dates to playlist data object
    playlistData._user = req.user.uid;
    playlistData.dateAdded = new Date();
    playlistData.lastUpdated = new Date();

    // Create playlist
    let playlist = new Playlist(playlistData);

    // Map over each content item in playlist and add user, dates and playlist id
    playlistContentData = _.map(playlistContentData, (content) => ({
      ...content,
      playlists: [playlist._id],
      _user: req.user.uid,
      dateAdded: new Date(),
      lastUpdated: new Date(),
    }));

    // Create all content in playlist
    Content.create(playlistContentData, async (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // Get ids of all created content items
        const contentIds = content.map((item) => item._id);

        // Add ids to playlist instance
        playlist.content = contentIds;
        // Save playlist
        playlist.save((error) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.send(playlist);
          }
        });
      }
    });
  });

  // PUT request to edit a playlist
  app.put("/api/playlists/:playlistId/update", requireLogin, (req, res) => {
    const { playlistId } = req.params;
    const data = req.body;
    // Set lastUpdated field to now
    data.lastUpdated = Date.now();

    // Find playlist by id and update
    Playlist.findByIdAndUpdate(
      playlistId,
      data,
      { new: true },
      (error, playlist) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(playlist);
        }
      }
    );
  });

  // PUT request to add content (contentId) to multiple playlists
  app.put("/api/playlists/add-content", requireLogin, (req, res) => {
    const { playlistIds, contentId } = req.body;

    // First argument matches _ids in the playlistIds array, second argument pushes
    // the contentId to those matched playlists
    Playlist.updateMany(
      { _id: { $in: playlistIds } },
      { $push: { content: contentId } },
      (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  // PUT request to add series (seriesId) to multiple playlists
  app.put("/api/playlists/add-series", requireLogin, (req, res) => {
    const { playlistIds, seriesId } = req.body;

    // First argument matches _ids in the playlistIds array, second argument pushes
    // the seriesId to those matched playlists
    Playlist.updateMany(
      { _id: { $in: playlistIds } },
      { $push: { series: seriesId } },
      (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  // PUT request to remove content (contentId) from multiple playlists
  app.put("/api/playlists/remove-content", requireLogin, (req, res) => {
    const { playlistIds, contentId } = req.body;

    // First argument matches _ids in the playlistIds array, second argument pulls
    // (removes) the contentId to those matched playlists
    Playlist.updateMany(
      { _id: { $in: playlistIds } },
      { $pull: { content: contentId } },
      (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  // PUT request to remove series (seriesId) to multiple playlists
  app.put("/api/playlists/remove-series", requireLogin, (req, res) => {
    const { playlistIds, seriesId } = req.body;

    // First argument matches _ids in the playlistIds array, second argument pushes
    // the seriesId to those matched playlists
    Playlist.updateMany(
      { _id: { $in: playlistIds } },
      { $pull: { series: seriesId } },
      (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  // DELETE request to delete a playlist and remove all pointers to the playlist that
  // were there in particular content
  app.delete("/api/playlists/:playlistId", requireLogin, (req, res) => {
    const { playlistId } = req.params;

    Playlist.findById(playlistId, (error, playlist) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // Get all the content ids that was saved in this playlist
        const { content } = playlist;

        // For all the content ids, remove pointers to this playlist from the playlist
        // array in Content model (because playlist is going to be deleted).
        Content.updateMany(
          { _id: { $in: content } },
          { $pull: { playlists: playlistId } },
          (error) => {
            if (error) {
              res.status(500).send(error);
            } else {
              // Now delete the playlist
              Playlist.findByIdAndDelete(playlistId, (error) => {
                if (error) {
                  res.status(500).send(error);
                } else {
                  res.sendStatus(200);
                }
              });
            }
          }
        );
      }
    });
  });
};
