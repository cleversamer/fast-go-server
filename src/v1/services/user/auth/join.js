const { User } = require("../../../models/user/user");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const usersService = require("../users");

module.exports.joinWithEmailAndPhone = async (
  email,
  phoneICC,
  phoneNSN,
  firstName,
  lastName,
  role,
  gender,
  deviceToken,
  lang
) => {
  try {
    let isDeleted = false;

    // Construct full phone
    const fullPhone = `${phoneICC}${phoneNSN}`;

    // Check if user exists
    let user = await User.findOne({ "phone.full": fullPhone, email });
    if (user) {
      isDeleted = user.isDeleted();

      if (isDeleted) {
        user.restoreAccount();
      }
    } else {
      // Generate a referral code for the new user
      const referralCode = await usersService.genUniqueReferralCode();

      // Create new user
      user = new User({
        firstName,
        lastName,
        email,
        role,
        gender,
        referral: {
          code: referralCode,
          number: 0,
        },
        phone: {
          full: fullPhone,
          icc: phoneICC,
          nsn: phoneNSN,
        },
      });
    }

    // Update user's device token
    user.updateDeviceToken(deviceToken);

    // Update user's favorite language
    user.updateLanguage(lang);

    // Update user's last login date
    user.updateLastLogin();

    // Save user to the DB
    await user.save();

    return {
      user,
      isDeleted,
    };
  } catch (err) {
    if (err.code === errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.auth.emailOrPhoneUsed;
      throw new ApiError(statusCode, message);
    }

    throw err;
  }
};
