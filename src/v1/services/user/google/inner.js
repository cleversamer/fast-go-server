const admin = require("firebase-admin");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const serviceAccount = require("../../../config/system/service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.admin = admin;

module.exports.decodeToken = async (token) => {
  try {
    // Decode Google access token given by user
    const decodeValue = await admin.auth().verifyIdToken(token);

    // Check if Google access token is valid
    if (!decodeValue) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.googleAuthError;
      throw new ApiError(statusCode, message);
    }

    return decodeValue;
  } catch (err) {
    throw err;
  }
};
