const driverControllers = require("./driver");
const adminControllers = require("./admin");

module.exports = {
  ...driverControllers,
  ...adminControllers,
};
