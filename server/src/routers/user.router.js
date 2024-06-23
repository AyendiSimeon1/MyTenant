const express = require('express');

const  {
  // agentDashboard,
  agentFormsControllers
} = require("../controllers/user.controllers");

const userRouter = express.Router();
// userRouter.get("/agent-dashboard/:id/", agentDashboard);

// userRouter.get("/agents/:agentId/forms", agentFormsControllers);

module.exports = { userRouter };