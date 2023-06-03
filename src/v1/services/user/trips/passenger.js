const { User } = require("../../../models/user/user");
const { Trip } = require("../../../models/user/trip");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const { getIO } = require("../../../setup/socket");

module.exports.getMyPassengerTrips = async (userId) => {
  try {
    const trips = await Trip.find({ passengerId: userId }).sort({ _id: -1 });

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

module.exports.requestTrip = async (
  user,
  carType,
  fromLongitude,
  fromLatitude,
  fromTitle,
  toLongitude,
  toLatitude,
  toTitle,
  paymentMethod
) => {
  try {
    // TODO: Find the nearest driver to user
    const driver = await User.findOne({ role: "driver" });

    // Create trip
    const trip = new Trip({
      driverId: driver._id,
      passengerId: user._id,
      paymentMethod,
      carType,
      from: {
        title: fromTitle,
        longitude: fromLongitude,
        latitude: fromLatitude,
      },
      to: {
        title: toTitle,
        longitude: toLongitude,
        latitude: toLatitude,
      },
    });

    // Send trip to driver in real-time
    getIO().to(driver._id).emit("new request", trip);

    return trip;
  } catch (err) {
    throw err;
  }
};
