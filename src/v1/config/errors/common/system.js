const { MAX_FILE_UPLOAD_SIZE } = require("../../system/server");

module.exports = Object.freeze({
  internal: {
    en: "An unexpected error happened on the server",
    ar: "حصل خطأ غير متوقع في الخادم",
  },
  unsupportedRoute: {
    en: "The link is not supported",
    ar: "الرابط غير مدعوم",
  },
  noPhoto: {
    en: "Please add a photo",
    ar: "يجب عليك إضافة صورة",
  },
  invalidFile: {
    en: "Invalid file",
    ar: "الملف غير صالح",
  },
  fileUploadError: {
    en: "Error uploading file",
    ar: "حصل خطأ عند رفع الملف",
  },
  invalidUrl: {
    en: "Please add a valid URL",
    ar: "الرجاء إضافة عنوان URL صالح",
  },
  invalidExtension: {
    en: "The file extension is not supported",
    ar: " امتداد الملف غير مدعوم",
  },
  invalidMongoId: {
    en: "Invalid ID",
    ar: "كود التعريف غير صالح",
  },
  noMongoId: {
    en: "You should add the ID",
    ar: "يجب عليك إضافة المعرّف",
  },
  largeFile: {
    en: `Maximum file upload size is ${MAX_FILE_UPLOAD_SIZE.toLocaleString()}MB`,
    ar: `الحد الأقصى لحجم ملف الرفع هو ${MAX_FILE_UPLOAD_SIZE.toLocaleString()} ميغا بايت`,
  },
  tempBlocked: {
    en: "Your device has been temporarily blocked",
    ar: "تم حظر جهازك مؤقتًا",
  },
  exceededVerifyEmailTries: {
    en: "You exceeded the maximum number of tries",
    ar: "لقد تجاوزت الحد الأقصى لعدد المحاولات",
  },
  exceededVerifyPhoneTries: {
    en: "You exceeded the maximum number of tries",
    ar: "لقد تجاوزت الحد الأقصى لعدد المحاولات",
  },
  exceededAccountDeletionTries: {
    en: "You exceeded the maximum number of tries",
    ar: "لقد تجاوزت الحد الأقصى لعدد المحاولات",
  },
  exceededUpdateEmailTries: {
    en: "You exceeded the maximum number of tries",
    ar: "لقد تجاوزت الحد الأقصى لعدد المحاولات",
  },
  exceededUpdatePhoneTries: {
    en: "You exceeded the maximum number of tries",
    ar: "لقد تجاوزت الحد الأقصى لعدد المحاولات",
  },
  exceededLoginAttempts: {
    en: "You exceeded the maximum number of login attempts, please try again later",
    ar: "لقد تجاوزت الحد الأقصى لعدد محاولات تسجيل الدخول، يرجى المحاولة مرة أخرى في وقت لاحق",
  },
  exceededRegisterAttempts: {
    en: "You exceeded the maximum number of account registration attempts, please try again later",
    ar: "لقد تجاوزت الحد الأقصى لعدد محاولات تسجيل الحساب، يرجى المحاولة مرة أخرى في وقت لاحق",
  },
  notification: {
    en: "Error sending notification",
    ar: "حصل خطأ عند إرسال الإشعار",
  },
  emailError: {
    en: "Error sending email",
    ar: "حصل خطأ عند إرسال البريد الإلكتروني",
  },
  smsError: {
    en: "Error sending SMS message",
    ar: "حصل خطأ عند إرسال رسالة SMS",
  },
  pageNumberRequired: {
    en: "Page number is required",
    ar: "رقم الصفحة مطلوب",
  },
  invalidPageNumber: {
    en: "Page number must be a positive number",
    ar: "يجب أن يكون رقم الصفحة رقمًا موجبًا",
  },
  limitNumberRequired: {
    en: "Limit count is required",
    ar: "عدد التحديد مطلوب",
  },
  invalidLimitNumber: {
    en: "Limit number must be a positive number",
    ar: "يجب أن يكون عدد التحديد عددًا موجبًا",
  },
  errorExportingExcel: {
    en: "Error exporting excel file",
    ar: "حدث خطأ عند تصدير ملف الاكسل",
  },
  invalidLanguage: {
    en: "Language doesn't match the required language",
    ar: "اللغة لا تتطابق مع اللغة المطلوبة",
  },
  invalidCoordintes: {
    en: "Invalid coordinates",
    ar: "الإحداثيات غير صالحة",
  },
});
