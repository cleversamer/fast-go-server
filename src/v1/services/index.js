module.exports.authService = require("./user/auth");
module.exports.usersService = require("./user/users");
module.exports.tripsService = require("./user/trips");
module.exports.challengesService = require("./user/challenges");
module.exports.paymentCardsService = require("./user/paymentCards");
module.exports.carsService = require("./user/cars");

module.exports.excelService = require("./storage/excel");
module.exports.localStorage = require("./storage/local");

module.exports.notificationsService = require("./cloud/notifications");
module.exports.emailService = require("./cloud/email");
module.exports.cloudStorage = require("./cloud/storage");

module.exports.scheduleService = require("./system/schedule");
module.exports.serverErrorsService = require("./system/serverErrors");
module.exports.tripPricingsService = require("./system/tripPricings");
module.exports.couponCodesService = require("./system/couponCodes");
