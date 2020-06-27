const mongoose = require("mongoose");
const { Schema } = mongoose;

const topicSchema = new Schema({
  schemaVersion: {
    type: Number,
    default: 1,
  },
  name: String,
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: "Content",
    },
  ],
  _user: {
    type: String,
    ref: "User",
  },
  dateAdded: Date,
  lastUpdated: Date,
});

mongoose.model("topics", topicSchema);
