const {
  usersService,
  scheduleService,
  challengesService,
} = require("../services");

module.exports = () => {
  try {
    scheduleService.scheduleDailyEvent(async () => {
      try {
        await usersService.notifyUsersWithUnseenNotifications();
      } catch (err) {}
    });

    scheduleService.scheduleHourlyEvent(async () => {
      try {
        await usersService.notifyAdminsWithServerErrors();
      } catch (err) {}
    });

    scheduleService.scheduleFridayEvent(async () => {
      try {
        await challengesService.resetChallengeProgresses();
      } catch (err) {}
    });
  } catch (err) {}
};
