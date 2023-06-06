const { Schema, Types } = require("mongoose");
const { paymentCard: config } = require("../../../config/models");

module.exports.client = ["_id", "charger", "balance"];

module.exports.mongodb = new Schema(
  {
    charger: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    balance: {
      type: Number,
      required: true,
      min: config.balance.min,
      max: config.balance.max,
      default: config.balance.default,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      minlength: config.code.exactLength,
      maxlength: config.code.exactLength,
    },
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
    // To automatically write creation/update timestamps
    // Note: the update timestamp will be updated automatically
    timestamps: true,
  }
);
