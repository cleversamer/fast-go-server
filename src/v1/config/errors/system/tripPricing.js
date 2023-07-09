const {
  distanceFrom,
  distanceTo,
  pricePerKm,
  doorOpeningPrice,
} = require("../../models/system/tripPricing");

module.exports = Object.freeze({
  notFound: {
    en: "Trip pricing was not found",
    ar: "تسعيرة الرحلة التي اخترتها غير موجودة",
  },
  invalidDistanceFrom: {
    en: `Min distance must be ${distanceFrom.min}-${distanceFrom.max} km`,
    ar: `المسافة الدنيا يجب أن تكون بين ${distanceFrom.min}-${distanceFrom.max} كيلومتر`,
  },
  invalidDistanceTo: {
    en: `Max distance must be ${distanceTo.min}-${distanceTo.max} km`,
    ar: `المسافة القصوى يجب أن تكون بين ${distanceTo.min}-${distanceTo.max} كيلومتر`,
  },
  invalidPricePerKm: {
    en: `Price per kilometer must be ${pricePerKm.min}-${pricePerKm.max} LYD`,
    ar: `سعر الكيلومتر يجب أن يكون بين ${pricePerKm.min}-${pricePerKm.max} دينار ليبي`,
  },
  invalidDoorOpeningPrice: {
    en: `Door opening price must be ${doorOpeningPrice.min}-${doorOpeningPrice.max} LYD`,
    ar: `سعر فتحة الباب يجب أن يكون بين ${doorOpeningPrice.min}-${doorOpeningPrice.max} دينار ليبي`,
  },
});
