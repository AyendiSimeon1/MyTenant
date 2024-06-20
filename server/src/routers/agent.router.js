const express = require('express');
const { upload } = require('../middlewares/uploads');

const { 
    createFormController, 
    getAllApplications, 
    getApplicationByIdController,
    updateApplication,
    generateLink,
    createAgencyProfile,
    getTemplates,
    createProperty,
    getAllProperties,
    getAllSubmitedForm,
    sendEmail,
    userSubmitForm,
    getTemplate,
    sendRefrenceSms,
    submitReference,
    createTemplate,
    updateFormSubmissionStatus,
    initiatePayment
 } = require('../controllers/agent.controllers');

const  agentRouter = express.Router();

agentRouter.post("/create-form", createFormController);

agentRouter.post('/profile',  upload.single('logo'), createAgencyProfile);

agentRouter.get("/application/:id", getApplicationByIdController);

agentRouter.get("/templates", getTemplates);

agentRouter.get("/submited-forms", getAllSubmitedForm);

agentRouter.post("/create-property", createProperty);

agentRouter.get("/properties/:id", getAllProperties);

agentRouter.get("/applications/:agendId", getAllApplications);

agentRouter.post("/applications/update/:agentId/:id", updateApplication);

agentRouter.get("/generate-link/:applicationId", generateLink);

agentRouter.post("/send-email", sendEmail);

agentRouter.post("/submit-form", userSubmitForm);

agentRouter.get("/templates/:templateId", getTemplate);

agentRouter.post("/send-sms", sendRefrenceSms);

agentRouter.post("/submit-reference", submitReference);

agentRouter.post("/create-template", createTemplate);

agentRouter.post("/update-status", updateFormSubmissionStatus);

agentRouter.post("/initiate-payment", initiatePayment);

module.exports = { agentRouter }

