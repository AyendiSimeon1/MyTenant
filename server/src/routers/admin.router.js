const express = require('express');
const { } = require("../controllers/admin.controllers");
const { viewAndManageApplications } = require('../controllers/admin.controllers');

const adminRouter = express.Router();

adminRouter.get('/', viewAndManageApplications);

module.exports = { adminRouter };