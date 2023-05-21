const router = require("express").Router();
const authRoute = require("./user/auth");
const usersRoute = require("./user/users");
const errorsRoute = require("./system/errors");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: usersRoute,
  },
  {
    path: "/errors",
    route: errorsRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
