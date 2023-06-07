module.exports = {
  firstName: { minLength: 3, maxLength: 32 },
  lastName: { minLength: 3, maxLength: 32 },
  email: { minLength: 5, maxLength: 256 },
  phone: {
    nsn: { minLength: 4, maxLength: 13 },
  },
  deviceToken: { minLength: 0, maxLength: 1024, default: "" },
  // Referral code must be an even number
  referralCode: { exactLength: 14 },
  rewardAmountForReferral: 2,
  // First role in this array === default role
  roles: ["passenger", "driver", "admin"],
  registerRoles: ["passenger", "driver"],
  verificationCode: { exactLength: 6 },
  receiverTypes: ["email", "phone"],
  maxNotificationsCount: 30,
  // First value is the default value
  languages: ["ar", "en"],
  genders: ["male", "female"],
  savedPlaceTypes: [
    "main",
    "work",
    "club",
    "cafe",
    "park",
    "family-house",
    "partners",
    "other",
  ],
  savedPlaceTitle: { minLength: 6, maxLength: 128 },
  notificationTitle: { min: 3, max: 128 },
  notificationBody: { min: 3, max: 265 },
  maxRequestsCountForInactiveUsers: 5,
  profitRate: { min: 0, max: 1, default: 0.15 },
};
