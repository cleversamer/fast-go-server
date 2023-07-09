const { TripPricing } = require("../../../models/system/tripPricing");
const { car: carConfig } = require("../../../config/models");

module.exports.ensureTripPricings = async () => {
  try {
    const distanceRanges = [
      [0, 10],
      [10, 15],
      [15, 25],
      [25, 30],
      [30, 45],
    ];

    carConfig.carTypes.forEach((carType) => {
      distanceRanges.forEach(async (distanceRange) => {
        const min = distanceRange[0];
        const max = distanceRange[1];

        const tripPricingExist = await TripPricing.findOne({
          carType,
          "distanceInKm.from": min,
          "distanceInKm.to": max,
        });

        if (tripPricingExist) {
          return;
        }

        const tripPricing = new TripPricing({
          carType,
          distanceInKm: { from: min, to: max },
        });

        await tripPricing.save();
      });
    });
  } catch (err) {}
};
