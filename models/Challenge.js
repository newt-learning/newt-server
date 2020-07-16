const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeSchema = new Schema({
  schemaVersion: {
    type: Number,
    default: 1,
  },
  _user: {
    type: String,
    ref: "User",
  },
  challengeType: {
    type: String,
    enum: ["reading"],
  },
  totalItems: Number,
  numItemsFinished: {
    type: Number,
    default: 0,
  },
  itemsFinished: [
    {
      type: Schema.Types.ObjectId,
      ref: "Content",
    },
  ],
  contentTypes: {
    type: [String],
    enum: ["book"],
  },
  startDate: Date,
  endDate: Date,
  lastUpdated: Date,
  year: String,
});

module.exports = challengeSchema;
