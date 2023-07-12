module.exports = Object.freeze({
  user: {
    "read:own": ["*"],
    "update:own": ["*"],
    "delete:own": ["*"],
  },
  emailVerificationCode: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  phoneVerificationCode: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  notification: {
    "read:own": ["*"],
    "update:own": ["*"],
    "delete:own": ["*"],
  },
  review: {
    "create:own": ["*"],
    "read:own": ["*"],
    "update:own": ["*"],
  },
  savedPlace: {
    "create:own": ["*"],
    "read:own": ["*"],
    "update:own": ["*"],
    "delete:own": ["*"],
  },
  trip: {
    "read:own": ["*"],
    "create:own": ["*"],
  },
  challenge: {
    "read:own": ["*"],
  },
});
