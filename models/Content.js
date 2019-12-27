const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema({
  name: String,
  description: String,
  shelf: {
    type: [String],
    enum: ["Currently Learning", "Want to Learn", "Finished Learning"]
  },
  dateAdded: Date,
  dateCompleted: Date,
  lastUpdated: Date,
  // Data from Book API and book-related data
  bookInfo: {
    bookId: String,
    title: String,
    subtitle: String,
    description: String,
    authors: [String],
    thumbnails: {
      standard: String,
      small: String
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
