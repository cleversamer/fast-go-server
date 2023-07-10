const { CouponCode } = require("../../../models/system/couponCode");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");

module.exports.getAllCouponCodes = async (page, limit) => {
  try {
    page = parseInt(page);
    limit = parseInt(limit);

    const couponCodes = await CouponCode.find({})
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    if (!couponCodes || !couponCodes.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.couponCode.noCouponCodes;
      throw new ApiError(statusCode, message);
    }

    return couponCodes;
  } catch (err) {
    throw err;
  }
};

module.exports.addCouponCode = async (code, discountPercentage) => {
  try {
    const couponCode = new CouponCode({ code, discountPercentage });
    await couponCode.save();
    return couponCode;
  } catch (err) {
    if (err.code == errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.couponCode.alreadyAdded;
      throw new ApiError(statusCode, message);
    }

    throw err;
  }
};

module.exports.deleteCouponCode = async (couponCodeId) => {
  try {
    const couponCode = await CouponCode.findByIdAndDelete(couponCodeId);
    if (!couponCode) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.couponCode.notFound;
      throw new ApiError(statusCode, message);
    }

    return couponCode;
  } catch (err) {
    throw err;
  }
};
