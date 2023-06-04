const { challengesController } = require("../../../controllers");
const { challengeValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/driver/my",
    challengeValidator.validateGetMyDriverChallenges,
    auth("readOwn", "trip"),
    challengesController.getMyDriverChallenges
  );
};
