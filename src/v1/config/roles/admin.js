const { allRights } = require("./common");

module.exports = Object.freeze({
  user: allRights,
  emailVerificationCode: allRights,
  phoneVerificationCode: allRights,
  notification: allRights,
  review: allRights,
  error: allRights,
  savedPlace: allRights,
  trip: allRights,
  paymentCard: allRights,
});
