const { tripsController } = require("../../../controllers");
const { tripValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/passenger/my",
    tripValidator.validateGetMyPassengerTrips,
    auth("readOwn", "trip"),
    tripsController.getMyPassengerTrips
  );

  router.post(
    "/passenger/request",
    tripValidator.validateRequestTrip,
    auth("createOwn", "trip"),
    tripsController.requestTrip
  );
};
