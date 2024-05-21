const express = require('express');
const { createFormsControllers, getFormController, formResponseController, refrenceController } = require("../controllers/forms.controllers");

const formsRouter = express.Router();

formsRouter.post('/create', createFormsControllers);

formsRouter.post('/forms/:formId', getFormController);

formsRouter.post('/form/:formId/responses', formResponseController);

formsRouter.post('/forms/reference', refrenceController);

module.exports = { formsRouter };