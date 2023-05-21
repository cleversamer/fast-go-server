const { authController } = require("../../../controllers");
const { authValidator } = require("../../../middleware/validation");

module.exports = (router) => {
  router.post(
    "/login/any",
    authValidator.validateJoinWithEmailAndPhone,
    authController.joinWithEmailAndPhone
  );

  router.post(
    "/login/google",
    authValidator.validateJoinWithGoogle,
    authController.joinWithGoogle
  );
};
