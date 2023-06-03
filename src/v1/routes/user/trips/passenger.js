const { tripsController } = require("../../../controllers");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/passenger/my",
    auth("readOwn", "trip"),
    tripsController.getMyPassengerTrips
  );

  router.post(
    "/passenger/request",
    auth("createOwn", "trip"),
    tripsController.requestTrip
  );
};
