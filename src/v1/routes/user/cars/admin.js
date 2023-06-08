const { carsController } = require("../../../controllers");
const { carValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/admin/unverified",
    carValidator.validateGetUnverifiedCars,
    auth("readAny", "car"),
    carsController.getUnverifiedCars
  );

  router.post(
    "/admin/:carId/verify",
    carValidator.validateVerifyCar,
    auth("readAny", "car"),
    carsController.verifyCar
  );
};
