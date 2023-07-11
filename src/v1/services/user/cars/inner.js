const { Car } = require("../../../models/user/car");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const localStorage = require("../../storage/local");
const cloudStorage = require("../../cloud/storage");

module.exports.addCarToDriver = async (
  driver,
  plateNumber,
  productionYear,
  model,
  color,
  avatar,
  photo1,
  photo2,
  photo3,
  photo4,
  brochure,
  driverLicense,
  insurance,
  passport,
  type
) => {
  try {
    // Check if the driver has added a car before
    if (driver.carId) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.addedCarBefore;
      throw new ApiError(statusCode, message);
    }

    // Store avatar
    const localAvatar = await localStorage.storeFile(avatar);
    const cloudAvatarURL = await cloudStorage.uploadFile(localAvatar);
    await localStorage.deleteFile(localAvatar.path);

    // Store car photo 1
    const localPhoto1 = await localStorage.storeFile(photo1, "", false);
    const cloudPhoto1URL = await cloudStorage.uploadFile(localPhoto1);
    await localStorage.deleteFile(localPhoto1.path);

    // Store car photo 2
    const localPhoto2 = await localStorage.storeFile(photo2, "", false);
    const cloudPhoto2URL = await cloudStorage.uploadFile(localPhoto2);
    await localStorage.deleteFile(localPhoto2.path);

    // Store car photo 3
    const localPhoto3 = await localStorage.storeFile(photo3, "", false);
    const cloudPhoto3URL = await cloudStorage.uploadFile(localPhoto3);
    await localStorage.deleteFile(localPhoto3.path);

    // Store car photo 4
    const localPhoto4 = await localStorage.storeFile(photo4, "", false);
    const cloudPhoto4URL = await cloudStorage.uploadFile(localPhoto4);
    await localStorage.deleteFile(localPhoto4.path);

    // Store brochure
    const localBrochure = await localStorage.storeFile(brochure, "", false);
    const cloudBrochureURL = await cloudStorage.uploadFile(localBrochure);
    await localStorage.deleteFile(localBrochure.path);

    // Store driver license
    const localDriverLicense = await localStorage.storeFile(
      driverLicense,
      "",
      false
    );
    const cloudDriverLicenseURL = await cloudStorage.uploadFile(
      localDriverLicense
    );
    await localStorage.deleteFile(localDriverLicense.path);

    // Store insurance
    const localInsurance = await localStorage.storeFile(insurance, "", false);
    const cloudInsuranceURL = await cloudStorage.uploadFile(localInsurance);
    await localStorage.deleteFile(localInsurance.path);

    // Store passport
    const localPassport = await localStorage.storeFile(passport, "", false);
    const cloudPassportURL = await cloudStorage.uploadFile(localPassport);
    await localStorage.deleteFile(localPassport.path);

    // Create new car for the driver
    const car = new Car({
      driver: driver._id,
      color,
      model,
      plateNumber,
      productionYear,
      documents: {
        brochure: cloudBrochureURL,
        driverLicense: cloudDriverLicenseURL,
        insurance: cloudInsuranceURL,
        passport: cloudPassportURL,
      },
      photos: [cloudPhoto1URL, cloudPhoto2URL, cloudPhoto3URL, cloudPhoto4URL],
    });

    // Veriy car and update its type
    car.verify();
    car.updateType(type);
    await car.save();

    // Update driver
    driver.verifyDriver();
    driver.updateAvatarURL(cloudAvatarURL);
    driver.carId = car._id;
    await driver.save();

    return car;
  } catch (err) {
    throw err;
  }
};
