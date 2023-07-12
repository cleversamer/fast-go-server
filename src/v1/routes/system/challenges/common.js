const { challengesController } = require("../../../controllers");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/my",
    auth("readOwn", "challenge"),
    challengesController.getMyChallengesProgress
  );
};
