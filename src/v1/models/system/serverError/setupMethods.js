module.exports = (mongodbSchema) => {
  mongodbSchema.methods.addOccur = function () {
    this.occurs = this.occurs + 1;
  };
};
