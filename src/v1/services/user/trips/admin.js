const { Trip } = require("../../../models/user/trip");

module.exports.getTripsStats = async () => {
  try {
    const allTripsNo = await Trip.countDocuments({});

    return {
      allTripsNo,
    };
  } catch (err) {
    throw err;
  }
};
