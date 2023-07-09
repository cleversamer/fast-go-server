const { usersService, scheduleService } = require("../services");

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
  } catch (err) {}
};
