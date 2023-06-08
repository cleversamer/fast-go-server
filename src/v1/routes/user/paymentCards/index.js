const { Router } = require("express");
const setupDriverRoutes = require("./driver");

const router = Router();

setupDriverRoutes(router);

module.exports = router;
