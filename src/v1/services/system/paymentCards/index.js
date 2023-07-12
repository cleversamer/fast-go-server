const driverServices = require("./driver");
const adminServices = require("./admin");

module.exports = {
  ...driverServices,
  ...adminServices,
};
