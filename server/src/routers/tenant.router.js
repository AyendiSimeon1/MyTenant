const express =  require('express');
const { submitApplicationController } = require('../controllers/tenants.controllers');

const tenantRouter = express.Router()

// tenantRouter.post("/onboarding/:id", submitApplicationController);

module.exports = { tenantRouter };