const Excel = require("exceljs");
const localStorage = require("../local");
const cloudStorage = require("../../cloud/storage");
const { APP_NAME_EN } = require("../../../config/system/server");
const utils = require("../../../utils");

module.exports.exportUsersToExcelFile = async (users = []) => {
  let filePath = "";

  try {
    // Create a new Excel Workbook
    const workbook = new Excel.Workbook();

    // Add new sheet to the Workbook
    const worksheet = workbook.addWorksheet(`${APP_NAME_EN} Accounts`);

    // Specify excel sheet's columns
    worksheet.addRow([
      "الإسم الكامل",
      "البريد الإلكتروني",
      "رقم الهاتف",
      "نوع الحساب",
      "الرصيد",
      "البريد مفعّل",
      "رقم الهاتف مفعّل",
      "عدد الإشعارات",
      "عدد الإشعارات المقروءة",
      "عدد الإشعارات الغير مقروءة",
      "مسجّل بواسطة",
      "اللغة المفضّلة",
      "وضع العرض",
      "عدد النشاطات داخل التطبيق",
      "رمز الإحالة",
      "عدد الإحالات",
      "رابط Instagram",
      "رابط Twitter",
      "رابط LinkedIn",
      "رابط Facebook",
      "رابط Youtube",
      "رابط Website",
      "رابط Other",
      "آخر دخول",
      "الحساب محذوف",
      "رابط الصورة الشخصيّة",
    ]);

    // Add row for each user in the Database
    users.forEach((user) => {
      const seenNotifications = user
        .getNotifications()
        .filter((n) => n.seen).length;
      const unseenNotifications =
        user.getNotifications().length - seenNotifications;

      worksheet.addRow([
        user.getName(),
        user.getEmail(),
        user.getPhone(),
        user.getRole() === "user" ? "مستخدم" : "آدمن",
        user.getBalance(),
        user.isEmailVerified() ? "نعم" : "لا",
        user.isPhoneVerified() ? "نعم" : "لا",
        user.getNotifications().length,
        seenNotifications,
        unseenNotifications,
        user.getAuthType() === "email" ? "البريد الإلكتروني" : "حساب جوجل",
        user.getLanguage() === "en" ? "الإنجليزية" : "العربية",
        user.getDisplayMode(),
        user.getNoOfRequests(),
        user.getReferralCode(),
        user.getNoOfReferrals(),
        user.getLink("instagram") || "لا يوجد",
        user.getLink("twitter") || "لا يوجد",
        user.getLink("linkedin") || "لا يوجد",
        user.getLink("facebook") || "لا يوجد",
        user.getLink("youtube") || "لا يوجد",
        user.getLink("website") || "لا يوجد",
        user.getLink("other") || "لا يوجد",
        user.getLastLogin().toLocaleString(),
        user.isDeleted() ? "نعم" : "لا",
        user.getAvatarURL() || "لا يوجد",
      ]);
    }, "i");

    // Decide excel's file
    const fileName =
      utils.filterName(
        `${APP_NAME_EN.toLowerCase()}_users_${getCurrentDate()}`
      ) + ".xlsx";
    filePath = `/${fileName}`;

    // Generate and save excel file
    await workbook.xlsx.writeFile(`./uploads/${fileName}`);

    // Upload excel file to storage bucket
    const cloudFile = await cloudStorage.uploadFile({
      name: fileName,
      path: filePath,
    });

    // Return file's path
    return cloudFile;
  } catch (err) {
    throw err;
  } finally {
    // Delete local excel file
    if (filePath) {
      await localStorage.deleteFile(filePath);
    }
  }
};

module.exports.exportErrorsToExcelFile = async (errors = []) => {
  let filePath = "";

  try {
    // Create a new Excel Workbook
    const workbook = new Excel.Workbook();

    // Add new sheet to the Workbook
    const worksheet = workbook.addWorksheet(`${APP_NAME_EN} Errors`);

    // Specify excel sheet's columns
    worksheet.addRow([
      "Request URL",
      "Name",
      "Message",
      "Stack Trace",
      "Occurs",
      "Date",
    ]);

    // Add row for each user in the Database
    errors.forEach((error) => {
      const date = `${error.date.toDateString()} ${error.date.toLocaleTimeString()}`;

      worksheet.addRow([
        error.requestURL,
        error.name,
        error.message,
        error.stackTrace,
        error.occurs,
        date,
      ]);
    }, "i");

    // Decide excel's file
    const fileName =
      filterName(`${APP_NAME_EN.toLowerCase()}_errors_${getCurrentDate()}`) +
      ".xlsx";
    filePath = `/${fileName}`;

    // Generate and save excel file
    await workbook.xlsx.writeFile(`./uploads/${fileName}`);

    // Upload excel file to storage bucket
    const cloudFile = await cloudStorage.uploadFile({
      name: fileName,
      path: filePath,
    });

    // Return file's path
    return cloudFile;
  } catch (err) {
    throw err;
  } finally {
    // Delete local excel file
    if (filePath) {
      await localStorage.deleteFile(filePath);
    }
  }
};
