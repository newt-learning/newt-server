module.exports = app =>
  Object.assign(
    {},
    require("./authRoutes")(app),
    require("./contentRoutes")(app)
  );
