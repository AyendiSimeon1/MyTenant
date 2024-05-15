import {
    createUser,
    
  } from "../crud/user.crud";

import cache, { CacheTitle } from "../services/cache";
import {
    createAccessToken,
    createPasswordResetToken,
    createRefreshToken,
    JWTPayload,
    JWTUser,
    PasswordResetPayload,
    verifyPasswordResetToken,
} from "../services/jwt";


async function signup(req, res) {
  try {
    const { email, password, firstName, lastName, role, agencyName, agencyDetails, occupation, previousRent } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        agencyName: role === 'AGENT' ? agencyName : '',
        agencyDetails: role === 'AGENT' ? agencyDetails : null,
        occupation: role === 'TENANT' ? occupation : null,
        previousRent: role === 'TENANT' ? previousRent : null,
      }
    });
    const token = generateToken(user);
    res.status(201).json({ message: 'User signed up successfully', user, token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'An error occurred while signing up' });
  }
}

async function resetPassword(req, res) {
  try {
    // Logic for password reset
    res.status(200).json({ message: 'Password reset request received' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'An error occurred while resetting password' });
  }
}

module.exports = { signup };