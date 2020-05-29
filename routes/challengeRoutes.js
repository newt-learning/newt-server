const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Challenge = mongoose.model("challenges");

module.exports = (app) => {
  // GET request to fetch all of a user's challenges
  app.get("/api/challenges", requireLogin, async (req, res) => {
    const userId = req.user.id;

    Challenge.find({ _user: userId }, (error, challenges) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(challenges);
      }
    });
  });
};
