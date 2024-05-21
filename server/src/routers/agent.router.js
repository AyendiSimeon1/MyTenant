const express = require('express');

const { createFormController } = require('../controllers/agent.controllers');

const  agentRouter = express.Router();

agentRouter.post("/create-form", createFormController);

module.exports = { agentRouter }