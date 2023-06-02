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
  // First auth type in this array === default auth type
  authTypes: ["email", "google", "facebook", "apple"],
  verificationCode: { exactLength: 6 },
  receiverTypes: ["email", "phone"],
  maxNotificationsCount: 30,
  // First value is the default value
  languages: ["en", "ar"],
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
  notificationTitle: { min: 3, max: 128 },
  notificationBody: { min: 3, max: 265 },
  maxRequestsCountForInactiveUsers: 5,
};
