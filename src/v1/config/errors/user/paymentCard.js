const { code } = require("../../models/user/paymentCard");

module.exports = Object.freeze({
  notFound: {
    en: "Payment card was not found",
    ar: "بطاقة الدفع غير موجودة",
  },
  alreadyCharged: {
    en: "Payment card has been already charged",
    ar: "تم شحن بطاقة الدفع مسبقًا",
  },
  invalidCode: {
    en: `Card code must be ${code.exactLength} characters`,
    ar: `كود البطاقة يجب أن يكون ${code.exactLength} حرفًا`,
  },
});
