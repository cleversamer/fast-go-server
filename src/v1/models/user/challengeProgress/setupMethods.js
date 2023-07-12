module.exports = (mongodbSchema) => {
  mongodbSchema.methods.isComplete = function () {
    try {
      return (
        this.referralsProgress === this.referralTarget &&
        this.tripsProgress === this.tripTarget
      );
    } catch (err) {
      return false;
    }
  };

  mongodbSchema.methods.resetProgress = function () {
    try {
      this.referralsProgress = 0;
      this.tripsProgress = 0;
    } catch (err) {}
  };

  mongodbSchema.methods.addReferralPoint = function () {
    try {
      this.referralsProgress = this.referralsProgress + 1;
    } catch (err) {}
  };

  mongodbSchema.methods.addTripPoint = function () {
    try {
      this.tripsProgress = this.tripsProgress + 1;
    } catch (err) {}
  };
};
