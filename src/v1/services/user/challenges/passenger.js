const { Trip } = require("../../../models/user/trip");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");

module.exports.getPassengerChallenges = async (userId) => {
  try {
    page = parseInt(page);
    limit = parseInt(limit);

    const trips = await Trip.find({ passengerId: userId })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

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
