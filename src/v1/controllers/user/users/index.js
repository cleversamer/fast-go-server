const commonControllers = require("./common");
const driverControllers = require("./driver");
const adminControllers = require("./admin");

module.exports = {
  ...commonControllers,
  ...driverControllers,
  ...adminControllers,
};
