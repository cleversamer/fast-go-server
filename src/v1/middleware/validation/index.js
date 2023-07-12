module.exports.authValidator = require("./user/auth");
module.exports.userValidator = require("./user/user");
module.exports.tripValidator = require("./user/trip");
module.exports.carValidator = require("./user/car");

module.exports.serverErrorValidator = require("./system/serverError");
module.exports.tripPricingValidator = require("./system/tripPricing");
module.exports.couponCodeValidator = require("./system/couponCode");
module.exports.paymentCardValidator = require("./system/paymentCard");
module.exports.challengeValidator = require("./system/challenge");
