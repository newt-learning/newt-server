const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeSchema = new Schema({
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
  year: String,
});

mongoose.model("challenges", challengeSchema);
