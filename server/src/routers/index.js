const express = require('express');
const { authRouter } = require('../routers/auth.router');
const { formsRouter } = require('../routers/forms.router');

const mainRouter = express.Router();


mainRouter.use("/auth", authRouter);

mainRouter.use("/forms", formsRouter);

module.exports = { mainRouter };
