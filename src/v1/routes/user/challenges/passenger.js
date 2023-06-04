const { challnegesController } = require("../../../controllers");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/passenger/my",
    auth("readOwn", "trip"),
    challnegesController.getMyPassengerChallenges
  );
};
