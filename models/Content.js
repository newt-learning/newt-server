const mongoose = require("mongoose");
const { Schema } = mongoose;

const startFinishDatesSchema = new Schema(
  {
    dateStarted: {
      type: Date,
      default: null,
    },
    dateCompleted: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

const contentSchema = new Schema({
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
    enum: ["book", "video"],
  },
  partOfSeries: {
    type: Boolean,
    default: false,
  },
  seriesId: {
    type: Schema.Types.ObjectId,
    ref: "Series",
  },
  shelf: {
    type: String,
    enum: ["Currently Learning", "Want to Learn", "Finished Learning"],
  },
  topics: [
    {
      type: Schema.Types.ObjectId,
      ref: "Topic",
    },
  ],
  dateAdded: Date,
  dateCompleted: Date, // For backwards compatibility
  startFinishDates: [startFinishDatesSchema],
  lastUpdated: Date,
  _user: {
    type: String,
    ref: "User",
  },
  // Data from Book API and book-related data
  bookInfo: {
    bookId: String,
    title: String,
    subtitle: String,
    description: String,
    authors: [String],
    imageLinks: {
      smallThumbnail: String,
      thumbnail: String,
      small: String,
      medium: String,
      large: String,
      extraLarge: String,
    },
    industryIdentifiers: {
      ISBN_10: String,
      ISBN_13: String,
    },
    pageCount: Number,
    pagesRead: {
      type: Number,
      default: 0,
    },
    publisher: String,
    datePublished: String,
  },
  // Data from YouTube API and video-related data
  videoInfo: {
    source: String,
    videoId: String,
    playlistId: String,
    playlistPosition: Number,
    title: String,
    description: String,
    channelId: String,
    datePublished: String,
    thumbnails: Object,
  },
});

mongoose.model("content", contentSchema);
