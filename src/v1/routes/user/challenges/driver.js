const { challnegesController } = require("../../../controllers");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/driver/my",
    auth("readOwn", "trip"),
    challnegesController.getMyDriverChallenges
  );
};
