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
    submitApplication,
    sendRefrenceSms,
    submitReference,
    applyForProperty,
    updateFormSubmissionStatus,
    initiatePayment,

    getUsers,
    getProperties,
 
    getAgent,
    getProperty,
   
 } = require('../controllers/agent.controllers');

const  agentRouter = express.Router();

agentRouter.post("/property-application", applyForProperty);

agentRouter.post("/submit-application", submitApplication);

agentRouter.post('/profile',  upload.single('profilePicture'), createAgencyProfile);

agentRouter.get("/application/:id", getApplicationByIdController);

agentRouter.get("/templates", getTemplates);

agentRouter.get("/submited-forms", getAllSubmitedForm);


agentRouter.post("/create-property", createProperty);

agentRouter.get("/properties/:id", getAllProperties);

agentRouter.get("/applications/:agendId", getAllApplications);

agentRouter.post("/applications/update/:agentId/:id", updateApplication);

agentRouter.get("/generate-link/:applicationId", generateLink);

agentRouter.post("/send-email", sendEmail);




agentRouter.post("/send-sms", sendRefrenceSms);

agentRouter.post("/submit-reference", submitReference);


agentRouter.post("/update-status", updateFormSubmissionStatus);

agentRouter.post("/initiate-payment", initiatePayment);

agentRouter.get("/users", getUsers);

agentRouter.get("/agent/:agentId", getAgent);

agentRouter.get("/property/:propertyId", getProperty)

agentRouter.get("/properties", getProperties);




module.exports = { agentRouter }
