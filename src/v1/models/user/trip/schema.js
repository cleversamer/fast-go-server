const { Schema, Types } = require("mongoose");

module.exports.client = [
  "_id",
  "passengerId",
  "driverId",
  "distance",
  "from",
  "to",
];

module.exports.mongodb = new Schema(
  {
    passengerId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    from: {
      latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
      },
    },
    to: {
      latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
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
