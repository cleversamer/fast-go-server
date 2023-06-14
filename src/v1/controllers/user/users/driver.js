const httpStatus = require("http-status");
const _ = require("lodash");
const { clientSchema } = require("../../../models/user/user");
const { usersService } = require("../../../services");

module.exports.toggleDriverConnected = async (req, res, next) => {
  try {
    const user = req.user;

    const newUser = await usersService.toggleDriverConnected(user);

    // Create the response object
    const response = _.pick(newUser, clientSchema);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
