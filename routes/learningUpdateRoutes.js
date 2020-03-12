const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const LearningUpdate = mongoose.model("learning-updates");

module.exports = app => {
  // GET request to fetch all of a user's learning updates
  app.get("/api/learning-updates/", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    LearningUpdate.find({ _user: userId }, (error, learningUpdates) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(learningUpdates);
      }
    });
  });

  // POST request to create a learning update
  app.post("/api/learning-updates/create", requireLogin, async (req, res) => {
    try {
      const data = req.body;
      // Add userId and timestamp to data object
      data.timestamp = Date.now();
      data._user = req.user.uid;

      // Create Learning Update, save to database and send back to client
      const learningUpdate = new LearningUpdate(data);
      await learningUpdate.save();
      res.send(learningUpdate);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
