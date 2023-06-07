module.exports = (mongodbSchema) => {
  mongodbSchema.methods.verify = function () {
    this.verified = true;
  };

  mongodbSchema.methods.updateType = function (type) {
    this.type = type;
  };
};
