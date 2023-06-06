const commonMiddleware = require("../common");

module.exports.validateJoinWithEmailAndPhone = [
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.checkEmail,
  commonMiddleware.checkPhoneICC,
  commonMiddleware.checkPhoneNSN,
  commonMiddleware.checkFirstName,
  commonMiddleware.checkLastName,
  commonMiddleware.checkGender,
  commonMiddleware.checkRegisterRole,
  commonMiddleware.conditionalCheck(
    "referralCode",
    commonMiddleware.checkReferralCode
  ),
  commonMiddleware.checkDeviceToken,
  commonMiddleware.next,
  commonMiddleware.limitJoin,
];
