const { model } = require("mongoose");
const schema = require("./schema");
const setupMethods = require("./setupMethods");

setupMethods(schema.mongodb);

const CouponCode = model("CouponCode", schema.mongodb);

module.exports = {
  CouponCode,
  clientSchema: schema.client,
};
