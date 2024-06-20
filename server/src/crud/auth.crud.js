const crypto = require('crypto');
const {
  User,
  Agency
} = require('../models/user.models')
function generateToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

const checkUserEmailExists = async (email) => {
  const checkEmail = await User.findOne({ email });
  return checkEmail;
};

const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const user = new User(userData);
  await user.save();
  return user;
};

const createResetToken = async (email) => {
  const tokenLength = 16;
  const resetToken = generateToken(tokenLength);

  console.log({ message: resetToken });

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { resetToken },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return resetToken;
  } catch (error) {
    console.error('Error creating reset token:', error);
    throw error;
  }
};

const getHashedPassword = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (user) {
      return user.password;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUserData = async (userId, newPassword) => {
  try {
    const hashedPassword = getHashedPassword(newPassword);
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const confirmToken = async (token) => {
  try {
    const user = await User.findOne({ resetToken: token });
    return user;
  } catch (error) {
    console.error('Error confirming token:', error);
    throw error;
  }
};

const getAgencyProfileByUserId = async (userId) => {
  try {
    const agencyProfile = await Agency.findOne({ userId: userId });
    return agencyProfile;
  } catch (error) {
    throw new Error('Error fetching agency profile: ' + error.message);
  }
};
module.exports = { checkUserEmailExists, 
                  createUser, createResetToken, 
                  getHashedPassword, 
                  updateUserData, 
                  confirmToken,
                  getAgencyProfileByUserId 
                };