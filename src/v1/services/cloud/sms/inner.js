const admin = require("firebase-admin");
const serviceAccount = require("../../../config/system/service-account.json");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const { ApiError } = require("../../../middleware/apiError");

admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
  },
  "smsApp"
);

module.exports.sendSMS = async (title, body, regToken) => {
  try {
    const phoneNumber = "+1234567890"; // Phone number to which the SMS will be sent

    const message = {
      phoneNumber: phoneNumber,
      message: "This is a test SMS message from Firebase.",
    };

    admin
      .messaging()
      .app(phoneNumber)
      .then((verificationCode) => {
        console.log(
          "SMS verification code sent successfully:",
          verificationCode
        );
        // Process the verification code or any additional logic
      })
      .catch((error) => {
        console.error("Error sending SMS verification code:", error);
        // Handle the error appropriately
      });
  } catch (err) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const message = errors.system.smsError;
    throw new ApiError(statusCode, message);
  }
};
