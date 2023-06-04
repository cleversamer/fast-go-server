const { check, validationResult } = require("express-validator");
const langdetect = require("langdetect");
const httpStatus = require("http-status");
const { ApiError } = require("../apiError");
const errors = require("../../config/errors");
const { server } = require("../../config/system");
const countries = require("../../data/countries.json");
const { rateLimit } = require("express-rate-limit");
const {
  user: userValidation,
  car: carValidation,
} = require("../../config/models");
const { isValidObjectId } = require("mongoose");

module.exports.putQueryParamsInBody = (req, res, next) => {
  req.body = {
    ...req.query,
    ...req.params,
    ...req.body,
  };

  next();
};

module.exports.parseTokenFromQuery = (req, res, next) => {
  req.headers["Authorization"] = "Bearer " + req.query["token"];
  next();
};

module.exports.next = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.array()[0].msg;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  next();
};

module.exports.checkDeviceToken = check("deviceToken")
  .trim()
  .isLength({
    min: userValidation.deviceToken.minLength,
    max: userValidation.deviceToken.maxLength,
  })
  .withMessage(errors.auth.invalidDeviceToken);

module.exports.checkEmailOrPhone = check("emailOrPhone")
  .trim()
  .isLength({
    min: Math.min(userValidation.email.minLength, countries.minPhone),
    max: Math.max(userValidation.email.maxLength, countries.maxPhone),
  })
  .withMessage(errors.auth.invalidEmailOrPhone)
  .bail();

module.exports.checkEmail = check("email")
  .trim()
  .isEmail()
  .withMessage(errors.auth.invalidEmail)
  .bail()
  .isLength({
    min: userValidation.email.minLength,
    max: userValidation.email.maxLength,
  })
  .bail()
  .withMessage(errors.auth.invalidEmail);

module.exports.checkFirstName = check("firstName")
  .trim()
  .isLength({
    min: userValidation.firstName.minLength,
    max: userValidation.firstName.maxLength,
  })
  .withMessage(errors.auth.invalidFirstName);

module.exports.checkLastName = check("lastName")
  .trim()
  .isLength({
    min: userValidation.lastName.minLength,
    max: userValidation.lastName.maxLength,
  })
  .withMessage(errors.auth.invalidLastName);

module.exports.checkReferralCode = check("referralCode")
  .isLength({
    min: userValidation.referralCode.exactLength,
    max: userValidation.referralCode.exactLength,
  })
  .withMessage(errors.user.invalidReferralCode);

module.exports.checkCode = check("code")
  .isLength({
    min: userValidation.verificationCode.exactLength,
    max: userValidation.verificationCode.exactLength,
  })
  .withMessage(errors.auth.invalidCode);

module.exports.checkLanguage = check("lang")
  .trim()
  .notEmpty()
  .withMessage(errors.user.noLanguage)
  .isIn(server.SUPPORTED_LANGUAGES)
  .withMessage(errors.user.unsupportedLanguage);

module.exports.checkRole = (exceptAdmin = false) =>
  exceptAdmin
    ? check("role")
        .trim()
        .isIn(userValidation.roles.filter((role) => role !== "admin"))
        .withMessage(errors.user.invalidRole)
    : check("role")
        .trim()
        .isIn(userValidation.roles)
        .withMessage(errors.user.invalidRole);

module.exports.checkRegisterRole = check("role")
  .trim()
  .isIn(userValidation.registerRoles)
  .withMessage(errors.user.invalidRole);

module.exports.checkPhoneICC = check("phoneICC")
  .isIn(countries.list.map((c) => c.icc))
  .withMessage(errors.auth.invalidICC);

module.exports.checkPhoneNSN = check("phoneNSN")
  .isNumeric()
  .withMessage(errors.auth.invalidPhone)
  .isLength({
    min: countries.minNSN,
    max: countries.maxNSN,
  })
  .withMessage(errors.auth.invalidPhone);

