const express = require('express');

const { 
    createFormController, 
    getAllApplications, 
    getApplicationByIdController,
    updateApplication,
    generateLink
 } = require('../controllers/agent.controllers');

const  agentRouter = express.Router();

agentRouter.post("/create-form", createFormController);

agentRouter.get("/application/:id", getApplicationByIdController);

agentRouter.get("/applications/:agendId", getAllApplications);

agentRouter.post("/applications/update/:agentId/:id", updateApplication);

agentRouter.get("/generate-link/:applicationId", generateLink);

module.exports = { agentRouter }