const express = require('express');
const { updateApplication } = require('../controllers/applications.controllers');

const applicationRouter = express.Router();

applicationRouter.post('/update-status', updateApplication);

module.exports = { applicationRouter }; 