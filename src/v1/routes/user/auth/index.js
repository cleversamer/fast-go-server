const { Router } = require("express");
const setupJoinRoutes = require("./join");

const router = Router();

setupJoinRoutes(router);

module.exports = router;
