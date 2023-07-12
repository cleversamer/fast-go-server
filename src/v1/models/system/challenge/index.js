const { model } = require("mongoose");
const schema = require("./schema");
const setupMethods = require("./setupMethods");

setupMethods(schema.mongodb);

const Challenge = model("Challenge", schema.mongodb);

module.exports = {
  Challenge,
  clientSchema: schema.client,
};
