const httpStatus = require("http-status");
const _ = require("lodash");
const { clientSchema } = require("../../../models/user/trip");
const { tripsService } = require("../../../services");

module.exports.getMyDriverTrips = async (req, res, next) => {
  try {
    const user = req.user;
    const { page, limit } = req.query;

    const trips = await tripsService.getDriverTrips(user._id, page, limit);

    const response = {
      trips: trips.map((trip) => _.pick(trip, clientSchema)),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.approveTrip = async (req, res, next) => {
  try {
    const user = req.user;
    const { tripId } = req.params;

    const trip = await tripsService.approveTrip(user, tripId);

    // TODO: driver has 20 seconds to approve the order

    const response = _.pick(trip, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.rejectTrip = async (req, res, next) => {
  try {
    const user = req.user;
    const { tripId } = req.params;

    const trip = await tripsService.rejectTrip(user, tripId);

    // TODO: driver has 20 seconds to approve the order

    const response = _.pick(trip, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
