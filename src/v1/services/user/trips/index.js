const passengerServices = require("./passenger");
const driverServices = require("./driver");
const adminServices = require("./admin");

module.exports = {
  ...passengerServices,
  ...driverServices,
  ...adminServices,
};
