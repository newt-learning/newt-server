const mongoose = require("mongoose");
const { Schema } = mongoose;

const learningUpdateSchema = new Schema({
  _user: {
    type: String,
    ref: "User",
  },
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "Content",
  },
  previousPagesRead: Number,
  updatedPagesRead: Number,
  numPagesRead: Number,
  contentType: {
    type: String,
    enum: ["book"],
  },
  // The date that the reading was done, can be backdated
  timestamp: Date,
  // The date that this learning update was added
  dateAdded: Date,
});

mongoose.model("learning-updates", learningUpdateSchema);
