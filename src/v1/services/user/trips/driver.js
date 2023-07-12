const { User } = require("../../../models/user/user");
const { Trip } = require("../../../models/user/trip");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const { getIO } = require("../../../setup/socket");

module.exports.getDriverTrips = async (userId, page, limit) => {
  try {
    page = parseInt(page);
    limit = parseInt(limit);

    const trips = await Trip.find({ driver: userId })
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

module.exports.approveTrip = async (driver, tripId) => {
  try {
    // Check if trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.trip.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if the driver is the driver of this trip
    if (driver._id.toString() !== trip._id.toString()) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.trip.notTripDriver;
      throw new ApiError(statusCode, message);
    }

    // Mark trip as approved
    trip.approve();
    await trip.save();

    // Add trip to driver
    driver.addDriverTrip();
    await driver.save();

    // Add trip to passenger
    const passenger = await User.findById(trip.passengerId);
    passenger.addPassengerTrip();
    await passenger.save();

    return { trip, driver, passenger };
  } catch (err) {
    throw err;
  }
};

module.exports.rejectTrip = async (driver, tripId) => {
  try {
    // Check if trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.trip.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if trip was live for 5 mins or more
    if (trip.isDead()) {
      await trip.delete();
      return trip;
    }

    // TODO: Find another driver from the nearest drivers to the user
    const newDriver = await User.findOne({
      role: "driver",
      _id: { $not: { $eq: driver._id } },
    });

    // Check if there's another available driver
    if (!newDriver) {
      await trip.delete();
      return trip;
    }

    // Update trip's driver
    trip.driverId = driver._id;
    await trip.save();

    // Send trip to the new driver in real-time
    getIO().to(newDriver._id).emit("new request", trip);

    return trip;
  } catch (err) {
    throw err;
  }
};
