const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Topic = mongoose.model("topics");
const Content = mongoose.model("content");

module.exports = (app) => {
  // GET request to fetch all of a user's topics
  app.get("/api/topics", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    Topic.find({ _user: userId }, (error, topics) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(topics);
      }
    });
  });

  // POST request to create a topic
  app.post("/api/topics/create", requireLogin, async (req, res) => {
    try {
      const data = req.body;
      // Add user id and dates to data object
      data._user = req.user.uid;
      data.dateAdded = Date.now();
      data.lastUpdated = Date.now();

      // Create Topic, save to database and send back to client
      const topic = new Topic(data);
      await topic.save();
      res.send(topic);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // PUT request to edit a topic
  app.put("/api/topics/:topicId/update", requireLogin, (req, res) => {
    const { topicId } = req.params;
    const data = req.body;
    // Set lastUpdated field to now
    data.lastUpdated = Date.now();

    // Find topic by id and update
    Topic.findByIdAndUpdate(topicId, data, { new: true }, (error, topic) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(topic);
      }
    });
  });

  // PUT request to add content (contentId) to multiple topics
  app.put("/api/topics/add-content", requireLogin, (req, res) => {
    const { topicIds, contentId } = req.body;

    // First argument matches _ids in the topicIds array, second argument pushes
    // the contentId to those matched topics
    Topic.updateMany(
      { _id: { $in: topicIds } },
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

  // PUT request to remove content (contentId) to multiple topics
  app.put("/api/topics/remove-content", requireLogin, (req, res) => {
    const { topicIds, contentId } = req.body;

    // First argument matches _ids in the topicIds array, second argument pulls
    // (removes) the contentId to those matched topics
    Topic.updateMany(
      { _id: { $in: topicIds } },
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

  // DELETE request to delete a topic and remove all pointers to the topic that
  // might be there in particular content
  app.delete("/api/topics/:topicId", requireLogin, (req, res) => {
    const { topicId } = req.params;

    Topic.findById(topicId, (error, topic) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // Get all the content ids that was saved in this topic
        const { content } = topic;

        // For all the content ids, remove pointers to this topic from the topic
        // array (because it's going to be deleted).
        Content.updateMany(
          { _id: { $in: content } },
          { $pull: { topics: topicId } },
          (error, raw) => {
            if (error) {
              res.status(500).send(error);
            } else {
              console.log(raw);
              // Now delete the topic
              Topic.findByIdAndDelete(topicId, (error) => {
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
