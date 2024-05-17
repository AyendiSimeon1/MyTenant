const express = require('express');
const { createFormsControllers, getFormController } = require("../controllers/forms.controllers");

const formsRouter = express.Router();

formsRouter.post('/create', createFormsControllers);

formsRouter.post('/forms/:formId', getFormController);

module.exports = { formsRouter };