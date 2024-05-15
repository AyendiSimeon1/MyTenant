const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken }; 