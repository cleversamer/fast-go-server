const { User } = require("../../../models/user/user");
const { Car, querySchema } = require("../../../models/user/car");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");

module.exports.getUnverifiedCars = async (page, limit) => {
  try {
    page = parseInt(page);
    limit = parseInt(limit);

    // TODO: write the query to get all unverified cars with their drivers
    const unverifiedCars = await Car.aggregate([
      { $match: { verified: false } },
      { $sort: { _id: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: "User",
          localField: "driver",
          foreignField: "_id",
          as: "driver",
        },
      },
      {
        $project: querySchema,
      },
    ]);

    if (!unverifiedCars || !unverifiedCars.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.car.noUnverifiedCars;
      throw new ApiError(statusCode, message);
    }

    return unverifiedCars;
  } catch (err) {
    throw err;
  }
};

module.exports.verifyCar = async (carId, type) => {
  try {
    const car = await Car.findById(carId);
    if (!car) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.car.notFound;
      throw new ApiError(statusCode, message);
    }

    const driver = await User.findById(car.driver);
    if (!driver) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.driverNotFound;
      throw new ApiError(statusCode, message);
    }

    // Veriy car and update its type
    car.verify();
    car.updateType(type);
    await car.save();

    // Verify driver
    driver.verifyDriver();
    await driver.save();

    return { car, driver };
  } catch (err) {
    throw err;
  }
};
