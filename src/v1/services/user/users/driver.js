module.exports.toggleDriverConnected = async (user) => {
  try {
    user.toggleDriverConnected();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};
