const { clientSchema } = require("../../../models/user/challengeProgress");
const { challengesService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.getMyChallengesProgress = async (req, res, next) => {
  try {
    const user = req.user;

    const challenges = await challengesService.getMyChallengesProgress(
      user._id
    );

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
