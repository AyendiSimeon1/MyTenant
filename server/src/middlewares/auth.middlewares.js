const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
 getUserByEmail, checkUserEmailExists,
} = require('../crud/auth.crud');

const secretKey = 'admin';

const generateToken = (user) => {
  const  token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if(!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], 'admin', (err, decoded) =>{
    if(err) {
      console.error(err);
      return res.status(403).json({ message: 'Failed to authenticate user' });
    }
    req.user = decoded;
    next();
  });
  
};

module.exports = { verifyToken, generateToken };
