const { Router } = require("express");
const setupDriverRoutes = require("./driver");
const setupAdminRoutes = require("./admin");

const router = Router();

setupDriverRoutes(router);

setupAdminRoutes(router);

module.exports = router;
