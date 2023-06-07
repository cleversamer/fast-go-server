const httpStatus = require("http-status");
const { clientSchema } = require("../../../models/user/car");
const { carsService } = require("../../../services");
const _ = require("lodash");

module.exports.getUnverifiedCars = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const unverifiedCars = await carsService.getUnverifiedCars(page, limit);

    const response = {
      unverifiedCars: unverifiedCars.map((car) => _.pick(car, clientSchema)),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.verifyCar = async (req, res, next) => {
  try {
    const { carId } = req.params;
    const { type } = req.body;

    const { car } = await carsService.verifyCar(carId, type);

    const response = _.pick(car, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
