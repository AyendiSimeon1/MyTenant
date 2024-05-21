const express = require('express');
const { authRouter } = require('../routers/auth.router');
const { formsRouter } = require('../routers/forms.router');
const { userRouter } = require('../routers/user.router');
const { agentRouter } = require('../routers/agent.router');

const mainRouter = express.Router();


mainRouter.use("/auth", authRouter);

mainRouter.use("/forms", formsRouter);

// mainRouter.use("/users", userRouter);

mainRouter.use("/agents", agentRouter);

module.exports = { mainRouter };


