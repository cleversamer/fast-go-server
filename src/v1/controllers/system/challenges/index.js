const passengerControllers = require("./passenger");
const driverControllers = require("./driver");

module.exports = {
  ...passengerControllers,
  ...driverControllers,
};
