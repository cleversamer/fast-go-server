const httpStatus = require("http-status");
const _ = require("lodash");
const { clientSchema } = require("../../../models/system/paymentCard");
const { paymentCardsService } = require("../../../services");

module.exports.checkPaymentCard = async (req, res, next) => {
  try {
    const { cardCode } = req.body;

    const paymentCard = await paymentCardsService.checkPaymentCard(cardCode);

    const response = _.pick(paymentCard, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.chargePaymentCard = async (req, res, next) => {
  try {
    const user = req.user;
    const { cardCode } = req.body;

    const paymentCard = await paymentCardsService.chargePaymentCard(
      user,
      cardCode
    );

    const response = _.pick(paymentCard, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
