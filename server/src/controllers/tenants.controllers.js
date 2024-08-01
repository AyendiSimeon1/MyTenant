const { Users, Application, Agency, Property } = require('../models/user.models');

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
};

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
};




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


