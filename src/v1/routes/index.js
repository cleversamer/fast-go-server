const router = require("express").Router();
const authRoute = require("./user/auth");
const usersRoute = require("./user/users");
const tripsRoute = require("./user/trips");
const challengesRoute = require("./user/challenges");
const paymentCardsRoute = require("./user/paymentCards");
const carsRoute = require("./user/cars");
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
    path: "/trips",
    route: tripsRoute,
  },
  {
    path: "/challenges",
    route: challengesRoute,
  },
  {
    path: "/cards/payment",
    route: paymentCardsRoute,
  },
  {
    path: "/cars",
    route: carsRoute,
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
