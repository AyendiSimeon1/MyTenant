const express = require('express');
const passport = require('passport');
const  {
  authMiddleware,
} = require('../middlewares/auth.middlewares');
const {
  registerController,
  loginController,
  passwordResetController,

} = require("../controllers/auth.controllers");


const authRouter = express.Router();



authRouter.post('/signup', registerController);

authRouter.post('/login', authMiddleware(), loginController);

authRouter.post('/request-password-reset', passwordResetController);

// router.post('/reset-password', resetPassword);

module.exports = { authRouter };