const httpStatus = require("http-status");
const _ = require("lodash");
const { clientSchema } = require("../../../models/user/paymentCard");
const { paymentCardsService } = require("../../../services");

module.exports.addPaymentCard = async (req, res, next) => {
  try {
    const { cardCode, balance } = req.body;

    const paymentCard = await paymentCardsService.addPaymentCard(
      cardCode,
      balance
    );

    const response = _.pick(paymentCard, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
