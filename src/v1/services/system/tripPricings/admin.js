const { TripPricing } = require("../../../models/system/tripPricing");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");

module.exports.getTripPricing = async (carType, distanceFrom, distanceTo) => {
  try {
    const tripPricing = await TripPricing.findOne({
      carType,
      "distanceInKm.from": distanceFrom,
      "distanceInKm.to": distanceTo,
    });

    if (!tripPricing) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.tripPricing.notFound;
      throw new ApiError(statusCode, message);
    }

    return tripPricing;
  } catch (err) {
    throw err;
  }
};

module.exports.updateTripPricing = async (
  carType,
  distanceFrom,
  distanceTo,
  pricePerKm,
  doorOpeningPrice
) => {
  try {
    const tripPricing = await TripPricing.findOne({
      carType,
      "distanceInKm.from": distanceFrom,
      "distanceInKm.to": distanceTo,
    });

    if (!tripPricing) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.tripPricing.notFound;
      throw new ApiError(statusCode, message);
    }

    // Update trip pricing
    tripPricing.setKmPrice(pricePerKm);
    tripPricing.setDoorOpeningPrice(doorOpeningPrice);

    // Save trip pricing to the DB
    await tripPricing.save();

    return tripPricing;
  } catch (err) {
    throw err;
  }
};
