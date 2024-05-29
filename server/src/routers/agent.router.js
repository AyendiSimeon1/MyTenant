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
    sendEmail
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

module.exports = { agentRouter }

