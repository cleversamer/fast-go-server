const { User } = require("../../../models/user/user");
const httpStatus = require("http-status");
const localStorage = require("../../storage/local");
const cloudStorage = require("../../cloud/storage");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");
const innerServices = require("./inner");
const adminServices = require("./admin");

module.exports.authenticateUser = async (user, lang, deviceToken) => {
  try {
    // [OPTIONAL]: Update user's favorite language
    user.updateLanguage(lang);

    // [OPTIONAL]: Update user's device token
    user.updateDeviceToken(deviceToken);

    // Update user's last login date
    user.updateLastLogin();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.resendEmailOrPhoneVerificationCode = async (key, user) => {
  try {
    // Ensure that key is correct
    key = key.toLowerCase();
    if (!["email", "phone"].includes(key)) {
      key = "email";
    }

    // Check if user's email or phone is verified
    const isVerified =
      key === "email" ? user.isEmailVerified() : user.isPhoneVerified();
    if (isVerified) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user[`${key}AlreadyVerified`];
      throw new ApiError(statusCode, message);
    }

    // Update user's email or phone verification code
    // Send code in a message to user's email or phone
    user.updateCode(key);

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.verifyEmailOrPhone = async (key, user, code) => {
  try {
    // Ensure that key is correct
    key = key.toLowerCase();
    if (!["email", "phone"].includes(key)) {
      key = "email";
    }

    // Check if user's email or phone is verified
    const isVerified =
      key === "email" ? user.isEmailVerified() : user.isPhoneVerified();
    if (isVerified) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user[`${key}AlreadyVerified`];
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode(key, code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode(key);
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Verify user's email or phone
    if (key === "email") {
      user.verifyEmail();
    } else {
      user.verifyPhone();
    }

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.verifyEmailByLink = async (token, code) => {
  try {
    const payload = innerServices.validateToken(token);

    // Check if user exists
    const user = await User.findById(payload.sub);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.userNotFound;
      throw new ApiError(statusCode, message);
    }

    // Check if user's email is already verified
    if (user.isEmailVerified()) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.emailAlreadyVerified;
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode("email", code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode("email");
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Verify user's email
    user.verifyEmail();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.updateProfile = async (
  user,
  name,
  email,
  phoneICC,
  phoneNSN,
  avatar
) => {
  try {
    const body = {
      user,
      name,
      email,
      phoneICC,
      phoneNSN,
      avatar,
    };

    return await updateUserProfile(user, body);
  } catch (err) {
    throw err;
  }
};

module.exports.updateEmail = async (user, email) => {
  try {
    // Check if new email equals the previous email
    if (user.getEmail() === email) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.newEmailMatchesPrev;
      throw new ApiError(statusCode, message);
    }

    // Checking if email used
    const isEmailUsed = await adminServices.findUserByEmailOrPhone(email);
    if (isEmailUsed) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.auth.emailUsed;
      throw new ApiError(statusCode, message);
    }

    // Update user's email
    user.updateEmail(email);

    // Mark user's email as not verified
    user.unverifyEmail();

    // Update user's email verification code
    user.updateCode("email");

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.updateAvatar = async (user, avatar) => {
  try {
    // Check if user has an avatar that's stored on the bucket
    if (user.getAvatarURL() && !user.hasGoogleAvatar()) {
      await cloudStorage.deleteFile(user.getAvatarURL());
      user.clearAvatarURL();
    }

    // Store file locally in the `uploads` folder
    const localPhoto = await localStorage.storeFile(avatar);

    // Upload file from `uploads` folder to cloud bucket
    const cloudPhotoURL = await cloudStorage.uploadFile(localPhoto);

    // Delete previous avatar picture from cloud bucket
    await cloudStorage.deleteFile(user.getAvatarURL());

    // Update user's avatar URL
    user.updateAvatarURL(cloudPhotoURL);

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.switchLanguage = async (user) => {
  try {
    // Switch user's language
    user.switchLanguage();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.seeNotifications = async (user) => {
  try {
    // Check all user's notifications
    const { isAllSeen, list } = user.seeNotifications();

    // Throw an error in case of all user's notifications
    // are already seen
    if (isAllSeen) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.notificationsSeen;
      throw new ApiError(statusCode, message);
    }

    // Save the user
    await user.save();

    // Return user's notifications
    return list;
  } catch (err) {
    throw err;
  }
};

module.exports.clearNotifications = async (user) => {
  try {
    // Clear notifications
    const isEmpty = user.clearNotifications();

    // Check if notifications are empty
    if (isEmpty) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.noNotifications;
      throw new ApiError(statusCode, message);
    }

    // Save the user
    await user.save();

    // Return user's notifications
    return user.notifications;
  } catch (err) {
    throw err;
  }
};

module.exports.disableNotifications = async (user) => {
  try {
    // Disable notifications for user
    user.disableNotifications();

    // Save the user
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.enableNotifications = async (user) => {
  try {
    // Disable notifications for user
    user.enableNotifications();

    // Save the user
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.requestAccountDeletion = async (user) => {
  try {
    // Update user's account deletion code
    user.updateCode("deletion");

    // Save the user
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.confirmAccountDeletion = async (token, code) => {
  try {
    const payload = innerServices.validateToken(token);

    // Check if user exists
    const user = await User.findById(payload.sub);
    if (!user || user.isDeleted()) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.userNotFound;
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode("deletion", code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode("deletion");
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Mark user as deleted
    user.markAsDeleted();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.getMySavedPlaces = async (user) => {
  try {
    const savedPlaces = user.getSavedPlaces();

    if (!savedPlaces || !savedPlaces.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.noSavedPlaces;
      throw new ApiError(statusCode, message);
    }

    return savedPlaces;
  } catch (err) {
    throw err;
  }
};

module.exports.savePlace = async (user, title, type, longitude, latitude) => {
  try {
    // Add place to user's saved places list
    user.savePlace(title, type, longitude, latitude);

    // Save user to the DB
    await user.save();

    return user.getSavedPlaces();
  } catch (err) {
    throw err;
  }
};

module.exports.updateSavedPlace = async (
  user,
  placeId,
  title,
  type,
  longitude,
  latitude
) => {
  try {
    const { found, updated } = user.updatePlace(
      placeId,
      title,
      type,
      longitude,
      latitude
    );

    if (!found) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.placeNotFound;
      throw new ApiError(statusCode, message);
    }

    if (!updated) {
      const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const message = errors.user.placeNotUpdated;
      throw new ApiError(statusCode, message);
    }

    await user.save();

    return user.getSavedPlaces();
  } catch (err) {
    throw err;
  }
};

module.exports.deleteSavedPlace = async (user, placeId) => {
  try {
    user.deletePlace(placeId);

    await user.save();

    return user.getSavedPlaces();
  } catch (err) {
    throw err;
  }
};
