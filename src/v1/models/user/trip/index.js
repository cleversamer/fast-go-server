const { model } = require("mongoose");
const schema = require("./schema");
const setupMethods = require("./setupMethods");

setupMethods(schema.mongodb);

const Trip = model("Trip", schema.mongodb);

module.exports = {
  Trip,
  clientSchema: schema.client,
};
