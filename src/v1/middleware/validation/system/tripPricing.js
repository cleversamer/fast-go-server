const commonMiddleware = require("../common");

module.exports.validateGetTripPricing = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkCarType,
  commonMiddleware.checkTripPricingDistanceFrom,
  commonMiddleware.checkTripPricingDistanceTo,
  commonMiddleware.next,
];

module.exports.validateUpdateTripPricing = [
  commonMiddleware.checkCarType,
  commonMiddleware.checkTripPricingDistanceFrom,
  commonMiddleware.checkTripPricingDistanceTo,
  commonMiddleware.checkTripPricingKmPrice,
  commonMiddleware.checkTripPricingDoorOpeningPrice,
  commonMiddleware.next,
];
