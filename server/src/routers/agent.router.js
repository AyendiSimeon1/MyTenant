const express = require('express');
const { upload } = require('../middlewares/uploads');

const { 
    createFormController, 
    getAllApplications, 
    getApplicationByIdController,
    updateApplication,
    generateLink,
    createAgencyProfile
 } = require('../controllers/agent.controllers');

const  agentRouter = express.Router();

agentRouter.post("/create-form", createFormController);

agentRouter.post('/profile',  upload.single('logo'), createAgencyProfile);

agentRouter.get("/application/:id", getApplicationByIdController);

agentRouter.get("/applications/:agendId", getAllApplications);

agentRouter.post("/applications/update/:agentId/:id", updateApplication);

agentRouter.get("/generate-link/:applicationId", generateLink);

module.exports = { agentRouter }