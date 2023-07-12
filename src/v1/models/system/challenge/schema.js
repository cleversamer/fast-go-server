const { Schema } = require("mongoose");
const { user: userConfig } = require("../../../config/models");

module.exports.client = [
  "_id",
  "role",
  "reward",
  "referralTarget",
  "tripTarget",
];

const schema = new Schema(
  {
    role: {
      type: String,
      enum: userConfig.roles.filter((r) => r !== "admin"),
      required: true,
      trim: true,
    },
    reward: {
      type: Number,
      required: true,
    },
    referralTarget: {
      type: Number,
      required: true,
    },
    tripTarget: {
      type: Number,
      default: 0,
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

schema.index({ role: 1 });

module.exports.mongodb = schema;
