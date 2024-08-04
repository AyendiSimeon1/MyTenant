const express = require('express');
const { upload } = require('../middlewares/uploads');

const {
    getAllApplicationsForAgent,
    updateApplicationStatus,
    applyForProperty,
    getProperties,
    getAgent,
    getProperty,
    getPaymentsForApprovedApplications,
    createProperty,
    getPropertiesByAgent,
    getApprovedApplicationsForAgent
   
 } = require('../controllers/agent.controllers');

const  agentRouter = express.Router();

agentRouter.post("/create-property", createProperty);

agentRouter.get("/get-approved-applications/:agentId", getApprovedApplicationsForAgent);

agentRouter.post("/property-application", applyForProperty);

agentRouter.get("/get-agent-property/:agentId", getPropertiesByAgent);

agentRouter.get("/get-agents-applications/:agentId", getAllApplicationsForAgent);

agentRouter.post("/change-application-status", updateApplicationStatus)

// agentRouter.post('/profile',  upload.single('profilePicture'), createAgencyProfile);

agentRouter.get('/get-approved-payment', getPaymentsForApprovedApplications);

// agentRouter.get("/agent/:agentId", getAgent);

agentRouter.get("/property/:propertyId", getProperty)

agentRouter.get("/properties", getProperties);




module.exports = { agentRouter }
