const { challengesController } = require("../../../controllers");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/passenger/my",
    auth("readOwn", "trip"),
    challengesController.getMyPassengerChallenges
  );
};
