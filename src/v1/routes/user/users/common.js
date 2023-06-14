const { usersController } = require("../../../controllers");
const { userValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  //////////////////// AUTHENTICATE ////////////////////
  router.get(
    "/authenticate",
    userValidator.validateAuthenticateUser,
    auth("readOwn", "user", true, true),
    usersController.authenticateUser
  );

  router.get(
    "/socket/join",
    auth("readOwn", "user"),
    usersController.joinUserToSocket
  );

  //////////////////// PROFILE ////////////////////
  router.patch(
    "/profile/update",
    userValidator.validateUpdateProfile,
    auth("updateOwn", "user"),
    usersController.updateProfile
  );

  router.patch(
    "/profile/avatar/update",
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
    "/notifications/toggle",
    auth("updateOwn", "notification"),
    usersController.toggleNotifications
  );

  //////////////////// ACCOUNT DELETION ////////////////////
  router.get(
    "/account/deletion/request",
    auth("deleteOwn", "user", true),
    userValidator.validateRequestAccountDeletion,
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
  router.post(
    "/places/add",
    userValidator.validateSavePlace,
    auth("createOwn", "savedPlace"),
    usersController.savePlace
  );

  router.patch(
    "/places/:placeId/update",
    userValidator.validateUpdateSavedPlace,
    auth("updateOwn", "savedPlace"),
    usersController.updateSavedPlace
  );

  router.delete(
    "/places/:placeId/delete",
    userValidator.validateDeleteSavedPlace,
    auth("updateOwn", "savedPlace"),
    usersController.deleteSavedPlace
  );
};
