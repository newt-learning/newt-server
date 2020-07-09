const mongoose = require("mongoose");
const { Schema } = mongoose;
const newtContentDbConn = require("../connections/newtContentDbConn");

const NewtQuiz = newtContentDbConn.model("newt-quizzes");
const NewtQuizQuestion = newtContentDbConn.model("newt-quiz-questions");
const NewtContent = newtContentDbConn.model("newt-content");

const resultSchema = new Schema({
  newtQuestionId: {
    type: Schema.Types.ObjectId,
    ref: NewtQuizQuestion,
  },
  // Denormalize question, options and topics
  question: String,
  options: [
    {
      option: String,
      explanation: String,
    },
  ],
  optionChosen: String,
  correctAnswer: String,
  isChoiceCorrect: Boolean,
  didNotKnow: Boolean,
});

const quizSchema = new Schema({
  _user: {
    type: String,
    ref: "User",
  },
  newtQuizId: {
    type: Schema.Types.ObjectId,
    ref: NewtQuiz,
  },
  newtContentId: {
    type: Schema.Types.ObjectId,
    ref: NewtContent,
  },
  userContentId: {
    type: Schema.Types.ObjectId,
    ref: "Content",
  },
  // Used to indicate the number of times the same quiz was taken (aka which
  // iteration the user is on).
  iteration: {
    type: Number,
    default: 1,
  },
  dateCreated: Date,
  dateCompleted: Date,
  results: [resultSchema],
});

module.exports = quizSchema;
