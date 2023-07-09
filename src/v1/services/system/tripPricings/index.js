const adminServices = require("./admin");
const innerServices = require("./inner");

module.exports = {
  ...adminServices,
  ...innerServices,
};
