const userDbConn = require("../connections/usersDbConn");
const moment = require("moment");
const requireLogin = require("../middleware/requireLogin");

const Challenge = userDbConn.model("challenges");
const Content = userDbConn.model("content");

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

  // GET request v2 to fetch all of a user's challenges
  app.get("/api/v2/challenges", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    Challenge.find({ _user: userId })
      // Populate itemsFinished field with content info + only select certain fields
      .populate({
        path: "itemsFinished",
        model: Content,
        select: "_id name authors thumbnailUrl startFinishDates dateCompleted",
      })
      .exec((error, challenges) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(challenges);
        }
      });
  });

  // GET request to fetch individual challenge by id
  app.get("/api/challenges/:challengeId", requireLogin, (req, res) => {
    const { challengeId } = req.params;

    Challenge.findById(challengeId, (error, challenge) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(challenge);
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
          type: "book", // Only books for now
          "startFinishDates.dateCompleted": {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
        // Only return _id field (called projection)
        "_id",
        async (error, content) => {
          if (content.length > 0) {
            data.numItemsFinished = content.length;
            data.itemsFinished = content.map((item) => item._id);
          } else {
            data.numItemsFinished = 0;
          }
          // Create and save the challenge
          const challenge = new Challenge(data);
          await challenge.save();
        }
      );

      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // PUT request to update the number of books in the challenge
  app.put(
    "/api/challenges/:challengeId/update",
    requireLogin,
    async (req, res) => {
      const { challengeId } = req.params;
      const data = req.body;
      // Set lastUpdated field to now
      data.lastUpdated = Date.now();

      Challenge.findByIdAndUpdate(challengeId, data, (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.sendStatus(200);
        }
      });
    }
  );

  // PUT request to add a finished book to the reading challenge
  app.put("/api/challenges/add-content", requireLogin, (req, res) => {
    const userId = req.user.uid;
    const { contentId } = req.body;

    Challenge.findOne(
      { _user: userId, challengeType: "reading" },
      async (error, challenge) => {
        if (error) {
          res.status(500).send(error);
        } else {
          // If no challenge exists, return all okay. Add finished books will be
          // done when the challenge is created
          if (!challenge) {
            res.sendStatus(200);
          } else {
            // Update challenge: add contentId to finished items, increment
            // num finished by 1, and set lastUpdated to now
            challenge.itemsFinished.push(contentId);
            challenge.numItemsFinished += 1;
            challenge.lastUpdated = Date.now();
            await challenge.save();

            res.sendStatus(200);
          }
        }
      }
    );
  });

  // DELETE request to delete a challenge
  app.delete("/api/challenges/:challengeId", requireLogin, (req, res) => {
    const { challengeId } = req.params;

    Challenge.findByIdAndDelete(challengeId, (error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.sendStatus(200);
      }
    });
  });
};
