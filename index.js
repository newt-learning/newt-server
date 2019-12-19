const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

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
