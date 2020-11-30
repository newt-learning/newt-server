const mongoose = require("mongoose");
const keys = require("../config/keys");
// Schemas
const userSchema = require("../models/User");
const contentSchema = require("../models/Content");
const learningUpdateSchema = require("../models/LearningUpdate");
const topicSchema = require("../models/Topic");
const playlistSchema = require("../models/Playlist");
const challengeSchema = require("../models/Challenge");
const seriesSchema = require("../models/Series");
const quizSchema = require("../models/Quiz");

// Create connection to user database
const conn = mongoose.createConnection(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// If successfully connected, log message. Otherwise log error
mongoose.connections[1].on("connected", () => {
  console.log("Connected to Mongo instance");
});
mongoose.connections[1].on("error", (error) => {
  console.error("Error connecting to Mongo", error);
});

// Add models
conn.model("users", userSchema);
conn.model("content", contentSchema);
conn.model("learning-updates", learningUpdateSchema);
conn.model("topics", topicSchema);
conn.model("playlists", playlistSchema);
conn.model("challenges", challengeSchema);
conn.model("series", seriesSchema);
conn.model("quizzes", quizSchema);

// Export connection
module.exports = conn;
