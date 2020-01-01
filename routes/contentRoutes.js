const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Content = mongoose.model("content");

module.exports = app => {
  // GET request to fetch all of a user's content
  app.get("/api/content", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    Content.find({ _user: userId }, (error, content) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(content);
      }
    });
  });

  // POST request to add content to database
  app.post("/api/content/create", requireLogin, async (req, res) => {
    try {
      const data = req.body;
      // Add user id and dates to data object
      data._user = req.user.uid;
      data.dateAdded = Date.now();
      data.lastUpdated = Date.now();

      // Create Content, save to database and send back to client
      const content = new Content(data);
      await content.save();
      res.send(content);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // PUT request to update content information
  app.put("/api/content/:contentId/update", requireLogin, (req, res) => {
    const { contentId } = req.params;
    const data = req.body;
    // Set lastUpdated field to now
    data.lastUpdated = Date.now();

    // Find Content by id and update
    Content.findByIdAndUpdate(
      contentId,
      data,
      { new: true },
      (error, content) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(content);
        }
      }
    );
  });
};
