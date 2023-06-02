const { model } = require("mongoose");
const schema = require("./schema");
const setupMethods = require("./setupMethods");

setupMethods(schema.mongodb);

const Car = model("Car", schema.mongodb);

module.exports = {
  Car,
  clientSchema: schema.client,
};
