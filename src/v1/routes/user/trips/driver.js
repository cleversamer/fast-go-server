const { tripsController } = require("../../../controllers");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/driver/my",
    auth("readOwn", "trip"),
    tripsController.getMyDriverTrips
  );

  router.post(
    "/driver/:tripId/approve",
    auth("createOwn", "trip"),
    tripsController.approveTrip
  );

  router.post(
    "/driver/:tripId/reject",
    auth("createOwn", "trip"),
    tripsController.rejectTrip
  );
};
