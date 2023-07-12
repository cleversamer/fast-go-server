const { code, balance, count } = require("../../models/system/paymentCard");

module.exports = Object.freeze({
  invalidId: {
    en: "Invalid payment card ID",
    ar: "معرّف بطاقة الدفع غير صالح",
  },
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
  invalidBalance: {
    en: `Balance must be between ${balance.min}-${balance.max} LYD`,
    ar: `رصيد البطاقة يجب أن يكون بين ${balance.min}-${balance.max} دينار ليبي`,
  },
  alreadyAdded: {
    en: "Payment card with the same code has been already added",
    ar: "تم إضافة بطاقة بنفس الكود مسبقًا",
  },
  noPaymentCards: {
    en: "There are no payment cards added yet",
    ar: "لا يوجد هناك بطاقات دفع مُضافة بعد",
  },
  invalidCardsCount: {
    en: `You can't add more that ${count.max} payment cards at a time`,
    ar: `لا يمكنك إضافة أكثر من ${count.max} بطاقة دفع في المرة الواحدة`,
  },
});
