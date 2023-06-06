const httpStatus = require("http-status");
const { clientSchema } = require("../../../models/user/car");
const { carsService } = require("../../../services");
const _ = require("lodash");

module.exports.addCar = async (req, res, next) => {
  try {
    const user = req.user;
    const { plateNumber, productionYear, model, color, type } = req.body;
    const {
      avatar,
      photo1,
      photo2,
      photo3,
      photo4,
      brochure,
      driverLicense,
      insurance,
      passport,
    } = req.files;

    const car = await carsService.addCar(
      user,
      plateNumber,
      productionYear,
      model,
      color,
      type,
      avatar,
      photo1,
      photo2,
      photo3,
      photo4,
      brochure,
      driverLicense,
      insurance,
      passport
    );

    const response = _.pick(car, clientSchema);

    res.statsu(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
