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

  router.put(
    "/admin/drivers/profit-rate/update",
    userValidator.validateUpdateAllDriversProfitRate,
    auth("updateAny", "user"),
    usersController.updateAllDriversProfitRate
  );

  router.patch(
    "/admin/:userId/profit-rate/update",
    userValidator.validateUpdateDriverProfitRate,
    auth("updateAny", "user"),
    usersController.updateDriverProfitRate
  );

  router.get(
    "/admin/stats",
    auth("readAny", "user"),
    usersController.getDriversStats
  );
};
