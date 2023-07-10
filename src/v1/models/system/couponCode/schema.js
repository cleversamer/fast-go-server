const { Schema } = require("mongoose");
const { couponCode: couponCodeConfig } = require("../../../config/models");

module.exports.client = ["_id", "code", "discountPercentage"];

const schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: couponCodeConfig.code.minLength,
      maxlength: couponCodeConfig.code.maxLength,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: couponCodeConfig.discountPercentage.min,
      max: couponCodeConfig.discountPercentage.max,
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

module.exports.mongodb = schema;
