const express = require('express');
const { createFormsControllers, getFormController, formResponseController } = require("../controllers/forms.controllers");

const formsRouter = express.Router();

formsRouter.post('/create', createFormsControllers);

formsRouter.post('/forms/:formId', getFormController);

formsRouter.post('/form/:formId/responses', formResponseController);

module.exports = { formsRouter };