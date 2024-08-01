const express = require('express');
const { upload } = require('../middlewares/uploads');

const { 
    createFormController,
    getAllApplicationsForAgent,
    updateApplicationStatus,
    applyForProperty,
    getUsers,
    getProperties,
    getAgent,
    getProperty,
    getPaymentsForApprovedApplications
   
 } = require('../controllers/agent.controllers');

const  agentRouter = express.Router();

agentRouter.post("/property-application", applyForProperty);

agentRouter.post("/get-agent-property", getAllApplicationsForAgent);

agentRouter.post("/change-application-status", updateApplicationStatus)

agentRouter.post('/profile',  upload.single('profilePicture'), createAgencyProfile);

agentRouter.get('/get-approved-payment', getPaymentsForApprovedApplications);



// agentRouter.post("/initiate-payment", initiatePayment);

agentRouter.get("/users", getUsers);

// agentRouter.get("/agent/:agentId", getAgent);

agentRouter.get("/property/:propertyId", getProperty)

agentRouter.get("/properties", getProperties);




module.exports = { agentRouter }
