const { Router } = require("express");
const setupLoginRoutes = require("./login");

const router = Router();

setupLoginRoutes(router);

module.exports = router;
