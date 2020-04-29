const environment = process.env.NODE_ENV || "development";

if (environment === "development") {
  // In development, return development keys
  module.exports = require("./dev");
} else {
  // Otherwise, return staging/production keys from server config vars
  module.exports = {
    mongoURI: process.env.MONGO_URI,
    googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY,
  };
}
