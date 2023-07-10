const commonMiddleware = require("../common");

module.exports.validateGetAllCouponCodes = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];
