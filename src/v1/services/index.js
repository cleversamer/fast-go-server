module.exports.authService = require("./user/auth");
module.exports.usersService = require("./user/users");
module.exports.googleService = require("./user/google");
module.exports.tripsService = require("./user/trips");

module.exports.excelService = require("./storage/excel");
module.exports.localStorage = require("./storage/local");

module.exports.notificationsService = require("./cloud/notifications");
module.exports.emailService = require("./cloud/email");
module.exports.smsService = require("./cloud/sms");
module.exports.cloudStorage = require("./cloud/storage");

module.exports.scheduleService = require("./system/schedule");
module.exports.serverErrorsService = require("./system/serverErrors");
