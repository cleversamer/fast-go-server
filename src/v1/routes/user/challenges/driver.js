const { challengesController } = require("../../../controllers");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/driver/my",
    auth("readOwn", "trip"),
    challengesController.getMyDriverChallenges
  );
};
