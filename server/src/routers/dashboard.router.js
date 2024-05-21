const express = require('express');
const { } = require("../controllers/dashboard.controllers");

const formsRouter = express.Router();

formsRouter.post('/dashboard/agent', createFormsControllers);

module.exports = { formsRouter };