const { User } = require("../models/usersSchema");
const gravatar = require('gravatar');

const signUpNewUser = async (email, password) => {
  const avatarURL = gravatar.url(email, {s: '200', r: 'pg'});
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  return await newUser.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const findUserByIdAndUpdate = async (id, token) => {
  return await User.findByIdAndUpdate(id, token);
};

const updateAvatar = (id, avatarURL) =>
	User.findByIdAndUpdate(id, { avatarURL });


module.exports = {
  signUpNewUser,
  findUserByEmail,
  findUserByIdAndUpdate,
  updateAvatar,
};