const { Router } = require("express");
const setupCommonRoutes = require("./common");

const router = Router();

setupCommonRoutes(router);

module.exports = router;
