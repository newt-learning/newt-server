const express = require("express");
const mongoose = require("mongoose");

const Content = mongoose.model("content");

module.exports = app => {
  // POST request to add content to database
  app.post("/api/content/create", async (req, res) => {
    try {
      const data = req.body;
      data.dateAdded = Date.now();
      data.lastUpdated = Date.now();

      const content = new Content(data);
      await content.save();
      res.send(content);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
