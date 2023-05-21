const commonMiddleware = require("../common");

module.exports.validateJoinWithEmailAndPhone = [
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkPassword,
  commonMiddleware.conditionalCheck(
    "deviceToken",
    commonMiddleware.checkDeviceToken
  ),
  commonMiddleware.next,
  commonMiddleware.limitLogin,
];

module.exports.validateJoinWithGoogle = [
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.conditionalCheck(
    "deviceToken",
    commonMiddleware.checkDeviceToken
  ),
  commonMiddleware.next,
  commonMiddleware.limitLogin,
];
