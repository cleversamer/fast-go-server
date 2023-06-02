const { usersController } = require("../../../controllers");
const { userValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  //////////////////// AUTHENTICATE ////////////////////
  router.get(
    "/authenticate",
    userValidator.validateAuthenticateUser,
    auth("readOwn", "user", true),
    usersController.authenticateUser
  );

  //////////////////// PROFILE ////////////////////
  router.patch(
    "/profile/email/update",
    userValidator.validateUpdateEmail,
    auth("updateOwn", "user"),
    usersController.updateEmail
  );

  router.patch(
    "/profile/avatar/update",
    userValidator.validateUpdateAvatar,
    auth("updateOwn", "user"),
    usersController.updateAvatar
  );

  router.patch(
    "/profile/language/switch",
    auth("updateOwn", "user"),
    usersController.switchLanguage
  );

  //////////////////// NOTIFICATIONS ////////////////////
  router.get(
    "/notifications/see",
    auth("readOwn", "notification"),
    usersController.seeNotifications
  );

  router.delete(
    "/notifications/clear",
    auth("deleteOwn", "notification"),
    usersController.clearNotifications
  );

  router.patch(
    "/notifications/disable",
    auth("updateOwn", "notification"),
    usersController.disableNotifications
  );

  router.patch(
    "/notifications/enable",
    auth("updateOwn", "notification"),
    usersController.enableNotifications
  );

  //////////////////// ACCOUNT DELETION ////////////////////
  router.get(
    "/account/deletion/request",
    userValidator.validateRequestAccountDeletion,
    auth("deleteOwn", "user", true),
    usersController.requestAccountDeletion
  );

  router.get(
    "/account/deletion/confirm",
    userValidator.validateConfirmAccountDeletion,
    usersController.confirmAccountDeletion
  );

  //////////////////// EMAIL ////////////////////
  router
    .route("/email/verify")
    .get(
      auth("readOwn", "emailVerificationCode", true),
      userValidator.validateSendEmailVerificationCode,
      usersController.resendEmailOrPhoneVerificationCode("email")
    )
    .post(
      userValidator.validateCode,
      auth("updateOwn", "emailVerificationCode", true),
      usersController.verifyEmailOrPhone("email")
    );

  router.get(
    "/email/verify/fast",
    userValidator.validateVerifyEmailByLink,
    usersController.verifyEmailByLink
  );

  //////////////////// PHONE ////////////////////
  router
    .route("/phone/verify")
    .get(
      auth("readOwn", "phoneVerificationCode", true),
      userValidator.validateSendPhoneVerificationCode,
      usersController.resendEmailOrPhoneVerificationCode("phone")
    )
    .post(
      userValidator.validateCode,
      auth("updateOwn", "phoneVerificationCode", true),
      usersController.verifyEmailOrPhone("phone")
    );

  //////////////////// SAVED PLACES ////////////////////
  router.get(
    "/places/my",
    auth("readOwn", "savedPlace"),
    usersController.getMySavedPlaces
  );

  router.post(
    "/places/add",
    auth("createOwn", "savedPlace"),
    usersController.savePlace
  );

  router.patch(
    "/places/:placeId/update",
    auth("updateOwn", "savedPlace"),
    usersController.updateSavedPlace
  );

  router.delete(
    "/places/:placeId/delete",
    auth("updateOwn", "savedPlace"),
    usersController.deleteSavedPlace
  );
};
