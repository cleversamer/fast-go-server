const { Schema, Types } = require("mongoose");

module.exports.client = [
  "_id",
  "userId",
  "description",
  "reward",
  "target",
  "progress",
  "completed",
];

const schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      en: {
        type: String,
        required: true,
      },
      ar: {
        type: String,
        required: true,
      },
    },
    reward: {
      type: Number,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
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

schema.index({ userId: 1 });

module.exports.mongodb = schema;
