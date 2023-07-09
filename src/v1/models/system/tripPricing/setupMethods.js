module.exports = (mongodbSchema) => {
  mongodbSchema.methods.setKmPrice = function (price) {
    this.pricePerKm = price;
  };

  mongodbSchema.methods.setDoorOpeningPrice = function (price) {
    this.doorOpeningPrice = price;
  };
};
