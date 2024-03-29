const { Car } = require("../../../models/user/car");
const { Trip } = require("../../../models/user/trip");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const { getIO } = require("../../../setup/socket");

module.exports.getPassengerTrips = async (userId, page, limit) => {
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
    const car = await Car.findOne({
      type: carType,
    });

    if (!car) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.car.noAvailableCars;
      throw new ApiError(statusCode, message);
    }

    // Create trip
    const trip = new Trip({
      driverId: car.driver,
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
    getIO().to(car.driver).emit("new request", trip);

    return trip;
  } catch (err) {
    throw err;
  }
};
