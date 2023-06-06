const commonMiddleware = require("../common");
const { server } = require("../../../config/system");

module.exports.validateAddCar = [
  commonMiddleware.checkCarType,
  commonMiddleware.checkPlateNumber,
  commonMiddleware.checkCarColor,
  commonMiddleware.checkCarModel,
  commonMiddleware.checkCarProductionYear,
  commonMiddleware.checkFile("avatar", server.SUPPORTED_PHOTO_EXTENSIONS, true),
  commonMiddleware.checkFile("photo1", server.SUPPORTED_PHOTO_EXTENSIONS, true),
  commonMiddleware.checkFile("photo2", server.SUPPORTED_PHOTO_EXTENSIONS, true),
  commonMiddleware.checkFile("photo3", server.SUPPORTED_PHOTO_EXTENSIONS, true),
  commonMiddleware.checkFile("photo4", server.SUPPORTED_PHOTO_EXTENSIONS, true),
  commonMiddleware.checkFile(
    "brochure",
    server.SUPPORTED_PHOTO_EXTENSIONS,
    true
  ),
  commonMiddleware.checkFile(
    "driverLicense",
    server.SUPPORTED_PHOTO_EXTENSIONS,
    true
  ),
  commonMiddleware.checkFile(
    "insurance",
    server.SUPPORTED_PHOTO_EXTENSIONS,
    true
  ),
  commonMiddleware.checkFile(
    "passport",
    server.SUPPORTED_PHOTO_EXTENSIONS,
    true
  ),
];
