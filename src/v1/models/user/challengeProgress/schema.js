const { Schema, Types } = require("mongoose");
const { challenge: challengeConfig } = require("../../../config/models");

module.exports.client = [
  "_id",
  "userId",
  "challengeId",
  "referralsProgress",
  "tripsProgress",
  "reward",
  "referralTarget",
  "tripTarget",
];

const schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengeId: {
      type: Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    reward: {
      type: Number,
      required: true,
      min: challengeConfig.reward.min,
      max: challengeConfig.reward.max,
    },
    referralTarget: {
      type: Number,
      default: 0,
      min: challengeConfig.referralTarget.min,
      max: challengeConfig.referralTarget.max,
    },
    tripTarget: {
      type: Number,
      default: 0,
      min: challengeConfig.tripTarget.min,
      max: challengeConfig.tripTarget.max,
    },
    referralsProgress: {
      type: Number,
      default: 0,
    },
    tripsProgress: {
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

schema.index({ userId: -1 });

module.exports.mongodb = schema;
