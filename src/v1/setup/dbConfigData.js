const { tripPricingsService } = require("../services");

module.exports = async () => {
  try {
    await tripPricingsService.ensureTripPricings();
  } catch (err) {}
};
