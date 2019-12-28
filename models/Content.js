const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema({
  name: String,
  description: String,
  type: {
    type: String,
    enum: ["book"]
  },
  shelf: {
    type: [String],
    enum: ["Currently Learning", "Want to Learn", "Finished Learning"]
  },
  dateAdded: Date,
  dateCompleted: Date,
  lastUpdated: Date,
  _user: {
    type: String,
    ref: "User"
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
      extraLarge: String
    },
    industryIdentifiers: {
      ISBN_10: String,
      ISBN_13: String
    },
    pageCount: Number,
    pagesRead: {
      type: Number,
      default: 0
    },
    publisher: String,
    datePublished: String
  }
});

mongoose.model("content", contentSchema);
