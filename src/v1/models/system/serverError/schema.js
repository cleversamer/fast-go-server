const { Schema } = require("mongoose");

module.exports.client = [
  "_id",
  "requestURL",
  "name",
  "message",
  "stackTrace",
  "occurs",
  "date",
];

const schema = new Schema(
  {
    // The request URL where the error happened
    requestURL: {
      type: String,
      required: true,
      trim: true,
    },
    // The name of the error
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // The message of the error
    message: {
      type: String,
      required: true,
      trim: true,
    },
    // The stack of the error
    stackTrace: {
      type: String,
      required: true,
      trim: true,
    },
    // How many times this error occurs
    occurs: {
      type: Number,
      default: 1,
    },
    // The date of the error
    date: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
  }
);

module.exports.mongodb = schema;
