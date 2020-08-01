const newtContentDbConn = require("../../connections/newtContentDbConn");

const NewtQuiz = newtContentDbConn.model("newt-quizzes");
const QuizQuestion = newtContentDbConn.model("newt-quiz-questions");

module.exports = (app) => {
  app.get("/api/newt-quiz/:quizId", (req, res) => {
    const { quizId } = req.params;

    NewtQuiz.findById(quizId)
      .populate({ path: "questions", model: QuizQuestion })
      .exec((error, quiz) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(quiz);
        }
      });
  });
};
