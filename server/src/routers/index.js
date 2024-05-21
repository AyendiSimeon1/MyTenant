const express = require('express');
const { authRouter } = require('../routers/auth.router');
const { formsRouter } = require('../routers/forms.router');
const { userRouter } = require('../routers/user.router');
const { agentRouter } = require('../routers/agent.router');
const { adminRouter } = require('../routers/admin.router');
const { tenantRouter } = require('../routers/tenant.router');

const mainRouter = express.Router();


mainRouter.use("/auth", authRouter);

mainRouter.use("/forms", formsRouter);

mainRouter.use("/admin", adminRouter);

mainRouter.use("/agents", agentRouter);

mainRouter.use("/tenants", tenantRouter);

module.exports = { mainRouter };


