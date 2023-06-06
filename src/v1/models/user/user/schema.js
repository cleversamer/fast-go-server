const { Schema } = require("mongoose");
const { user: config } = require("../../../config/models");
const countriesData = require("../../../data/countries");

module.exports.client = [
  "_id",
  "authType",
  "avatarURL",
  "firstName",
  "lastName",
  "email",
  "phone",
  "role",
  "gender",
  "savedPlaces",
  "display",
  "verified",
  "notifications",
  "balance",
  "referral",
  "trips",
  "lastLogin",
];

module.exports.mongodb = new Schema(
  {
    // User's first authentication type
    authType: {
      type: String,
      required: true,
      trim: true,
      enum: config.authTypes,
      default: config.authTypes[0],
    },
    // User's avatar URL
    avatarURL: {
      type: String,
      default: "",
    },
    // User's full name
    firstName: {
      type: String,
      trim: true,
      required: true,
      // !!DO NOT provide `minlength` and `maxlength` to this field!
      //
      // Because when a user registers with a Google account or
      // another account, their name will be taken from that account
      // and it may not apply to the provided limitations, and this
      // will end up with a failed registration proccess.
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      // !!DO NOT provide `minlength` and `maxlength` to this field!
      //
      // Because when a user registers with a Google account or
      // another account, their name will be taken from that account
      // and it may not apply to the provided limitations, and this
      // will end up with a failed registration proccess.
    },
    // The email of the user
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    // The phone of the user
    phone: {
      // The full phone number (icc + nsn)
      full: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: countriesData.minPhone,
        maxlength: countriesData.maxPhone,
      },
      // The icc of user's phone
      icc: {
        type: String,
        required: true,
        trim: true,
        enum: countriesData.countries.map((c) => c.icc),
        minlength: countriesData.minICC,
        maxlength: countriesData.maxICC,
      },
      // The nsn of user's phone
      nsn: {
        type: String,
        required: true,
        trim: true,
        minlength: countriesData.minNSN,
        maxlength: countriesData.maxNSN,
      },
    },
    // The role of the user
    role: {
      type: String,
      required: true,
      trim: true,
      enum: config.roles,
    },
    // User's gender
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: config.genders,
    },
    // User's saved places
    savedPlaces: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: config.savedPlaceTitle.minLength,
          maxlength: config.savedPlaceTitle.maxLength,
        },
        type: {
          type: String,
          required: true,
          trim: true,
          enum: config.savedPlaceTypes,
        },
        latitude: {
          type: Number,
          required: true,
          min: -90,
          max: 90,
        },
        longitude: {
          type: Number,
          required: true,
          min: -180,
          max: 180,
        },
      },
    ],
    // User's display settings
    display: {
      // User's display language
      language: {
        type: String,
        required: true,
        trim: true,
        enum: config.languages,
        default: config.languages[0],
      },
    },
    // The email and phone verification status of the user
    verified: {
      email: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
      driver: {
        type: Boolean,
        default: false,
      },
    },
    // The notifications of the user
    notifications: {
      active: {
        type: Boolean,
        required: true,
        default: true,
      },
      list: {
        type: Array,
        default: [],
        minLength: 0,
        maxLength: config.maxNotificationsCount,
      },
    },
    // User's balance
    balance: {
      type: Number,
      default: 0,
    },
    // User's referral code
    referral: {
      number: {
        type: Number,
        default: 0,
      },
      code: {
        type: String,
        required: true,
        trim: true,
        minlength: config.referralCode.exactLength,
        maxlength: config.referralCode.exactLength,
      },
    },
    // User's trips
    trips: {
      asPassenger: {
        type: Number,
        default: 0,
      },
      asDriver: {
        type: Number,
        default: 0,
      },
    },
    // The device token of the user (Used for sending notifications to it)
    deviceToken: {
      type: String,
      required: true,
      trim: true,
      minlength: config.deviceToken.minLength,
      maxlength: config.deviceToken.maxLength,
    },
    // The last login date of the user
    lastLogin: {
      type: Date,
      default: new Date(),
    },
    // Shows if account is deleted or not
    deleted: {
      type: Boolean,
      default: false,
    },
    // The number of requests the user has made
    noOfRequests: {
      type: Number,
      default: 0,
    },
    // The email, phone verification codes
    verification: {
      email: {
        code: {
          type: String,
          trim: true,
          default: "",
        },
        expiryDate: {
          type: Date,
          default: new Date(),
        },
      },
      phone: {
        code: {
          type: String,
          trim: true,
          default: "",
        },
        expiryDate: {
          type: Date,
          default: new Date(),
        },
      },
      deletion: {
        code: {
          type: String,
          trim: true,
          default: "",
        },
        expiryDate: {
          type: Date,
          default: new Date(),
        },
      },
    },
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
    // To automatically write creation/update timestamps
    // Note: the update timestamp will be updated automatically
    timestamps: true,
  }
);
