const { Router } = require("express");
const setupCommonRoutes = require("./common");
const setupDriverRoutes = require("./driver");
const setupAdminRoutes = require("./admin");

const router = Router();

setupCommonRoutes(router);

setupDriverRoutes(router);

setupAdminRoutes(router);

module.exports = router;
