const newtContentDbConn = require("../../connections/newtContentDbConn");

const NewtContent = newtContentDbConn.model("newt-content");

module.exports = (app) => {
  // GET Newt content (selected stuff with special features) from DB
  app.get("/api/newt-content", async (req, res) => {
    NewtContent.find({}, (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(content);
      }
    });
  });
};
