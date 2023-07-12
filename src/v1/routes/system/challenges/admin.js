const { challengesController } = require("../../../controllers");
const { challengeValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/all",
    auth("readAny", "challenge"),
    challengesController.getAllChallenges
  );

  router.post(
    "/add",
    challengeValidator.validateAddChallenge,
    auth("createAny", "challenge"),
    challengesController.addChallenge
  );

  router.delete(
    "/:challengeId/delete",
    challengeValidator.validateDeleteChallenge,
    auth("deleteAny", "challenge"),
    challengesController.deleteChallenge
  );
};
