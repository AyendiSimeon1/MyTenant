const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { verifyToken, generateToken } = require('../middlewares/auth.middlewares');
require('dotenv').config();
const { createUser, 
        checkUserEmailExists, 
        getHashedPassword, 
        createResetToken, 
        updateUserData, 
        confirmToken 
      } = require('../crud/auth.crud');
const { sendResetSms } = require('../utils/emails');
const secretKey = 'admin';

const registerController = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    role,
    agencyName,
    agencyDetails,
    occupation,
    resetToken,

  } = req.body


  try {
    const existingUser = checkUserEmailExists(email);
    if(!existingUser) {
      return res.status(401).json('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        agencyName,
        agencyDetails,
        occupation,
        resetToken,
    });

    console.log(newUser);

    const token = generateToken(newUser);

    return res.status(201).json({ token : token, user : newUser });
    
  } catch (error) {
    console.error({'Error creating user': error});
    return res.status(500).json({ error: 'Internal server error'});
  }

  
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = checkUserEmailExists(email);
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    } 
    const hashedPassword = await getHashedPassword(email);
    const verifyPassword = await bcrypt.compare(password, hashedPassword);

    if(!verifyPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id:user.id, email: user.email}, 'admin', { expiresIn: '4h'});
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:'Internal server error' });
  }

};

const passwordResetController = async (req, res) => {
  const { email, phoneNumber } = req.body;
  try {
    const checkEmail = await checkUserEmailExists(email);

    if(!checkEmail){
      return res.status(404).json('User does not exist');
    }
    const token = await createResetToken(email);
    console.log(token);
    const sentToken = await sendResetSms(phoneNumber, token)
    if(!sentToken) {
      res.status(401).json({ message: 'Failed to send token through sms'});
    }
    return res.status(200).json({ message: 'Token sent to phone number' });
    
  } catch (error) {
    console.error(error);
  }
};

const resetPasswordController = async (req, res) => {
  const token = req.params;
  const { newPassword } = req.body;

  try {

    const tokenVerification = await confirmToken(token);

    if(!tokenVerification){
      return res.status(404).json({ message: 'Wrong or expired token' });
    };

    const updatePassword = await updateUserData(newPassword);
    if(!updatePassword) {
      return res.status(401).json({ error: 'Passport update failed'});
    }

    res.status(200).json({ message: 'You have successfuly updated your password' });
  } catch (error) {
      console.error(error);
    }

  

};

module.exports = { registerController, loginController, passwordResetController, resetPasswordController, resetPasswordController } 