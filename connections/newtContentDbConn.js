const mongoose = require("mongoose");
const keys = require("../config/keys");
const {
  newtContentSchema,
  newtSeriesSchema,
  newtContentCreatorSchema,
  newtSourceSchema,
  newtQuizSchema,
} = require("newt-content-models");

const conn = mongoose.createConnection(keys.newtContentMongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connections[1].on("connected", () => {
  console.log("Connected to Newt Content Mongo instance");
});
mongoose.connections[1].on("error", (error) => {
  console.error("Error connecting to Newt Content Mongo", error);
});

// Add Newt Content models
conn.model("newt-content", newtContentSchema);
conn.model("newt-series", newtSeriesSchema);
conn.model("newt-content-creators", newtContentCreatorSchema);
conn.model("newt-sources", newtSourceSchema);
conn.model("newt-quizzes", newtQuizSchema);

module.exports = conn;
