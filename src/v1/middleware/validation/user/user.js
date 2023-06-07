const commonMiddleware = require("../common");
const { server } = require("../../../config/system");

module.exports.validateAuthenticateUser = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.conditionalCheck(
    "deviceToken",
    commonMiddleware.checkDeviceToken
  ),
  commonMiddleware.next,
];

module.exports.validateUpdateEmail = [
  commonMiddleware.checkEmail,
  commonMiddleware.next,
  commonMiddleware.limitUpdateEmail,
];

module.exports.validateUpdateAvatar = [
  commonMiddleware.checkFile("avatar", server.SUPPORTED_PHOTO_EXTENSIONS, true),
];

////////////////////////////////////////////////////////////
module.exports.validateSendEmailVerificationCode = [
  commonMiddleware.limitSendEmailVerificationCode,
];

module.exports.validateSendPhoneVerificationCode = [
  commonMiddleware.limitSendPhoneVerificationCode,
];

module.exports.validateVerifyEmailByLink = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.validateUpdatePhone = [
  commonMiddleware.checkPhoneICC,
  commonMiddleware.checkPhoneNSN,
  commonMiddleware.next,
  commonMiddleware.limitUpdatePhone,
];

module.exports.validateRequestAccountDeletion = [
  commonMiddleware.limitSendAccountDeletionCode,
];

module.exports.validateConfirmAccountDeletion = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.validateFindUserByEmailOrPhone = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkRole(true),
  commonMiddleware.next,
];

module.exports.validateSendNotification = [
  commonMiddleware.checkUserIds,
  commonMiddleware.checkNotificationTitleEN,
  commonMiddleware.checkNotificationTitleAR,
  commonMiddleware.checkNotificationBodyEN,
  commonMiddleware.checkNotificationBodyAR,
  commonMiddleware.next,
];

module.exports.validateCode = [
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.validatePhone = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPhoneICC,
  commonMiddleware.checkPhoneNSN,
  commonMiddleware.next,
];

module.exports.validateSavePlace = [
  commonMiddleware.checkPlaceTitle,
  commonMiddleware.checkCarType,
  commonMiddleware.checkLongitude,
  commonMiddleware.checkLatitude,
  commonMiddleware.next,
];

module.exports.validateUpdateSavedPlace = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPlaceId,
  commonMiddleware.checkCarType,
  commonMiddleware.checkLongitude,
  commonMiddleware.checkLatitude,
  commonMiddleware.next,
];

module.exports.validateDeleteSavedPlace = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPlaceId,
  commonMiddleware.next,
];

module.exports.validateUpdateDriverProfitRate = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkDriverId,
  commonMiddleware.checkDriverProfitRate,
  commonMiddleware.next,
];
