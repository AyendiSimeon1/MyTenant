const express = require('express');
const { authRouter } = require('../routers/auth.router');


const mainRouter = express.Router();


mainRouter.use("/auth", authRouter);

module.exports = { mainRouter };
