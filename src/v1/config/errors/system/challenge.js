const {
  referralTarget,
  reward,
  tripTarget,
} = require("../../models/system/challenge");

module.exports = Object.freeze({
  invalidId: {
    en: "Invalid challenge ID",
    ar: "معرّف التحدي غير صالح",
  },
  notFound: {
    en: "Challenge was not found",
    ar: "التحدي غير موجود",
  },
  noChallengesAdded: {
    en: "There are no challenges added yet",
    ar: "لا يوجد تحديات مُضافة بعد",
  },
  invalidReferralTarget: {
    en: `Referral target must be between ${referralTarget.min.toLocaleString()}-${referralTarget.max.toLocaleString()}`,
    ar: `عدد الإحالات يجب أن يكون بين ${referralTarget.min.toLocaleString()}-${referralTarget.max.toLocaleString()}`,
  },
  invalidTripTarget: {
    en: `Trip target must be between ${tripTarget.min.toLocaleString()}-${tripTarget.max.toLocaleString()}`,
    ar: `عدد الرحلات يجب أن يكون بين ${tripTarget.min.toLocaleString()}-${tripTarget.max.toLocaleString()}`,
  },
  invalidReward: {
    en: `Reward amount must be between ${reward.min.toLocaleString()}-${reward.max.toLocaleString()} LYD`,
    ar: `مبلغ المكافأة يجب أن يكون بين ${reward.min.toLocaleString()}-${reward.max.toLocaleString()} دينار ليبي`,
  },
  sameChallengeAdded: {
    en: "Similar challenge has already been added",
    ar: "تم إضافة تحدي مشابه لهذا مسبقًا",
  },
});
