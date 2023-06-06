const { carsController } = require("../../../controllers");
const { carValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.post(
    "/admin/unverified",
    carValidator.validateGetUnverifiedCars,
    auth("readAny", "car"),
    carsController.getUnverifiedCars
  );
};
