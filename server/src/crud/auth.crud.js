const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function generateToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

const checkUserEmailExists = async (email) => {
    
    const checkEmail = await prisma.user.findUnique({
        where: {
            email
        }
    });
    return checkEmail;
}

const createUser = async (userData) => {
    const existingUser = await prisma.User.findUnique({
      where: { email: userData.email }
    });
  
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
  
    const user = await prisma.user.create({
      data: userData
    });
    return user;
  };
  
const createResetToken = async(email) => {

  const tokenLength = 16;
  const resetToken = generateToken(tokenLength);   
  
  console.log({ message: resetToken }); 
  const token = await prisma.User.update({
        where : { email },
            data: {
                resetToken
            }
    });
    return token;
};

const getHashedPassword = async(email) => {
  try {
    const user = await prisma.User.findUnique({
      where: { email }
    });

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

const updateUserData = async (newPassword) => {

  try {
    const hashedPassword = getHashedPassword(newPassword);
    const user = await prisma.User.update({
      where : { id: user.id },
      data: {
        password: hashedPassword 
      }
  });
  } catch (error) {
    console.error(error);
  }
};

const confirmToken = async (token) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        resetToken: token
      }
    });
    return user;
  } catch (error) {
   
    console.error('Error confirming token:', error);
    throw error; 
  }
};
module.exports = { checkUserEmailExists, 
                  createUser, createResetToken, 
                  getHashedPassword, 
                  updateUserData, 
                  confirmToken 
                };