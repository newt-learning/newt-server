const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  schemaVersion: {
    type: Number,
    default: 1,
  },
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  dateCreated: Date,
  lastUpdated: Date,
});

module.exports = userSchema;
