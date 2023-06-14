const { usersController } = require("../../../controllers");
const { userValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

module.exports = (router) => {
  //////////////////// AUTHENTICATE ////////////////////
  router.patch(
    "/driver/connection/toggle",
    auth("readOwn", "user"),
    usersController.authenticateUser
  );
};
