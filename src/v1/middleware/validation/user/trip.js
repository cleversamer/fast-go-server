const commonMiddleware = require("../common");

module.exports.validateGetMyDriverTrips = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];

module.exports.validateApproveTrip = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkTripId,
  commonMiddleware.next,
];

module.exports.validateRejectTrip = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkTripId,
  commonMiddleware.next,
];

module.exports.validateGetMyPassengerTrips = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];

module.exports.validateRequestTrip = [
  commonMiddleware.checkCarType,
  commonMiddleware.checkFromLongitude,
  commonMiddleware.checkFromLatitude,
  commonMiddleware.checkFromPlaceTitle,
  commonMiddleware.checkToLongitude,
  commonMiddleware.checkToLatitude,
  commonMiddleware.checkToPlaceTitle,
  commonMiddleware.checkTripPaymentMethod,
  commonMiddleware.next,
];
