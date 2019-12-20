const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

// Require models
require("./models");

// Initialize app
const app = express();

app.use(bodyParser.json());

// Require routes
require("./routes");

// Connect to Mongo database
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// If successfully connected, log message. Otherwise log error
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo instance");
});
mongoose.connection.on("error", error => {
  console.error("Error connecting to Mongo", error);
});

app.get("/", (req, res) => {
  res.send("Welcome to Newt!");
});

app.listen(3000, () => console.log("Listening on port 3000"));
