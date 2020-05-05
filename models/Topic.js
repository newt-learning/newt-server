const mongoose = require("mongoose");
const { Schema } = mongoose;

const topicSchema = new Schema({
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
