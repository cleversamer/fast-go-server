const {
  authService,
  emailService,
  usersService,
} = require("../../../services");
const { user: userNotifications } = require("../../../config/notifications");
const httpStatus = require("http-status");
const { clientSchema } = require("../../../models/user/user");
const _ = require("lodash");

module.exports.joinWithEmailAndPhone = async (req, res, next) => {
  try {
    const {
      lang,
      email,
      phoneICC,
      phoneNSN,
      firstName,
      lastName,
      deviceToken,
      socketId,
    } = req.body;

    // Find user with provided credentials
    const { user, isDeleted } = await authService.joinWithEmailAndPhone(
      email,
      phoneICC,
      phoneNSN,
      firstName,
      lastName,
      deviceToken,
      lang
    );

    // Create the response object
    const response = {
      user: _.pick(user, clientSchema),
      token: user.genAuthToken(),
    };

    // Connect user's socket to their own room
    usersService.joinSocketToUserRoom(socketId, user._id);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);

    if (isDeleted) {
      // Send welcome back email to user
      await emailService.sendWelcomeBackEmail(
        user.getLanguage(),
        user.getEmail(),
        user.getName()
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports.joinWithGoogle = async (req, res, next) => {
  try {
    const { lang, googleToken, deviceToken, socketId } = req.body;

    // Find user by google email
    const { user, isDeleted } = await authService.joinWithGoogle(
      googleToken,
      deviceToken,
      lang
    );

    // Create the response object
    const response = {
      user: _.pick(user, clientSchema),
      token: user.genAuthToken(),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);

    // Connect user's socket to their own room
    usersService.joinSocketToUserRoom(socketId, user._id);

    if (isDeleted) {
      // Send welcome back email to user
      await emailService.sendWelcomeBackEmail(
        user.getLanguage(),
        user.getEmail(),
        user.getName()
      );
    }
  } catch (err) {
    next(err);
  }
};
