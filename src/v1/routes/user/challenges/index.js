const { Router } = require("express");
const setupPassengerRoutes = require("./passenger");
const setupDriverRoutes = require("./driver");

const router = Router();

setupPassengerRoutes(router);

setupDriverRoutes(router);

module.exports = router;
