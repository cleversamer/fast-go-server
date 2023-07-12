const { model } = require("mongoose");
const schema = require("./schema");
const setupMethods = require("./setupMethods");

setupMethods(schema.mongodb);

const ChallengeProgress = model("ChallengeProgress", schema.mongodb);

module.exports = {
  ChallengeProgress,
  clientSchema: schema.client,
};
