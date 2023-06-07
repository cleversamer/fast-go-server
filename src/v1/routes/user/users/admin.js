const { usersController } = require("../../../controllers");
const { userValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  router.get(
    "/admin/user/find",
    userValidator.validateFindUserByEmailOrPhone,
    auth("readAny", "user"),
    usersController.findUserByEmailOrPhone
  );

  router.get(
    "/admin/export",
    auth("readAny", "user"),
    usersController.exportUsersToExcel
  );

  router.post(
    "/admin/notifications/send",
    userValidator.validateSendNotification,
    auth("createAny", "notification"),
    usersController.sendNotification
  );

  router.patch(
    "/admin/:userId/profit-rate/update",
    userValidator.validateUpdateDriverProfitRate,
    auth("updateAny", "user"),
    usersController.updateDriverProfitRate
  );
};
