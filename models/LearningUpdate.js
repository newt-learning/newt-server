const mongoose = require("mongoose");
const { Schema } = mongoose;

const learningUpdateSchema = new Schema({
  _user: {
    type: String,
    ref: "User"
  },
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "Content"
  },
  previousPagesRead: Number,
  updatedPagesRead: Number,
  numPagesRead: Number,
  contentType: {
    type: String,
    enum: ["book"]
  },
  timestamp: Date
});

mongoose.model("learning-updates", learningUpdateSchema);
