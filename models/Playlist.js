const mongoose = require("mongoose");
const { Schema } = mongoose;

const playlistSchema = new Schema({
  schemaVersion: {
    type: Number,
    default: 1,
  },
  name: String,
  description: String,
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: "Content",
    },
  ],
  series: [
    {
      type: Schema.Types.ObjectId,
      ref: "Series",
    },
  ],
  isNewtPlaylist: {
    type: Boolean,
    default: false,
  },
  newtPlaylistId: {
    type: Schema.Types.ObjectId,
  },
  _user: {
    type: String,
    ref: "User",
  },
  dateAdded: Date,
  lastUpdated: Date,
});

module.exports = playlistSchema;
