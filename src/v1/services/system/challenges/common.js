const { ChallengeProgress } = require("../../../models/user/challengeProgress");

module.exports.getMyChallengesProgress = async (userId) => {
  try {
    return await ChallengeProgress.find({ userId }).sort({ challengeId: -1 });
  } catch (err) {
    throw err;
  }
};
