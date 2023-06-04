const commonMiddleware = require("../common");

module.exports.validateCheckPaymentCard = [
  commonMiddleware.checkPaymentCardCode,
  commonMiddleware.next,
];

module.exports.validateChargePaymentCard = [
  commonMiddleware.checkPaymentCardCode,
  commonMiddleware.next,
];
