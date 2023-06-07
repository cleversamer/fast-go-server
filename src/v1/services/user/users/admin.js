const { User } = require("../../../models/user/user");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");

module.exports.findUserByEmailOrPhone = async (
  emailOrPhone,
  role = "",
  withError = false
) => {
  try {
    // Filter `emailOrPhone` param
    const emailOrPhoneIsEmail = emailOrPhone.includes("@");
    const queryCriteria = emailOrPhoneIsEmail
      ? { email: { $eq: emailOrPhone } }
      : { "phone.full": { $eq: emailOrPhone } };

    // Find user by email or phone
    const user = await User.findOne(queryCriteria);

    // Throwing error if no user found and `throwError = true`
    if (withError && !user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.userNotFound;
      throw new ApiError(statusCode, message);
    }

    // Throwing error if a user was found but the specified `role` does not match
    // This happens in case of role is added as an argument
    // If role is falsy that means this search does not care of role
    if (withError && user && role && user.getRole() !== role) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.foundWithInvalidRole;
      throw new ApiError(statusCode, message);
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.updateDriverProfitRate = async (driverId, profitRate) => {
  try {
    // Check if driver exists
    const driver = await User.findById(driverId);
    if (!driver || !driver.isDriver()) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.driverNotFound;
      throw new ApiError(statusCode, message);
    }

    // Update driver's profit rate
    driver.updateProfitRate(profitRate);

    // Save driver to the DB
    await driver.save();

    return driver;
  } catch (err) {
    throw err;
  }
};
