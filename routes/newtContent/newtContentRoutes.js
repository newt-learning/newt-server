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

  // Get individual content from Newt DB
  app.get("/api/newt-content/:id", async (req, res) => {
    const { id } = req.params;

    NewtContent.findById(id, (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(content);
      }
    });
  });

  // Get individual content by slug (from URL parameter)
  app.get("/api/newt-content/by-slug/:slug", (req, res) => {
    const { slug } = req.params;

    NewtContent.findOne({ slug }, (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(content);
      }
    });
  });
};
