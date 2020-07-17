module.exports = (app) =>
  Object.assign(
    {},
    require("./authRoutes")(app),
    require("./contentRoutes")(app),
    require("./learningUpdateRoutes")(app),
    require("./topicRoutes")(app),
    require("./challengeRoutes")(app),
    require("./seriesRoutes")(app),
    require("./quizRoutes")(app),
    // Newt Content DB stuff
    require("./newtContent/newtContentRoutes")(app)
  );