module.exports.conditionalCheck = (key, checker) => (req, res, next) =>
  req.body[key] ? checker(req, res, next) : next();

module.exports.checkFile =
  (key, supportedTypes, compulsory = true) =>
  (req, res, next) => {
    if (!compulsory && (!req.files || !req.files[key])) {
      return next();
    }

    if (compulsory && (!req.files || !req.files[key])) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.noPhoto;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    const fileParts = req.files[key].name.split(".");
    const fileType = fileParts[fileParts.length - 1];
    if (!supportedTypes.includes(fileType)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.invalidExtension;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    next();
  };

module.exports.checkPage = (req, res, next) => {
  try {
    const { page } = req.body;

    // Check if page exist
    if (!page) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.pageNumberRequired;
      throw new ApiError(statusCode, message);
    }

    // Check if page is a numeric value
    const number = parseInt(page);
    const isNumber = Number.isInteger(number);
    if (!isNumber) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.pageNumberRequired;
      throw new ApiError(statusCode, message);
    }

    // Check if page number is positive
    if (number < 1) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.invalidPageNumber;
      throw new ApiError(statusCode, message);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.checkLimit = (req, res, next) => {
  try {
    const { limit } = req.body;

    // Check if limit exist
    if (!limit) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.limitNumberRequired;
      throw new ApiError(statusCode, message);
    }

    // Check if limit is a numeric value
    const number = parseInt(limit);
    const isNumber = Number.isInteger(number);
    if (!isNumber) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.limitNumberRequired;
      throw new ApiError(statusCode, message);
    }

    // Check if limit number is positive
    if (number < 1) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.invalidLimitNumber;
      throw new ApiError(statusCode, message);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.checkUserId = check("userId")
  .isMongoId()
  .withMessage(errors.user.invalidId);

module.exports.checkUserIds = (req, res, next) => {
  try {
    const { userIds } = req.body;

    // Check if `userIds` is valid
    if (!userIds || !Array.isArray(userIds)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.invalidUserIds;
      throw new ApiError(statusCode, message);
    }

    // Filter `userIds` and pick valid MongoDB Document ID
    const filteredArray = userIds.filter((userId) => isValidObjectId(userId));

    // Update `userIds` in the body
    req.body.userIds = filteredArray;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.checkNotificationTitleEN = [
  check("titleEN")
    .isLength({
      min: userValidation.notificationTitle.min,
      max: userValidation.notificationTitle.max,
    })
    .withMessage(errors.user.invalidNotificationTitle),

  checkTextLanguage("titleEN", "en", errors.notification.invalidTitleEN),
];

module.exports.checkNotificationTitleAR = [
  check("titleAR")
    .isLength({
      min: userValidation.notificationTitle.min,
      max: userValidation.notificationTitle.max,
    })
    .withMessage(errors.user.invalidNotificationTitle),

  checkTextLanguage("titleAR", "ar", errors.notification.invalidTitleAR),
];

module.exports.checkNotificationBodyEN = [
  check("bodyEN")
    .isLength({
      min: userValidation.notificationBody.min,
      max: userValidation.notificationBody.max,
    })
    .withMessage(errors.user.invalidNotificationBody),

  checkTextLanguage("bodyEN", "en", errors.notification.invalidBodyEN),
];

module.exports.checkNotificationBodyAR = [
  check("bodyAR")
    .isLength({
      min: userValidation.notificationBody.min,
      max: userValidation.notificationBody.max,
    })
    .withMessage(errors.user.invalidNotificationBody),

  checkTextLanguage("bodyAR", "ar", errors.notification.invalidBodyAR),
];

module.exports.checkSendTo = check("sendTo")
  .isIn(userValidation.receiverTypes)
  .withMessage(errors.user.unsupportedReceiverType);

module.exports.checkForRealName = (key) => (req, res, next) => {
  try {
    // Get the name
    const name = req.body[key];

    // Create the RegEx pattern for real names
    const englishNameRegex = /^[A-Za-z\s]+$/;
    const arabicNameRegex = /^[\u0621-\u064A\s]+$/;

    // Check if name is real
    const isRealName =
      englishNameRegex.test(name) || arabicNameRegex.test(name);
    if (!isRealName) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.unrealName;
      throw new ApiError(statusCode, message);
    }

    next();
  } catch (err) {
    next(err);
  }
};

function checkTextLanguage(key, language, errorMssg) {
  return (req, res, next) => {
    try {
      // Get the text
      const text = req.body[key];

      // Get all detected language from text
      const detections = langdetect.detect(text);

      // Check if the required language is detected
      const isDetected = detections.map((d) => d.lang).includes(language);
      if (!isDetected) {
        const statusCode = httpStatus.BAD_REQUEST;
        const message = errorMssg || errors.system.invalidLanguage;
        throw new ApiError(statusCode, message);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports.checkErrorId = check("errorId")
  .isMongoId()
  .withMessage(errors.serverError.invalidId);

module.exports.checkPlaceId = check("placeId")
  .isMongoId()
  .withMessage(errors.user.invalidPlaceId);

module.exports.checkPlaceTitle = check("title")
  .isLength({
    min: userValidation.savedPlaceTitle.minLength,
    max: userValidation.savedPlaceTitle.maxLength,
  })
  .withMessage(errors.user.invalidPlaceTitle);

module.exports.checkCarType = check("type")
  .isIn(carValidation.carTypes)
  .withMessage(errors.car.invalidCarType);

module.exports.checkLongitude = check("longitude")
  .isFloat({
    min: -180,
    max: 180,
  })
  .withMessage(errors.system.invalidCoordintes);

module.exports.checkLatitude = check("latitude")
  .isFloat({ min: -90, max: 90 })
  .withMessage(errors.system.invalidCoordintes);

//////////////////// RATE LIMIT ////////////////////
module.exports.limitSendEmailVerificationCode = rateLimit({
  // Limit duration in milliseconds
  windowMs: 1000 * 60 * 30, // 30 minutes
  // Number of requests allowed for the above duration
  max: 2, // 2 requests allowed per 30 minutes
  message: {
    status: "error",
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    message: errors.system.exceededVerifyEmailTries,
  },
});

module.exports.limitSendPhoneVerificationCode = rateLimit({
  // Limit duration in milliseconds
  windowMs: 1000 * 60 * 30, // 30 minutes
  // Number of requests allowed for the above duration
  max: 1, // 1 request allowed per 30 minutes
  message: {
    status: "error",
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    message: errors.system.exceededVerifyPhoneTries,
  },
});

module.exports.limitSendAccountDeletionCode = rateLimit({
  // Limit duration in milliseconds
  windowMs: 1000 * 60 * 30, // 30 minutes
  // Number of requests allowed for the above duration
  max: 2, // 2 requests allowed per 30 minutes
  message: {
    status: "error",
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    message: errors.system.exceededAccountDeletionTries,
  },
});

module.exports.limitUpdateEmail = rateLimit({
  // Limit duration in milliseconds
  windowMs: 1000 * 60 * 30, // 30 minutes
  // Number of requests allowed for the above duration
  max: 2, // 2 requests allowed per 30 minutes
  message: {
    status: "error",
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    message: errors.system.exceededUpdateEmailTries,
  },
});

module.exports.limitUpdatePhone = rateLimit({
  // Limit duration in milliseconds
  windowMs: 1000 * 60 * 30, // 30 minutes
  // Number of requests allowed for the above duration
  max: 1, // 1 request allowed per 30 minutes
  message: {
    status: "error",
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    message: errors.system.exceededUpdatePhoneTries,
  },
});

module.exports.limitJoin = rateLimit({
  // Limit duration in milliseconds
  windowMs: 1000 * 60 * 60 * 24, // 1 day
  // Number of requests allowed for the above duration
  max: 10, // 10 requests a day allowed
  message: {
    status: "error",
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    message: errors.system.exceededLoginAttempts,
  },
});
