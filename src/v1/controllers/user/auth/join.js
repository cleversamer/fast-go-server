const {
  authService,
  emailService,
  usersService,
  smsService,
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
      gender,
      referralCode,
      deviceToken,
      socketId,
      regToken,
    } = req.body;

    // Find user with provided credentials
    const { user, isDeleted } = await authService.joinWithEmailAndPhone(
      email,
      phoneICC,
      phoneNSN,
      firstName,
      lastName,
      role,
      gender,
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

    if (!user.isPhoneVerified()) {
      const title = "Verify your Fast Go account phone number";
      const body = `${user.getCode("phone")} is your phone verification code`;
      await smsService.sendSMS(title, body, regToken);
    }

    if (isDeleted) {
      // Send welcome back email to user
      await emailService.sendWelcomeBackEmail(
        user.getLanguage(),
        user.getEmail(),
        user.getFullName()
      );
    }

    // Connect user's socket to their own room
    usersService.joinSocketToUserRoom(socketId, user._id);

    // Apply referral code
    await usersService.applyReferralCode(user, referralCode);
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
