const { PrismaClient } = require('@prisma/client');

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
  
const createResetToken = async() => {
    const token = prisma.user.create({
        where : { email},
            data: {
                resetToken
            }
    });
}

module.exports = { checkUserEmailExists, createUser, createResetToken };