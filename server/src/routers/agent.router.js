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
    sendEmail,
    userSubmitForm,
    getTemplate,
    sendRefrenceSms,
    submitReference
 } = require('../controllers/agent.controllers');

const  agentRouter = express.Router();

agentRouter.post("/create-form", createFormController);

agentRouter.post('/profile',  upload.single('logo'), createAgencyProfile);

agentRouter.get("/application/:id", getApplicationByIdController);

agentRouter.get("/templates", getTemplates);

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

module.exports = { agentRouter }

