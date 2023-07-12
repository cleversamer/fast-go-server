const { User } = require("../../../models/user/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { user: userConfig } = require("../../../config/models");
const { getIO } = require("../../../setup/socket");

module.exports.findAdmins = async () => {
  try {
    return await User.find({ role: "admin", deleted: false });
  } catch (err) {
    throw err;
  }
};

module.exports.validateToken = (token) => {
  try {
    return jwt.verify(token, process.env["JWT_PRIVATE_KEY"]);
  } catch (err) {
    throw err;
  }
};

module.exports.genUniqueReferralCode = async () => {
  try {
    let referralCode;

    while (true) {
      const randomBytes = Math.floor(userConfig.referralCode.exactLength / 2);
      referralCode = crypto.randomBytes(randomBytes).toString("hex");
      const existingUser = await User.findOne({
        "referral.code": referralCode,
      });

      if (!existingUser) {
        return referralCode;
      }
    }
  } catch (err) {
    throw err;
  }
};

module.exports.applyReferralCode = async (newUser, referralCode) => {
  try {
    if (!referralCode) {
      return null;
    }

    // Find the user that has the referral code
    const referralCodeOwner = await User.findOne({
      "referral.code": referralCode,
    });
    if (!referralCodeOwner) {
      return null;
    }

    if (newUser._id.toString() === referralCodeOwner._id.toString()) {
      return null;
    }

    // Add referral to the user
    referralCodeOwner.addReferral();

    // Save user to the DB
    await referralCodeOwner.save();

    return referralCodeOwner;
  } catch (err) {
    throw err;
  }
};

module.exports.joinSocketToUserRoom = (socketId, userId) => {
  try {
    if (!socketId || !userId) {
      return false;
    }

    // Check if socket id connected
    const userSocket = getIO().sockets.sockets.get(socketId);

    // Connect socket to
    if (userSocket) {
      userSocket?.join?.(userId.toString());
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
};
