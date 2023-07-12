const { challengesController } = require("../../../controllers");
const { challengeValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/passenger/my",
    challengeValidator.validateGetMyPassengerChallenges,
    auth("readOwn", "trip"),
    challengesController.getMyPassengerChallenges
  );
};
