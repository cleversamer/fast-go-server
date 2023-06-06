const { authController } = require("../../../controllers");
const { authValidator } = require("../../../middleware/validation");

module.exports = (router) => {
  router.post(
    "/join/regular",
    authValidator.validateJoinWithEmailAndPhone,
    authController.joinWithEmailAndPhone
  );
};
