const { Schema, Types } = require("mongoose");
const { car: config } = require("../../../config/models");

module.exports.client = [
  "_id",
  "driver",
  "photos",
  "plateNumber",
  "productionYear",
  "model",
  "color",
  "type",
  "documents",
];

module.exports.mongodb = new Schema(
  {
    driver: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    photos: {
      type: Array,
      required: true,
      minLength: config.photos.exactLength,
      maxLength: config.photos.exactLength,
    },
    plateNumber: {
      type: String,
      trim: true,
      required: true,
    },
    productionYear: {
      type: Number,
      required: true,
      enum: config.productionYears,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      enum: config.models,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      enum: config.colors,
    },
    type: {
      type: String,
      required: true,
      enum: config.carTypes,
    },
    documents: {
      brochure: {
        type: String,
        required: true,
        trim: true,
      },
      driverLicense: {
        type: String,
        required: true,
        trim: true,
      },
      insurance: {
        type: String,
        required: true,
        trim: true,
      },
      passport: {
        type: String,
        required: true,
        trim: true,
      },
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
