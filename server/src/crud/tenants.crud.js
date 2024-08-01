const { Application, user, payment } = require('../models/user.models');


const getTenantApplication = async(req, res) => {
  const { tenantId } = req.body;
  const { applicationId } = req.body;
  try {
    application = await Application.find()
    
    if (!application) {
      res.status(404).json({
        message: 'Application does not exist'
      });
    }
    res.status(200).json({
      body: application
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error
    });
  };
};

module.exports = {
  getTenantApplication
};