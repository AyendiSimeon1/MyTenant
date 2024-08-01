const { PrismaClient } = require('@prisma/client');
const { submitApplication, getTenantById } = require('../crud/tenants.crud');
const prisma = new PrismaClient;

const getApplicationById = async (id) => {
  return await prisma.application.findUnique({
    where: { id },
    include: { submissions: true },
  });
};

const submitApplicationController = async (req, res) => {
  try {
    const { id } = req.params;
    const completedFormData = req.body;

    const application = await getApplicationById(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    const submission = await submitApplication(id, completedFormData);
    res.json(submission);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

// Authenticate Identification
const authenticateIdentificationController = async (req, res) => {
    const { token, idDocument } = req.body;
  
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const updatedApplication = await updateApplicationIdDocument(decoded.id, idDocument);
  
      // Here, you would typically call the government verification API
      // For this example, we'll just return a success response
  
      res.json({ message: 'ID authenticated', updatedApplication });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
// Make Payment for Form/Registration
const makePaymentController = async (req, res) => {
    const { tenantId, amount } = req.body;
  
    try {
      const payment = await createPayment(tenantId, amount);
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
// Submit the Completed Application
const submitCompletedApplicationController = async (req, res) => {
    const { tenantId, applicationId } = req.body;
  
    try {
      const application = await updateApplicationStatus(applicationId, 'submitted');
  

      const tenant = await getTenantById(tenantId);
      // await sendConfirmationEmail(tenant.username, 'Application Submission Confirmation', 'Your application has been submitted successfully. We will review it and get back to you soon.');
  
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };


const sendPaymentLinkForProperty = async (req, res) => {
    const { tenantId, propertyId } = req.body;

    try {
        const paymentLink = `https://payment.example.com/pay?propertyId=${propertyId}&tenantId=${tenantId}`;

        res.json({ paymentLink });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};





const getProerties = async (req, res) => {
  try {
    const agency = await Agency.findOne({ userId: req.user.id });
    if (!agency) {
      return res.status(404).json({ error: 'Agency not found for this user' });
    }
    const properties = await Property.find({ agencyId: agency._id });
    res.json({
      message: 'Properties for the user',
      count: properties.length,
      properties: properties
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching properties' });
  }
};
const getApprovedApplications = async (req, res) => {
  try {
    const agency = await Agency.findOne({ userId: req.user.id });
    if (!agency) {
      return res.status(404).json({ error: 'Agency not found for this user' });
    }
    const properties = await Property.find({ agencyId: agency._id });
    const propertyIds = properties.map(p => p._id);
    const approvedApplications = await Application.find({
      'propertyPreferences.propertyType': { $in: propertyIds },
      applicationStatus: 'Approved'
    });
    res.json({
      message: 'Approved applications for the user',
      count: approvedApplications.length,
      applications: approvedApplications
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching approved applications' });
  }
};

const getRejectedApplications = async (req, res) => {
  try {
    const agency = await Agency.findOne({ userId: req.user.id });
    if (!agency) {
      return res.status(404).json({ error: 'Agency not found for this user' });
    }
    const properties = await Property.find({ agencyId: agency._id });
    const propertyIds = properties.map(p => p._id);
    const rejectedApplications = await Application.find({
      'propertyPreferences.propertyType': { $in: propertyIds },
      applicationStatus: 'Rejected'
    });
    res.json({
      message: 'Rejected applications for the user',
      count: rejectedApplications.length,
      applications: rejectedApplications
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching rejected applications' });
  }
});

const getPaidApplicayions = async (req, res) => {
  try {
    const agency = await Agency.findOne({ userId: req.user.id });
    if (!agency) {
      return res.status(404).json({ error: 'Agency not found for this user' });
    }
    const properties = await Property.find({ agencyId: agency._id });
    const propertyIds = properties.map(p => p._id);
    const paidApplicationIds = await Payment.distinct('applicationId', { status: 'completed' });
    const paidApplications = await Application.find({
      _id: { $in: paidApplicationIds },
      'propertyPreferences.propertyType': { $in: propertyIds }
    });
    res.json({
      message: 'Paid applications for the user',
      count: paidApplications.length,
      applications: paidApplications
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching paid applications' });
  }
});



module.exports = { submitApplicationController } 


