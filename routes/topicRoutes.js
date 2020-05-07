const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Topic = mongoose.model("topics");

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
};
