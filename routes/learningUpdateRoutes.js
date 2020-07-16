const userDbConn = require("../connections/usersDbConn");
const _ = require("lodash");
const requireLogin = require("../middleware/requireLogin");
const { getFormattedStatsByPeriod } = require("../helpers/routesHelpers");

const LearningUpdate = userDbConn.model("learning-updates");

module.exports = (app) => {
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
  app.get(
    "/api/summary-stats/:startDate.:endDate",
    requireLogin,
    async (req, res) => {
      const { startDate, endDate } = req.params;
      const userId = req.user.uid;

      LearningUpdate.find(
        {
          _user: userId, // Query timestamp field for greater than start date and less than end date
          timestamp: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        (error, learningUpdates) => {
          if (error) {
            res.status(500).send(error);
          } else {
            // First map over the learning updates and return just the contentIds,
            // then reduce it to only the unique ids
            const numUniqueBooks = _.uniq(
              _.map(learningUpdates, (update) => String(update.contentId))
            ).length;
            // For each learning update, increment the sum (initialized as 0 in the
            // third argument) with the numPagesRead field to get the total pages read
            const totalPagesRead = _.reduce(
              learningUpdates,
              function (sum, value) {
                return sum + value.numPagesRead;
              },
              0
            );

            // Sentence summarizing book stats for the week
            const summarySentence = `${totalPagesRead} pages read across ${numUniqueBooks} ${
              numUniqueBooks > 1 ? "books" : "book"
            } this week.`;

            res.send({ books: summarySentence });
          }
        }
      );
    }
  );

  // POST request to create a learning update
  app.post("/api/learning-updates/create", requireLogin, async (req, res) => {
    try {
      const data = req.body;
      // Add userId, dateAdded data and timestamp data if it does not exist to
      // the object
      if (!data.timestamp) {
        data.timestamp = Date.now();
      }
      data.dateAdded = Date.now();
      data._user = req.user.uid;

      // Create Learning Update, save to database and send back to client
      const learningUpdate = new LearningUpdate(data);
      await learningUpdate.save();
      res.send(learningUpdate);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // GET request to fetch and format stats for a given period (day, week, month, year)
  app.get(
    "/api/stats/by-:period/:startDate.:endDate",
    requireLogin,
    async (req, res) => {
      // Period param above is day, week, month, or year
      const { period, startDate, endDate } = req.params;
      const userId = req.user.uid;

      LearningUpdate.find(
        {
          _user: userId,
          // Query timestamp field for greater than start date and less than end date
          timestamp: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        (error, learningUpdates) => {
          if (error) {
            res.status(500).send(error);
          } else {
            const stats = getFormattedStatsByPeriod(learningUpdates, period);
            res.send(stats);
          }
        }
      );
    }
  );
};
