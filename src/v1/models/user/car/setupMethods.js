module.exports = (mongodbSchema) => {
  mongodbSchema.methods.verify = function () {
    this.verified = true;
  };
};
