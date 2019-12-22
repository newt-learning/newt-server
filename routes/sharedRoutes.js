const express = require("express");
const mongoose = require("mongoose");
const keys = require("../config/keys");

module.exports = app => {
  // Get book info through Google Books API
  app.get("/api/book-search/:searchString", async (req, res) => {
    const { searchString } = req.params;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchString}&key=${keys.googleBooksApiKey}`;

    try {
      const { data } = await axios.get(url);
      res.send(data);
    } catch (error) {
      res.sendStatus(404);
    }
  });
};
