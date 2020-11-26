const mongoose = require("mongoose");
const { Schema } = mongoose;
const { startFinishDatesSchema } = require("./shared");

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
  shelf: {
    type: String,
    enum: ["Currently Learning", "Want to Learn", "Finished Learning"],
  },
  playlists: [
    {
      type: Schema.Types.ObjectId,
      ref: "Playlist",
    },
  ],
  dateAdded: Date,
  lastUpdated: Date,
  startFinishDates: [startFinishDatesSchema],
  isFromNewtDiscover: {
    // Whether the series was added from Newt Discover page
    type: Boolean,
    default: false,
  },
  // Newt series id, creator ids, and all newt content ids in the series
  newtInfo: {
    newtSeriesId: {
      type: Schema.Types.ObjectId,
    },
    newtCreatorIds: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    newtContentIds: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
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
