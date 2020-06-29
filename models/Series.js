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
  dateAdded: Date,
  lastUpdated: Date,
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

mongoose.model("series", seriesSchema);
