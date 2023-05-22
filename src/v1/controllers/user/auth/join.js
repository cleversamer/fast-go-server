const {
  authService,
  emailService,
  usersService,
} = require("../../../services");
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
      role,
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
      role,
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

    if (!user.isPhoneVerified()) {
      await usersService.resendEmailOrPhoneVerificationCode("phone", user);
      console.log("Phone verification code has been sent...");
    }

    if (isDeleted) {
      // Send welcome back email to user
      await emailService.sendWelcomeBackEmail(
        user.getLanguage(),
        user.getEmail(),
        user.getFullName()
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
        user.getFullName()
      );
    }
  } catch (err) {
    next(err);
  }
};
