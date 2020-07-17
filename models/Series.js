const mongoose = require("mongoose");
const { Schema } = mongoose;

const seriesSchema = new Schema({
  schemaVersion: {
    type: Number,
    default: 1,
  },
  name: String,
  description: String,
  authors: [String],
  thumbnailUrl: String,
  type: {
    type: String,
    enum: ["series"],
  },
  contentType: {
    type: String,
    enum: ["video"],
  },
  contentIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Content",
    },
  ],
  shelf: String,
  dateAdded: Date,
  lastUpdated: Date,
  _user: {
    type: String,
    ref: "User",
  },
  seriesInfo: {
    source: String,
    playlistId: String,
    title: String,
    description: String,
    channelId: String,
    datePublished: Date,
    thumbnails: Object,
  },
});

module.exports = seriesSchema;
