const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { createUser, checkUserEmailExists } = require('../crud/auth.crud');


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

    const token = jwt.sign({userId: newUser.id}, 'admin', { expiresIn: '1h'});

    return res.status(201).json({ token : token, user : newUser });
    
  } catch (error) {
    console.error({'Error creating user': error});
    return res.status(500).json({error: 'Internal server error'});
  }

  
};

const loginController = (req, res) => {
  passport.authenticate('local', (err, info, next) => {
    if(err) {
      return next(err);
    }

    if(!user) {
      return res.status(404).json({ message: info.message });
    }

    return res.status(200).json({ user });

  }) (req, res, next);

};

const passwordResetController = async (res, req) => {
  // const email = req.body;
  // const checkEmail = await checkUserEmailExists(email);

  // if(!checkEmail){
  //   return res.status(404).json('User does not exist');
  // }
  
  // const sendTokenToMail = async () {

  // }
}

module.exports = { registerController, loginController, passwordResetController } 