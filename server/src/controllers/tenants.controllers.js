const { submitApplication, getTenantById } = require('../crud/tenants.crud');


const getTenantApplications = async(req, res) => {
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

const getApprovedApplications = async (req, res) => {
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

const getRejectedApplications = async (req, res) => {
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

const getPaidApplications = async() => {
  const { tenantId, paymentId, applicationId } = req.body;
  try {
    const payment = await Payment.find()

  } catch (error) {
    res.status(500).json({ message: error });
  };
};

module.exports = { getTenantApplications, getApprovedApplications,
    getRejectedApplications
 }; 


