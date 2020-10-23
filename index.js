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
// Connect to Newt Content database
require("./connections/newtContentDbConn");

// Require routes
require("./routes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets created after build process like
  // main.js and main.css
  app.use(express.static("client/build"));

  // Express will serve up index.html if it does not recognize route
  const path = require("path");
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 2020;

app.listen(PORT);
