const express = require("express");
const bodyParser = require("body-parser");

// Require firebase admin initialization
require("./config/firebase-admin");

// Initialize app
const app = express();

// Higher limit for adding series
app.use(bodyParser.json({ limit: "5mb" }));

// Connect to user database
require("./connections/usersDbConn");

// Require routes
require("./routes")(app);

app.get("/", (req, res) => {
  res.send("Welcome to Newt!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
