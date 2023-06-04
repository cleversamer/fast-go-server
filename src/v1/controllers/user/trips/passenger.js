const httpStatus = require("http-status");
const _ = require("lodash");
const { clientSchema } = require("../../../models/user/trip");
const { tripsService } = require("../../../services");
const errors = require("../../../config/errors");
const { ApiError } = require("../../../middleware/apiError");

module.exports.getMyPassengerTrips = async (req, res, next) => {
  try {
    const user = req.user;
    const { page, limit } = req.query;

    const trips = await tripsService.getPassengerTrips(user._id, page, limit);

    if (!trips || !trips.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.trip.noTrips;
      throw new ApiError(statusCode, message);
    }

    const response = {
      trips: trips.map((trip) => _.pick(trip, clientSchema)),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.requestTrip = async (req, res, next) => {
  try {
    const user = req.user;
    const {
      carType,
      fromLongitude,
      fromLatitude,
      fromTitle,
      toLongitude,
      toLatitude,
      toTitle,
      paymentMethod,
    } = req.body;

    const trip = await tripsService.requestTrip(
      user,
      carType,
      fromLongitude,
      fromLatitude,
      fromTitle,
      toLongitude,
      toLatitude,
      toTitle,
      paymentMethod
    );

    // TODO: request should be live for 5 mins

    const response = _.pick(trip, clientSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
