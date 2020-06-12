const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Content = mongoose.model("content");
const Topic = mongoose.model("topics");

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
    try {
      const data = req.body;
      // Add user id and dates to data object
      data._user = req.user.uid;
      data.dateAdded = Date.now();
      data.lastUpdated = Date.now();
      // Add schema version
      data.schemaVersion = 2;

      // Create Content, save to database and send back to client
      const content = new Content(data);
      await content.save();
      res.send(content);
    } catch (error) {
      res.status(500).send(error);
    }
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
      { $set: { "bookInfo.pagesRead": pagesRead } },
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
  // were there in particular Topics
  app.delete("/api/content/:contentId", requireLogin, (req, res) => {
    const { contentId } = req.params;

    Content.findById(contentId, (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // Get all the topic ids that were saved in this content item
        const { topics } = content;

        // For all the topic ids, remove pointers to this content from the content
        // array in the Topic model (because content is going to be deleted).
        Topic.updateMany(
          { _id: { $in: topics } },
          { $pull: { content: contentId } },
          (error) => {
            if (error) {
              res.status(500).send(error);
            } else {
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
