const { Challenge } = require("../../../models/system/challenge");
const { ChallengeProgress } = require("../../../models/user/challengeProgress");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const { ApiError } = require("../../../middleware/apiError");

module.exports.getAllChallenges = async () => {
  try {
    const challenges = await Challenge.find({}).sort({ _id: -1 });
    if (!challenges || !challenges.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.challenge.noChallengesAdded;
      throw new ApiError(statusCode, message);
    }

    return challenges;
  } catch (err) {
    throw err;
  }
};

module.exports.addChallenge = async (
  tripTarget,
  referralTarget,
  reward,
  role
) => {
  try {
    const existingSameChallenges = await Challenge.countDocuments({
      tripTarget,
      referralTarget,
      role,
    });

    if (existingSameChallenges > 0) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.challenge.sameChallengeAdded;
      throw new ApiError(statusCode, message);
    }

    const challenge = new Challenge({
      tripTarget,
      referralTarget,
      reward,
      role,
    });

    await challenge.save();

    return challenge;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteChallenge = async (challengeId) => {
  try {
    // Delete challenge itself
    const challenge = await Challenge.findByIdAndDelete(challengeId);
    if (!challenge) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.challenge.notFound;
      throw new ApiError(statusCode, message);
    }

    // Delete all progresses for this challenge
    await ChallengeProgress.deleteMany({ challengeId });

    return challenge;
  } catch (err) {
    throw err;
  }
};
