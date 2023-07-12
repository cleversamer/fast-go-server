const { clientSchema } = require("../../../models/system/challenge");
const { challengesService, usersService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");
const { user: userNotifications } = require("../../../config/notifications");

module.exports.getAllChallenges = async (req, res, next) => {
  try {
    const challenges = await challengesService.getAllChallenges();

    const response = {
      challenges: challenges.map((challenge) =>
        _.pick(challenge, clientSchema)
      ),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.addChallenge = async (req, res, next) => {
  try {
    const { tripTarget, referralTarget, reward, role } = req.body;

    // Create the challenge
    const challenge = await challengesService.addChallenge(
      tripTarget,
      referralTarget,
      reward,
      role
    );

    // Create the response object
    const response = _.pick(challenge, clientSchema);

    // Send created challenge back to the client
    res.status(httpStatus.OK).json(response);

    // Add challenge progress to all users
    await challengesService.addChallengeProgressToUsers(challenge);

    // Notify all users with the new challenge
    const notification = userNotifications.newChallengeAdded();
    await usersService.sendNotificationToUsers([], notification);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.params;

    const challenge = await challengesService.deleteChallenge(challengeId);

    const response = _.pick(challenge, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
