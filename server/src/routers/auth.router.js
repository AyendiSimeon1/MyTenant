const express = require('express');
const passport = require('passport');
const  {
  authMiddleware, verifyToken, 
} = require('../middlewares/auth.middlewares');
const {
  registerController,
  loginController,
  passwordResetController,
  resetPasswordController

} = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post('/signup', registerController);

authRouter.post('/login', verifyToken, loginController);

authRouter.post('/request-password-reset',  passwordResetController);

authRouter.post('/reset-password/:token', resetPasswordController);

module.exports = { authRouter };