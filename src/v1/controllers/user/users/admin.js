const httpStatus = require("http-status");
const _ = require("lodash");
const { User, clientSchema } = require("../../../models/user/user");
const {
  usersService,
  excelService,
  notificationsService,
} = require("../../../services");

module.exports.findUserByEmailOrPhone = async (req, res, next) => {
  try {
    const { role, emailOrPhone } = req.query;

    // Asking service to find a user by its email or phone
    // with a specific role
    const user = await usersService.findUserByEmailOrPhone(
      emailOrPhone,
      role,
      true
    );

    // Create the response object
    const response = _.pick(user, clientSchema);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.exportUsersToExcel = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });

    // Get the path to the excel file
    const filePath = await excelService.exportUsersToExcelFile(users);

    // Create the response object
    const response = {
      type: "file/xlsx",
      path: filePath,
    };

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.sendNotification = async (req, res, next) => {
  try {
    const { userIds, titleEN, titleAR, bodyEN, bodyAR } = req.body;

    const notification = notificationsService.createNotification(
      titleEN,
      titleAR,
      bodyEN,
      bodyAR
    );

    res.status(httpStatus.OK).json(notification);

    await usersService.sendNotification(userIds, notification);
  } catch (err) {
    next(err);
  }
};

module.exports.updateDriverProfitRate = async (req, res, next) => {
  try {
    const { driverId } = req.params;
    const { profitRate } = req.body;

    const updatedDriver = await usersService.updateDriverProfitRate(
      driverId,
      profitRate
    );

    const response = _.pick(updatedDriver, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
