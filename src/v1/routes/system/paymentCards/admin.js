const { paymentCardsController } = require("../../../controllers");
const { paymentCardValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.post(
    "/add",
    paymentCardValidator.validateAddPaymentCard,
    auth("createAny", "paymentCard"),
    paymentCardsController.addPaymentCard
  );

  router.post(
    "/auto-add",
    paymentCardValidator.validateAutoAddPaymentCards,
    auth("createAny", "paymentCard"),
    paymentCardsController.autoAddPaymentCards
  );

  router.get(
    "/all",
    paymentCardValidator.validateGetAllPaymentCards,
    auth("readAny", "paymentCard"),
    paymentCardsController.getAllPaymentCards
  );

  router.delete(
    "/:paymentCardId/delete",
    paymentCardValidator.validateDeletePaymentCard,
    auth("readAny", "paymentCard"),
    paymentCardsController.deletePaymentCard
  );
};
