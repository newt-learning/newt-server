const userDbConn = require("../connections/usersDbConn");
const requireLogin = require("../middleware/requireLogin");
const _ = require("lodash");

const Content = userDbConn.model("content");
// const Topic = userDbConn.model("topics");
const Playlist = userDbConn.model("playlists");
const Quiz = userDbConn.model("quizzes");
const Challenge = userDbConn.model("challenges");

module.exports = (app) => {
  // GET request to fetch all of a user's content
  app.get("/api/content", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    Content.find({ _user: userId }, (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(content);
      }
    });
  });

  // v2 GET request to fetch all user's content (populates playlists)
  app.get("/api/v2/content", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    Content.find({ _user: userId })
      // .populate({ path: "topics", model: Topic, select: "_id name" })
      .populate({ path: "playlists", model: Playlist, select: "_id name" })
      .exec((error, content) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(content);
        }
      });
  });

  // GET request to check if a Google Book already exists in user's library
  app.get(
    "/api/content/check-book/:googleBookId",
    requireLogin,
    async (req, res) => {
      const { googleBookId } = req.params;
      const userId = req.user.uid;

      Content.find(
        { _user: userId, "bookInfo.bookId": googleBookId },
        (error, content) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.send(content);
          }
        }
      );
    }
  );

  // POST request to add content to database
  app.post("/api/content/create", requireLogin, async (req, res) => {
    const data = req.body;
    // Add user id and dates to data object
    data._user = req.user.uid;
    data.dateAdded = Date.now();
    data.lastUpdated = Date.now();
    // Add schema version
    data.schemaVersion = 2;

    // Create Content, save to database and send back to client
    Content.create(data, (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // If there are playlists, add the content to each of those playlists
        if (!_.isEmpty(content.playlists)) {
          // First argument matches _ids in the playlistIds array, second argument pushes
          // the contentId to those matched playlists
          Playlist.updateMany(
            { _id: { $in: content.playlists } },
            { $push: { content: content._id } },
            (error) => {
              if (error) {
                res.status(500).send(error);
              }
            }
          );
        }
        res.send(content);
      }
    });
  });

  // v2 POST request to add content to database (updates challenge directly here)
  app.post("/api/v2/content/create", requireLogin, async (req, res) => {
    const userId = req.user.uid;
    const data = req.body;
    // Add user id and dates to data object
    data._user = userId;
    data.dateAdded = Date.now();
    data.lastUpdated = Date.now();
    // Add schema version
    data.schemaVersion = 2;

    // Create Content, save to database and send back to client
    Content.create(data, (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // If there are playlists, add the content to each of those playlists
        if (!_.isEmpty(content.playlists)) {
          // First argument matches _ids in the playlistIds array, second argument pushes
          // the contentId to those matched playlists
          Playlist.updateMany(
            { _id: { $in: content.playlists } },
            { $push: { content: content._id } },
            (error) => {
              if (error) {
                res.status(500).send(error);
              }
            }
          );
        }

        // Update the reading challenge by adding this book to the finished list
        // if a challenge exists (if selected shelf is Finished).
        if (content.shelf === "Finished Learning" && content.type === "book") {
          Challenge.findOne(
            { _user: userId, challengeType: "reading" },
            async (error, challenge) => {
              if (error) {
                res.send(content);
                res.status(500).send(error);
              } else {
                // If no challenge exists, return all okay. Add finished books will be
                // done when the challenge is created
                if (challenge) {
                  // Update challenge: add contentId to finished items, increment
                  // num finished by 1, and set lastUpdated to now
                  challenge.itemsFinished.push(content._id);
                  challenge.numItemsFinished += 1;
                  challenge.lastUpdated = Date.now();
                  await challenge.save();
                }
              }
            }
          );
        }

        res.send(content);
      }
    });
  });

  // PUT request to update content information
  app.put("/api/content/:contentId/update", requireLogin, (req, res) => {
    const { contentId } = req.params;
    const data = req.body;
    // Set lastUpdated field to now
    data.lastUpdated = Date.now();

    // Find Content by id and update
    Content.findByIdAndUpdate(
      contentId,
      data,
      { new: true },
      (error, content) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(content);
        }
      }
    );
  });

  // PUT request to update number of pages read for a book
  app.put("/api/content/:contentId/book-progress", requireLogin, (req, res) => {
    const { contentId } = req.params;
    const { pagesRead } = req.body;

    Content.findByIdAndUpdate(
      contentId,
      { $set: { "bookInfo.pagesRead": pagesRead, lastUpdated: Date.now() } },
      { new: true },
      (error, content) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(content);
        }
      }
    );
  });

  // DELETE request to delete content and remove all pointers to the content that
  // were there in particular Playlists
  app.delete("/api/content/:contentId", requireLogin, (req, res) => {
    const { contentId } = req.params;

    Content.findById(contentId, (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // Get all the playlist ids that were saved in this content item
        const { playlists, quizInfo } = content;
        const quizId = _.isEmpty(quizInfo) ? null : quizInfo[0].quizId;

        // For all the playlist ids, remove pointers to this content from the content
        // array in the Playlist model (because content is going to be deleted).
        Playlist.updateMany(
          { _id: { $in: playlists } },
          { $pull: { content: contentId } },
          async (error) => {
            if (error) {
              res.status(500).send(error);
            } else {
              // If there's a quiz associated, delete that as well
              if (quizId) {
                await Quiz.findByIdAndDelete(quizId);
              }
              // Now delete the content
              Content.findByIdAndDelete(contentId, (error) => {
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
