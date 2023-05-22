const { User } = require("../models/user/user");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { server } = require("../config/system");

const jwtOptions = {
  secretOrKey: process.env["JWT_PRIVATE_KEY"],
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    const unauthorized =
      !user ||
      user.isDeleted() ||
      payload.email !== user.getEmail() ||
      payload.phone !== user.getPhone();

    return unauthorized ? done(null, false) : done(null, user);
  } catch (err) {
    done(err, false);
  }
};

module.exports.jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
