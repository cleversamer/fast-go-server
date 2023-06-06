const AccessControl = require("accesscontrol");
const passenger = require("./passenger");
const driver = require("./driver");
const admin = require("./admin");

const roles = new AccessControl({
  passenger,
  driver,
  admin,
});

module.exports = roles;
