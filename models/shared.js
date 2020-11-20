const mongoose = require("mongoose");

// Multiple starts and finishes for Content and Series
const startFinishDatesSchema = new mongoose.Schema(
  {
    dateStarted: {
      type: Date,
      default: null,
    },
    dateCompleted: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

module.exports = {
  startFinishDatesSchema,
};
