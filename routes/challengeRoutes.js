const mongoose = require("mongoose");
const moment = require("moment");
const requireLogin = require("../middleware/requireLogin");

const Challenge = mongoose.model("challenges");
const Content = mongoose.model("content");

module.exports = (app) => {
  // GET request to fetch all of a user's challenges
  app.get("/api/challenges", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    Challenge.find({ _user: userId }, (error, challenges) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(challenges);
      }
    });
  });

  // POST request to create a challenge
  app.post("/api/challenges/create", requireLogin, async (req, res) => {
    try {
      const userId = req.user.uid;
      const data = req.body;

      // Add userId, challenge start and end date, and the year
      data._user = req.user.uid;
      data.startDate = moment();
      data.endDate = moment().endOf("year");
      data.year = moment().format("YYYY");

      // Used to search for Content already finished this year
      const startOfYear = moment().startOf("year").toDate();
      const endOfYear = moment().endOf("year").toDate();

      // Search for content that has already been finished this year. If there
      // is some, set the number finished as well as their ids to the data
      // object. Otherwise set number finished as 0.
      await Content.find(
        {
          _user: userId,
          shelf: "Finished Learning",
          dateCompleted: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
        // Only return _id field (called projection)
        "_id",
        (error, content) => {
          if (content.length > 0) {
            data.numItemsFinished = content.length;
            data.itemsFinished = content.map((item) => item._id);
          } else {
            data.numItemsFinished = 0;
          }
        }
      );

      // Create and save the challenge
      const challenge = new Challenge(data);
      await challenge.save();
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
