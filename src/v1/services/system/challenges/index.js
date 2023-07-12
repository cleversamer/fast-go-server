const passengerServices = require("./passenger");
const driverServices = require("./driver");

module.exports = {
  ...passengerServices,
  ...driverServices,
};
