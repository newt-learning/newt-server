const mongoose = require("mongoose");
const { Schema } = mongoose;

const playlistSchema = new Schema({
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

module.exports = playlistSchema;
