const userDbConn = require("../connections/usersDbConn");
const newtContentDbConn = require("../connections/newtContentDbConn");
const requireLogin = require("../middleware/requireLogin");
const _ = require("lodash");

const Quiz = userDbConn.model("quizzes");
// Newt Content models
const NewtQuiz = newtContentDbConn.model("newt-quizzes");
const QuizQuestion = newtContentDbConn.model("newt-quiz-questions");

module.exports = (app) => {
  // GET request to fetch an individual user quiz
  app.get("/api/quizzes/:quizId", requireLogin, (req, res) => {
    const { quizId } = req.params;

    Quiz.findById(quizId, (error, quiz) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (_.isEmpty(quiz)) {
          res.sendStatus(404);
        } else {
          res.send(quiz);
        }
      }
    });
  });

  // POST request to create a quiz for the user from the Newt Content quiz questions
  app.post("/api/quizzes/create", requireLogin, (req, res) => {
    const userId = req.user.uid;
    const { newtQuizId, userContentId } = req.body;

    NewtQuiz.findById(newtQuizId)
      // Have to specify which model in .populate because of multiple connections
      .populate({ path: "questions", model: QuizQuestion })
      .exec((error, newtQuiz) => {
        if (error) {
          res.status(500).send(error);
        } else {
          // If nothing found send back 404 status
          if (_.isEmpty(newtQuiz)) {
            res.sendStatus(404);
          }

          // Change the _id field from Newt Quiz to newtQuestionId field that's
          // used in the user's Quiz model
          const userQuizResultsTemplate = _.map(
            newtQuiz.questions,
            ({ _id, question, options, correctAnswer }) => {
              return { newtQuestionId: _id, question, options, correctAnswer };
            }
          );

          // Create and add the quiz for the user
          Quiz.create(
            {
              _user: userId,
              newtQuizId,
              userContentId,
              newtContentId: newtQuiz.contentId,
              results: userQuizResultsTemplate,
              dateCreated: Date.now(),
            },
            (error, personalQuiz) => {
              if (error) {
                res.status(500).send(error);
              } else {
                res.send(personalQuiz);
              }
            }
          );
        }
      });
  });

  // PUT request to update a user's quiz info
  app.put("/api/quizzes/:quizId/update", requireLogin, (req, res) => {
    const { quizId } = req.params;
    const data = req.body;

    Quiz.findByIdAndUpdate(quizId, data, { new: true }, (error, quiz) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(quiz);
      }
    });
  });
};
