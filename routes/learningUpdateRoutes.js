const mongoose = require("mongoose");
const moment = require("moment");
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

  // GET request to fetch summary stats sentence for the current week
  app.get("/api/summary-stats", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    LearningUpdate.find({ _user: userId }, (error, learningUpdates) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // Going to create the following example sentence that summarizes learning activity for the week:
        // "109 pages read across 2 books this week"
        let totalPagesRead = 0;
        let numUniqueBooks = 0;
        let contentIdVal = "";
        const currentWeek = moment().week();

        learningUpdates.forEach(update => {
          // If the week number of the learning update's timestamp is the same as the week number
          // of the current week, then add the number of pages read to the total, and also calculate the
          // number of unique books read
          if (moment(update.timestamp).week() === currentWeek) {
            totalPagesRead += update.numPagesRead;

            // Calculating numbere of unique books: If the contentId is not the same as the one in the
            // previous learning update, then increment numUniqueBooks by 1.
            if (String(update.contentId) !== contentIdVal) {
              numUniqueBooks += 1;
              contentIdVal = String(update.contentId);
            }
          }
        });

        // Sentence summarizing book stats for the week
        const summarySentence = `${totalPagesRead} pages read across ${numUniqueBooks} ${
          numUniqueBooks > 1 ? "books" : "book"
        } this week.`;

        res.send({ books: summarySentence });
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
