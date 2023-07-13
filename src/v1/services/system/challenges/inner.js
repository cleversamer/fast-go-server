const { Challenge } = require("../../../models/system/challenge");
const { ChallengeProgress } = require("../../../models/user/challengeProgress");
const { User } = require("../../../models/user/user");
const { user: userNotifications } = require("../../../config/notifications");
const usersService = require("../../user/users");

module.exports.addChallengeProgressToUsers = async (challenge) => {
  try {
    const targetUserIds = await User.find({ role: challenge.role }, { _id: 1 });

    targetUserIds.forEach(async (userId) => {
      try {
        const challengeProgress = new ChallengeProgress({
          userId,
          challengeId: challenge._id,
          referralTarget: challenge.referralTarget,
          tripTarget: challenge.tripTarget,
          reward: challenge.reward,
        });

        await challengeProgress.save();
      } catch (err) {}
    });
  } catch (err) {
    throw err;
  }
};

module.exports.addChallengesProgressToUser = async (user) => {
  try {
    const challenges = await Challenge.find({ role: user.role });
    challenges.forEach(async (challenge) => {
      try {
        const challengeProgress = new ChallengeProgress({
          userId: user._id,
          challengeId: challenge._id,
          referralTarget: challenge.referralTarget,
          tripTarget: challenge.tripTarget,
          reward: challenge.reward,
        });

        await challengeProgress.save();
      } catch (err) {}
    });
  } catch (err) {
    throw err;
  }
};

module.exports.addReferralProgressPointToUser = async (user) => {
  try {
    // Get user's challenges progress
    const challenges = await ChallengeProgress.find({ userId: user._id });

    // Check every single challenge
    challenges.forEach(async (challenge) => {
      try {
        // Add referral point to challenge
        challenge.addReferralPoint();

        // Check if challenge progress is complete
        if (challenge.isComplete()) {
          // Reset challenge's progress
          challenge.resetProgress();
          await challenge.save();

          // Notify user of challenge progress completion
          const notification = userNotifications.completedChallenge();
          await usersService.sendNotificationToUser(user, notification);
        } else {
          // Just save the challenge to the DB
          await challenge.save();
        }
      } catch (err) {}
    });
  } catch (err) {
    throw err;
  }
};

module.exports.addTripProgressPointToUser = async (user) => {
  try {
    // Get user's challenges progress
    const challenges = await ChallengeProgress.find({ userId: user._id });

    // Check every single challenge
    challenges.forEach(async (challenge) => {
      try {
        // Add referral point to challenge
        challenge.addTripPoint();

        // Check if challenge progress is complete
        if (challenge.isComplete()) {
          // Reset challenge's progress
          challenge.resetProgress();
          await challenge.save();

          // Notify user of challenge progress completion
          const notification = userNotifications.completedChallenge();
          await usersService.sendNotificationToUser(user, notification);
        } else {
          // Just save the challenge to the DB
          await challenge.save();
        }
      } catch (err) {}
    });
  } catch (err) {
    throw err;
  }
};

module.exports.resetChallengeProgresses = async () => {
  try {
    await ChallengeProgress.updateMany(
      {},
      {
        $set: {
          referralsProgress: 0,
          tripsProgress: 0,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};
