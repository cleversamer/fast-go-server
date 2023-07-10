const { code, discountPercentage } = require("../../models/system/couponCode");

module.exports = Object.freeze({
  noCouponCodes: {
    en: "There are no coupon codes",
    ar: "لا يوجد اكواد خصم",
  },
  notFound: {
    en: "Coupon code was not found",
    ar: "كود الخصم غير موجود",
  },
  invalidCode: {
    en: `Coupon code must be between ${code.minLength}-${code.maxLength} characters`,
    ar: `كود الخصم يجب أن تكون بين ${code.minLength}-${code.maxLength} حرفًا`,
  },
  invalidDiscountPercentage: {
    en: `Discount percentage must be between ${discountPercentage.min}-${discountPercentage.max}`,
    ar: `نسبة الخصم يجب أن تكون بين ${discountPercentage.min}-${discountPercentage.max}`,
  },
  alreadyAdded: {
    en: "Coupon code has been already added",
    ar: "تم إضافة كود الخصم مسبقًا",
  },
});
