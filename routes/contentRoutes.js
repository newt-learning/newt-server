const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Content = mongoose.model("content");

module.exports = app => {
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
};
