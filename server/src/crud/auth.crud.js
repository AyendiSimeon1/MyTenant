const { PrismaClient } = require('@prisma/client');
const { shortid } = require('shortid');

const prisma = new PrismaClient();

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

  tokenLength = 10;
  const resetToken = 'hkhk';
  
  console.log({resetToken: "This is your reset token"}); 
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
    console.log(user.password);
  
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

module.exports = { checkUserEmailExists, createUser, createResetToken, getHashedPassword, updateUserData };