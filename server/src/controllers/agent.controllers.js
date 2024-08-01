const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const SibApiV3Sdk = require('sib-api-v3-sdk');
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
        createAgency
      } = require('../crud/agent.crud');

const {
  User,
  Agency,
  Property,
  Template,
  FormSubmission,
  Reference,
  Application,
  SubmittedApplication,
  Payment
} = require('../models/user.models');



const createFormController = async (req, res) => {
  try {
      const { title, logoUrl, status, propertyAddress, leaseStartDate, leaseEndDate, fields } = req.body;
      const form = new Form({ title, logoUrl, status, propertyAddress, leaseStartDate, leaseEndDate, fields });
      await form.save();
      res.json(form);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create form' });
  }
};

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

module.exports = { createFormController, 
                    getAllApplicationsForAgent,
                    updateApplicationStatus,
                    getUsers,
                    getProperties,
                    getProperty,
                    getAgent,
                    applyForProperty,
                    getApprovedApplicationsForAgent,
                    getRejectedApplicationsForAgent
                  };


