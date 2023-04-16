const { User } = require('../models/usersSchema');
const gravatar = require('gravatar');
const sendMail = require('../service/sendGrid');
const { uuid } = require('uuid');

const signUpNewUser = async (email, password) => {
  const avatarURL = gravatar.url(email, { s: '200', r: 'pg' });
  const verificationToken = uuid();
  const newUser = new User({ email, avatarURL, verificationToken});
  await newUser.setPassword(password);
  await sendMail(email, verificationToken);
  await newUser.save();

  return newUser;
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const findUserByIdAndUpdate = async (id, token) => {
  return await User.findByIdAndUpdate(id, token);
};

const updateAvatar = (id, avatarURL) =>
  User.findByIdAndUpdate(id, { avatarURL });
  
const updateVerificationToken = async (verificationToken) => {
  return await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    }
  );
};


module.exports = {
  signUpNewUser,
  findUserByEmail,
  findUserByIdAndUpdate,
  updateAvatar,
  updateVerificationToken,
};