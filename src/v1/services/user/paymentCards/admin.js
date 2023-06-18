const { PaymentCard } = require("../../../models/user/paymentCard");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");

module.exports.addPaymentCard = async (cardCode, balance) => {
  try {
    const paymentCard = new PaymentCard({
      code: cardCode,
      balance,
    });

    await paymentCard.save();

    return paymentCard;
  } catch (err) {
    throw err;
  }
};
