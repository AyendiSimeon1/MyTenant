const { application } = require('express');
const { getForm } = require('../crud/forms.crud');
const { getAgentForms } = require('../crud/user.crud');


const generateReportsController = async (req, res) => {
    const { reportType } = req.body;
  
    try {
      let reportData;
  
      switch (reportType) {
        case 'userEngagement':
          reportData = await getUserEngagementReport();
          break;
        case 'successfulTenancies':
          reportData = await getSuccessfulTenanciesReport();
          break;
        case 'paymentTransaction':
          reportData = await getPaymentTransactionReport();
          break;
        default:
          return res.status(400).json({ message: 'Invalid report type' });
      }
  
      res.json(reportData);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

const monitorFormAndPayments = async (req, res) => {
    try {
        const forms = await getForms();
        const payments = await getPayments();
        res.json({ forms, payments });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const viewAndManageApplications = async (req, res) => {
    const { sort, filter } = req.body;
    try {
        const applications = await getApplications(sort, filter);
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
const reviewReferenceDetails = async (req, res) => {
    const { formId } = req.params;
    try {
        const form = await getReferenceDetails(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(form.references);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const approveOrRejectApplication = async (req, res) => {
    const { applicationId, action } = req.body;

    try {
        const status = action === 'approve' ? 'approved' : 'rejected';
        const updatedApplication = await updateApplicationStatus(applicationId, status);
        res.json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports = { agentDashboard, agentFormsControllers };