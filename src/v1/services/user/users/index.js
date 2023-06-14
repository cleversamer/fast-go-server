const innerServices = require("./inner");
const notificationsServices = require("./notifications");
const commonServices = require("./common");
const driverServices = require("./driver");
const adminServices = require("./admin");

module.exports = {
  ...innerServices,
  ...notificationsServices,
  ...commonServices,
  ...driverServices,
  ...adminServices,
};
