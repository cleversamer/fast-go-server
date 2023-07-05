const {
  notificationTitle,
  notificationBody,
  referralCode,
  savedPlaceTitle,
  profitRate,
} = require("../../models/user/user");

module.exports = Object.freeze({
  invalidId: {
    en: "Invalid user ID",
    ar: "معرّف المستخدم غير صالح",
  },
  invalidDriverId: {
    en: "Invalid driver ID",
    ar: "معرّف السائق غير صالح",
  },
  noUsers: {
    en: "User were not found",
    ar: "لم يتم العثور على المستخدمين",
  },
  userNotFound: {
    en: "User was not found",
    ar: "لم يتم العثور على المستخدم",
  },
  driverNotFound: {
    en: "Driver was not found",
    ar: "لم يتم العثور على السائق",
  },
  emailAlreadyVerified: {
    en: "Your email has already been verified",
    ar: "تم التحقق من بريدك الإلكتروني مسبقًا",
  },
  phoneAlreadyVerified: {
    en: "Your phone number has already been verified",
    ar: "تم التحقق من رقم هاتفك مسبقًا",
  },
  invalidRole: {
    en: "Invalid user role",
    ar: "الصلاحيّة المختارة غير صالحة",
  },
  alreadyVerified: {
    en: "User's email and phone number are already verified",
    ar: "تم التحقق من رقم هاتف وبريد المستخدم مسبقًا",
  },
  unsupportedLanguage: {
    en: "Language is not supported",
    ar: "اللغة غير مدعومة",
  },
  unsupportedReceiverType: {
    en: "Receiver is not supported, we can send the code to your email or phone number",
    ar: "مكان الاستقبال غير مدعوم، يمكننا إرسال الرمز إلى بريدك الإلكتروني أو رقم هاتفك",
  },
  notUpdated: {
    en: "There's no new data to update",
    ar: "لا يوجد بيانات جديدة للتحديث",
  },
  notificationsSeen: {
    en: "There are no new notifications",
    ar: "لا يوجد هناك إشعارات جديدة",
  },
  noNotifications: {
    en: "You have no notifications",
    ar: "ليس لديك إشعارات",
  },
  updateAdminRole: {
    en: "You can't modify admin's role",
    ar: "لا يمكنك تعديل صلاحيّة الآدمن",
  },
  errorSendingNotification: {
    en: "Error sending notification",
    ar: "حصل خطأ عند إرسال الإشعار",
  },
  invalidUserIds: {
    en: "User IDs must be a list",
    ar: "معرّفات المستخدمين يجب أن تكون قائمة",
  },
  invalidNotificationTitle: {
    en: `Notification's title must be ${notificationTitle.min.toLocaleString()}-${notificationTitle.max.toLocaleString()} letters`,
    ar: `عنوان الإشعار يجب أن يكون بين ${notificationTitle.min.toLocaleString()}-${notificationTitle.max.toLocaleString()} حرفًا`,
  },
  invalidNotificationBody: {
    en: `Notification's body must be ${notificationBody.min.toLocaleString()}-${notificationBody.max.toLocaleString()} letters`,
    ar: `محتوى الإشعار يجب أن يكون بين ${notificationBody.min.toLocaleString()}-${notificationBody.max.toLocaleString()} حرفًا`,
  },
  errorDeletingAccount: {
    en: "Error deleting account",
    ar: "حصل خطأ عند حذف الحساب",
  },
  noAvatar: {
    en: "You haven't added an avatar picture",
    ar: "لم تقم بإضافة صورة شخصيّة",
  },
  unrealName: {
    en: "We require everyone to use the name they use in everyday life",
    ar: "نطلب من الجميع استخدام الإسم الذي يستخدمونه في الحياة اليوميّة",
  },
  newEmailMatchesPrev: {
    en: "The new email matches the previous email",
    ar: "البريد الإلكتروني الجديد يطابق البريد الإلكتروني السابق",
  },
  invalidReferralCode: {
    en: `Referral code must be ${referralCode.exactLength.toLocaleString()} characters`,
    ar: `رمز الإحالة يجب أن يكون ${referralCode.exactLength.toLocaleString()} حرفًا`,
  },
  noSavedPlaces: {
    en: "You don't have saved places yet",
    ar: "ليس لديك أماكن محفوظة",
  },
  placeNotFound: {
    en: "Your saved place was not found",
    ar: "لم نتكمن من العثور على عنوانك",
  },
  placeNotUpdated: {
    en: "An error occurred while updating your saved place",
    ar: "حصل خطأ أثناء تحديث عنوانك",
  },
  invalidPlaceTitle: {
    en: `Place's title must be ${savedPlaceTitle.minLength.toLocaleString()}-${savedPlaceTitle.maxLength.toLocaleString()} letters`,
    ar: `عنوان المكان يجب أن يكون بين ${savedPlaceTitle.minLength.toLocaleString()}-${savedPlaceTitle.maxLength.toLocaleString()} حرفًا`,
  },
  invalidPlaceType: {
    en: "Invalid place type",
    ar: "نوع المكان غير صالح",
  },
  invalidPlaceId: {
    en: "Invalid place ID",
    ar: "معرّف المكان غير صالح",
  },
  addedCarBefore: {
    en: "You have already added a car",
    ar: "لقد قمت بإضافة سيّارة مسبقًا",
  },
  invalidGender: {
    en: "Selected gender is invalid",
    ar: "الجنس الذي اخترته غير صالح",
  },
  invalidProfitRate: {
    en: `Driver's profit rate must be between ${profitRate.min} and ${profitRate.max}`,
    ar: `نسبة أرباح السائق يجب أن تتراوح بين ${profitRate.min} و ${profitRate.max}`,
  },
  invalidDriverStatus: {
    en: "Invalid driver status",
    ar: "الفلتر الذي اخترته غير صالح",
  },
});
