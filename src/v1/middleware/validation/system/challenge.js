const commonMiddleware = require("../common");

module.exports.validateAddChallenge = [
  commonMiddleware.checkChallengeReward,
  commonMiddleware.checkChallengeReferralTarget,
  commonMiddleware.checkChallengeTripTarget,
  commonMiddleware.checkRole(true),
  commonMiddleware.next,
];

module.exports.validateDeleteChallenge = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkChallengeId,
  commonMiddleware.next,
];
