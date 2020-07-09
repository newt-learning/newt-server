const userDbConn = require("../connections/usersDbConn");
const newtContentDbConn = require("../connections/newtContentDbConn");
const requireLogin = require("../middleware/requireLogin");
const _ = require("lodash");

const Quiz = userDbConn.model("quizzes");
// Newt Content models
const NewtQuiz = newtContentDbConn.model("newt-quizzes");
const QuizQuestion = newtContentDbConn.model("newt-quiz-questions");

module.exports = (app) => {
  // POST request to create a quiz for the user from the Newt Content quiz questions
  app.post("/api/quizzes/create", requireLogin, (req, res) => {
    const userId = req.user.uid;
    const { newtQuizId, userContentId } = req.body;

    NewtQuiz.findById(newtQuizId)
      // Have to specify which model in .populate because of multiple connections
      .populate({ path: "questions", model: QuizQuestion })
      .exec((error, newtQuiz) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
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
};
