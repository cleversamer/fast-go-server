const driverServices = require("./driver");
const adminServices = require("./admin");
const innerServices = require("./inner");

module.exports = {
  ...driverServices,
  ...adminServices,
  ...innerServices,
};
