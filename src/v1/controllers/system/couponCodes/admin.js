const { clientSchema } = require("../../../models/system/couponCode");
const { couponCodesService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.getAllCouponCodes = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const couponCodes = await couponCodesService.getAllCouponCodes(page, limit);

    const response = {
      couponCodes: couponCodes.map((couponCode) =>
        _.pick(couponCode, clientSchema)
      ),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.addCouponCode = async (req, res, next) => {
  try {
    const { code, discountPercentage } = req.body;

    const couponCode = await couponCodesService.addCouponCode(
      code,
      discountPercentage
    );

    const response = _.pick(couponCode, clientSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCouponCode = async (req, res, next) => {
  try {
    const { couponCodeId } = req.params;

    const couponCode = await couponCodesService.deleteCouponCode(couponCodeId);

    const response = _.pick(couponCode, clientSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
