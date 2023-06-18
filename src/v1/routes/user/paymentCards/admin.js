const { paymentCardsController } = require("../../../controllers");
const { paymentCardValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.post(
    "/add",
    // paymentCardValidator.validateCheckPaymentCard,
    paymentCardsController.addPaymentCard
  );
};
