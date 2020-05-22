module.exports = (app) =>
  Object.assign(
    {},
    require("./authRoutes")(app),
    require("./contentRoutes")(app),
    require("./learningUpdateRoutes")(app),
    require("./topicRoutes")(app)
  );
