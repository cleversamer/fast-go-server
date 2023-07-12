const { model } = require("mongoose");
const schema = require("./schema");
const setupMethods = require("./setupMethods");

setupMethods(schema.mongodb);

const PaymentCard = model("PaymentCard", schema.mongodb);

module.exports = {
  PaymentCard,
  clientSchema: schema.client,
};
