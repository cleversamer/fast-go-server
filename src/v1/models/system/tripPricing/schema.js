const { Schema } = require("mongoose");
const { tripPricing: tripPricingConfig } = require("../../../config/models");

module.exports.client = [
  "_id",
  "carType",
  "distanceInKm",
  "pricePerKm",
  "doorOpeningPrice",
];

const schema = new Schema(
  {
    carType: String,
    distanceInKm: {
      from: {
        type: Number,
        required: true,
        min: tripPricingConfig.distanceFrom.min,
        max: tripPricingConfig.distanceFrom.max,
      },
      to: {
        type: Number,
        required: true,
        min: tripPricingConfig.distanceTo.min,
        max: tripPricingConfig.distanceTo.max,
      },
    },
    pricePerKm: {
      type: Number,
      required: true,
      min: tripPricingConfig.pricePerKm.min,
      max: tripPricingConfig.pricePerKm.max,
      default: tripPricingConfig.pricePerKm.min,
    },
    doorOpeningPrice: {
      type: Number,
      required: true,
      min: tripPricingConfig.doorOpeningPrice.min,
      max: tripPricingConfig.doorOpeningPrice.max,
      default: tripPricingConfig.doorOpeningPrice.min,
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
