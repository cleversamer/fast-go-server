const { User } = require("../../../models/user/user");
const { Trip } = require("../../../models/user/trip");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const { getIO } = require("../../../setup/socket");

module.exports.getMyDriverChallenges = async (userId) => {
  try {
    const trips = await Trip.find({ driver: userId }).sort({ _id: -1 });

    if (!trips || !trips.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.trip.noTrips;
      throw new ApiError(statusCode, message);
    }

    return trips;
  } catch (err) {
    throw err;
  }
};
