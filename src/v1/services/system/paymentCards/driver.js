const { PaymentCard } = require("../../../models/system/paymentCard");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");

module.exports.checkPaymentCard = async (code) => {
  try {
    const paymentCard = await PaymentCard.findOne({ code });
    if (!paymentCard) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.paymentCard.notFound;
      throw new ApiError(statusCode, message);
    }

    return paymentCard;
  } catch (err) {
    throw err;
  }
};

module.exports.chargePaymentCard = async (user, code) => {
  try {
    const paymentCard = await PaymentCard.findOne({ code });
    if (!paymentCard) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.paymentCard.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if payment card has been charged
    if (paymentCard.charger) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.paymentCard.alreadyCharged;
      throw new ApiError(statusCode, message);
    }

    // Add balance to user
    user.addBalance(paymentCard.balance);
    await user.save();

    // Add charger to payment card
    paymentCard.charger = user._id;
    await paymentCard.save();

    return paymentCard;
  } catch (err) {
    throw err;
  }
};
