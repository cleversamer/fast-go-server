const { tripPricingsController } = require("../../../controllers");
const { tripPricingValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/get",
    tripPricingValidator.validateGetTripPricing,
    auth("readAny", "tripPricing"),
    tripPricingsController.getTripPricing
  );

  router.patch(
    "/update",
    tripPricingValidator.validateUpdateTripPricing,
    auth("updateAny", "tripPricing"),
    tripPricingsController.updateTripPricing
  );
};
