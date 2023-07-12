const httpStatus = require("http-status");
const _ = require("lodash");
const { clientSchema } = require("../../../models/system/paymentCard");
const { paymentCardsService } = require("../../../services");
const success = require("../../../config/success");

module.exports.addPaymentCard = async (req, res, next) => {
  try {
    const { cardCode, balance } = req.body;

    const paymentCard = await paymentCardsService.addPaymentCard(
      cardCode,
      balance
    );

    const response = _.pick(paymentCard, clientSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.autoAddPaymentCards = async (req, res, next) => {
  try {
    const { balance, count } = req.body;

    const paymentCardsAdded = await paymentCardsService.autoAddPaymentCards(
      balance,
      count
    );

    const response = success.paymentCard.paymentCardsAdded;

    if (paymentCardsAdded) {
      res.status(httpStatus.CREATED).json(response);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getAllPaymentCards = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const paymentCards = await paymentCardsService.getAllPaymentCards(
      page,
      limit
    );

    const response = {
      paymentCards: paymentCards.map((paymentCard) =>
        _.pick(paymentCard, clientSchema)
      ),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.deletePaymentCard = async (req, res, next) => {
  try {
    const { paymentCardId } = req.params;

    const paymentCard = await paymentCardsService.deletePaymentCard(
      paymentCardId
    );

    const response = _.pick(paymentCard, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
