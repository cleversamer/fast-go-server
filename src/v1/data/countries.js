module.exports.minNSN = 9;
module.exports.maxNSN = 9;
module.exports.minICC = 4;
module.exports.maxICC = 4;
module.exports.minPhone = this.minICC + this.minNSN;
module.exports.maxPhone = this.maxICC + this.maxNSN;

module.exports.countries = [{ icc: "+218", name: "Libya" }];
