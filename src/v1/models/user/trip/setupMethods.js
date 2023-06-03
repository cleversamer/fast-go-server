const { trip: config } = require("../../../config/models");

module.exports = (mongodbSchema) => {
  mongodbSchema.methods.approve = function () {
    this.approved = true;
  };

  mongodbSchema.methods.isDead = function () {
    const diffInMilliseconds = new Date() - new Date(this.createdAt);
    const diffInMins = diffInMilliseconds / 60000;
    return diffInMins >= config.tripLifeInMins;
  };
};
