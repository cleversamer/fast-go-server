const { model } = require("mongoose");
const schema = require("./schema");
const setupMethods = require("./setupMethods");

setupMethods(schema.mongodb);

const TripPricing = model("TripPricing", schema.mongodb);

module.exports = {
  TripPricing,
  clientSchema: schema.client,
};
