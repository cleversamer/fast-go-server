const { paymentCardsController } = require("../../../controllers");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.post("/check", paymentCardsController.checkPaymentCard);

  router.post(
    "/charge",
    auth("readOwn", "paymentCard"),
    paymentCardsController.chargePaymentCard
  );
};
