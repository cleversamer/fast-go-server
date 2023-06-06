const { carsController } = require("../../../controllers");
const { carValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.post(
    "/driver/add",
    carValidator.validateAddCar,
    auth("createOwn", "car"),
    carsController.addCar
  );
};
