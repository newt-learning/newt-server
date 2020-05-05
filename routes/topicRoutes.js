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
};
