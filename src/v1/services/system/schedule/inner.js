const cron = require("node-cron");

const defualtCallback = () => {};

module.exports.scheduleDailyEvent = (callback = defualtCallback) => {
  try {
    const durationInMs = 1000 * 60 * 60 * 24; // 1 Day
    setInterval(callback, durationInMs);
  } catch (err) {
    throw err;
  }
};

module.exports.scheduleHourlyEvent = (callback = defualtCallback) => {
  try {
    const durationInMs = 1000 * 60 * 60; // 1 Hour
    setInterval(callback, durationInMs);
  } catch (err) {
    throw err;
  }
};

module.exports.scheduleFridayEvent = (callback = defualtCallback) => {
  try {
    // Define the cron pattern for every Friday at 12 AM
    const schedulePattern = "0 0 * * 5"; // '0 0 * * 5' means every Friday at 12 AM

    // Schedule the function to run based on the defined pattern
    cron.schedule(schedulePattern, callback);
  } catch (err) {
    throw err;
  }
};
