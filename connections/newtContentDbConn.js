const mongoose = require("mongoose");
const keys = require("../config/keys");

const conn = mongoose.createConnection(keys.newtContentMongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connections[2].on("connected", () => {
  console.log("Connected to Newt Content Mongo instance");
});
mongoose.connections[2].on("error", (error) => {
  console.error("Error connecting to Newt Content Mongo", error);
});

module.exports = conn;
