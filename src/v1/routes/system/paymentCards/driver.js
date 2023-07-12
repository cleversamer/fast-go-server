const { paymentCardsController } = require("../../../controllers");
const { paymentCardValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.post(
    "/check",
    paymentCardValidator.validateCheckPaymentCard,
    paymentCardsController.checkPaymentCard
  );

  router.post(
    "/charge",
    paymentCardValidator.validateChargePaymentCard,
    auth("readOwn", "paymentCard"),
    paymentCardsController.chargePaymentCard
  );
};
