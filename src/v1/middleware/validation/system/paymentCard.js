const commonMiddleware = require("../common");

module.exports.validateCheckPaymentCard = [
  commonMiddleware.checkPaymentCardCode,
  commonMiddleware.next,
];

module.exports.validateChargePaymentCard = [
  commonMiddleware.checkPaymentCardCode,
  commonMiddleware.next,
];

module.exports.validateAddPaymentCard = [
  commonMiddleware.checkPaymentCardCode,
  commonMiddleware.checkPaymentCardBalance,
  commonMiddleware.next,
];

module.exports.validateAutoAddPaymentCards = [
  commonMiddleware.checkPaymentCardBalance,
  commonMiddleware.checkPaymentCardsCount,
  commonMiddleware.next,
];

module.exports.validateGetAllPaymentCards = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];

module.exports.validateDeletePaymentCard = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPaymentCardId,
  commonMiddleware.next,
];
