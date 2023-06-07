const { Car } = require("../../../models/user/car");
const cloudStorage = require("../../cloud/storage");
const localStorage = require("../../storage/local");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");

module.exports.addCar = async (
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
  passport
) => {
  try {
    // Check if the driver has added a car before
    const driverCars = await Car.count({ driver: driver._id });
    if (driverCars > 0) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.addedCarBefore;
      throw new ApiError(statusCode, message);
    }

    const photos = {
      photo1,
      photo2,
      photo3,
      photo4,
      brochure,
      driverLicense,
      insurance,
      passport,
    };

    // Check if driver has an avatar
    if (!driver.getAvatarURL()) {
      photos["avatar"] = avatar;
    }

    // Upload photos to the storage bucket
    const photoURLs = {};
    Object.keys(photos).forEach(async (key) => {
      // Store file locally in the `uploads` folder
      const localPhoto = await localStorage.storeFile(photos[key]);

      // Upload file from `uploads` folder to cloud bucket
      const cloudPhotoURL = await cloudStorage.uploadFile(localPhoto);

      // Delete local file
      await localStorage.deleteFile(localPhoto.path);

      photoURLs[key] = cloudPhotoURL;
    });

    // Check if driver has an avatar
    if (!driver.getAvatarURL()) {
      driver.updateAvatarURL(photoURLs.avatar);
      await driver.save();
    }

    // Create new car for the driver
    const car = new Car({
      driver: driver._id,
      color,
      model,
      plateNumber,
      productionYear,
      documents: {
        brochure: photoURLs.brochure,
        driverLicense: photoURLs.driverLicense,
        insurance: photoURLs.insurance,
        passport: photoURLs.passport,
      },
      photos: [
        photoURLs.photo1,
        photoURLs.photo2,
        photoURLs.photo3,
        photoURLs.photo4,
      ],
    });

    // Save car to the DB
    await car.save();

    return car;
  } catch (err) {
    throw err;
  }
};
