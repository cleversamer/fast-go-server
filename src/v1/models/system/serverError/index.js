const { model } = require("mongoose");
const schema = require("./schema");
const setupMethods = require("./setupMethods");

setupMethods(schema.mongodb);

const ServerError = model("Error", schema.mongodb);

module.exports = {
  ServerError,
  clientSchema: schema.client,
};
