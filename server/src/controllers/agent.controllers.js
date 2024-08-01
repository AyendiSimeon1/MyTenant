const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const now = new Date();
require('dotenv').config(); 
const request = require('request');
const { createForm, 
        getAllApplication, 
        updateApplications, 
        updateApplicationStatus,
        createFormLink,
        createAgency,
        getRecieptData 
        
      } = require('../crud/agent.crud');

const {
  User,
  Agency,
  Property,
  Template,
  FormSubmission,
  Reference,
  Application,

} = require('../models/user.models');





const getAgent = async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const agent = await Agency.findById(agentId)
      .populate('properties')
      .populate('formSubmissions');
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    
    res.json(agent);
  } catch (error) {
    console.error('Error fetching agent:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await Property.findById(propertyId)
      .populate('agencyId')
      .populate('formSubmissions');
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

const applyForProperty = async (req, res) => {
  const data = req.body;
  try {
  
    const userId = '';
    const applicationData = { ...data, userId }; 

    const newApplication = new Application(applicationData); 
    await newApplication.save(); 

    const propertyId = '6679c64b007b5426f2e173a4'; 
    const updateProperty = await Property.findByIdAndUpdate(
      propertyId,
      { $push: { applications: newApplication._id } },
      { new: true }
    ); 

    if (!updateProperty) {
      return res.status(404).json({ message: 'Property not found' }); 
    }

    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error submitting application', error });
  }
};

const getAllApplicationsForAgent = async (req, res) => {
  try {
    const agentId = ''; 

    const properties = await Property.find({ agencyId: agentId }).select('_id');

    if (!properties.length) {
      return res.status(404).json({ message: 'No properties found for this agent' });
    }

    const propertyIds = properties.map(property => property._id);

    const applications = await Application.find({ propertyId: { $in: propertyIds } });

    res.status(200).json({ applications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body; 

    const validStatuses = ['Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { applicationStatus: status, updatedAt: Date.now() },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: `Application ${status.toLowerCase()} successfully`, application });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating application status', error });
  }
};

const getApprovedApplicationsForAgent = async (req, res) => {
  try {
    const agentId = '';

    const properties = await Property.find({ agentId: agenId}).select('_id');

    if (!properties.length) {
      return res.status(404).json({ message: 'No properties found for this agent'});
    };

    const propertyIds = properties.map(property => property._id);

    const approvedApplications = await Application.find({
      propertyId: { $in: propertyIds },
      applicationStatus: 'Approved'
    });
    res.status(200).json({ approvedApplications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching approved applications', error });
  }
};

const getRejectedApplicationsForAgent = async (req, res) => {
  try {
    const agentId = req.user._id; 

    const properties = await Property.find({ agencyId: agentId }).select('_id');

    if (!properties.length) {
      return res.status(404).json({ message: 'No properties found for this agent' });
    }

    const propertyIds = properties.map(property => property._id);

    const rejectedApplications = await Application.find({
      propertyId: { $in: propertyIds },
      applicationStatus: 'Rejected'
    });

    res.status(200).json({ rejectedApplications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching rejected applications', error });
  }
};

const getPaymentsForApprovedApplications = async (req, res) => {
  try {
    const { agentId } = req.body;

    const { propertyId } = req.body;

    const property =  await Property.findOne({ _id: propertyId, agencyId: agencyId });

    if (!property) {
      return res.status(404).json({ message: 'Property not found or not mannaged by this agent'});

    }

    const approvedApplications = await Application.find({
      propertyId,
      applicationStatus: 'Approved'
    }).populate('payments');
    
    const payments = approvedApplications.reduce((acc, application) => {
      return acc.concat(application.payments);
    }, []);

    res.status(200).json({ payments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching payments for approved applications', error });
  }
};

const generateReciept = (recieptData, filepath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(25).text('Invoice', { align: 'center'});
  doc.fontSize(20).text('User Details', { underline: true });
  doc.fontSize(15).text(`Name: ${receiptData.user.firstName} ${receiptData.user.lastName}`);
  doc.text(`Email: ${receiptData.user.email}`);
  doc.text(`Phone: ${receiptData.user.contactInfo.phoneNumber}`);

  doc.moveDown();

  doc.fontSize(20).text('Property Details', { underline: true });
  doc.fontSize(15).text(`Title: ${receiptData.property.title}`);
  doc.text(`Description: ${receiptData.property.description}`);
  doc.text(`Location: ${receiptData.property.location}`);
  doc.text(`Price: ${receiptData.property.price}`);

  doc.moveDown();

  doc.fontSize(20).text('Agent Details', { underline: true });
  doc.fontSize(15).text(`Name: ${receiptData.agent.firstName} ${receiptData.agent.lastName}`);
  doc.text(`Agency: ${receiptData.property.agencyId.agencyName}`);
  doc.text(`Email: ${receiptData.agent.email}`);
  doc.text(`Phone: ${receiptData.agent.phoneNumber}`);

  doc.moveDown();

  doc.fontSize(20).text('Payment Details', { underline: true });
  doc.fontSize(15).text(`Amount: ${receiptData.payment.amount}`);
  doc.text(`Date: ${receiptData.payment.date}`);
  doc.text(`Reference: ${receiptData.payment.reference}`);

  doc.end();
}

const getReciept = (req, res) => {
  const { recieptId } = req.params;
  const receiptPath = path.join(__dirname, `../reciepts/receipt_${receiptId}.pdf`);
  res.sendFile(receiptPath, err => {
    if(err) {
      console.error(err)
      res.status(404).json({ message: 'Reciept not found' });
    }
  });
}



module.exports = { 
                    getAllApplicationsForAgent,
                    updateApplicationStatus,
                    getUsers,
                    getProperties,
                    getProperty,
                    getAgent,
                    applyForProperty,
                    getApprovedApplicationsForAgent,
                    getRejectedApplicationsForAgent,
                    getPaymentsForApprovedApplications,
                    getReciept
                  };


