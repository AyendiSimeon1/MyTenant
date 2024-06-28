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

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';
const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();

const CYBERPAY_API_KEY = process.env.CYBERPAY_API_KEY;
const CYBERPAY_INTEGRATION_KEY = process.env.CYBERPAY_INTEGRATION_KEY

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

const generateLink = async (req, res) => {
  try {
      const { applicationId } = req.params;
      const formLink = await createFormLink(applicationId); // Implement createFormLink function
      if (!formLink) {
          return res.status(404).json({ message: 'Application not found' });
      }
      res.json(formLink);
  } catch (error) {
      res.status(500).json({ error: 'Failed to create form link' });
  }
};


const getAllApplications = async (req, res) => {
  try {
      const { agentId } = req.params;
      const applications = await Application.find({ agentId });
      if (!applications) {
          return res.status(404).json({ message: 'Applications not found' });
      }
      res.status(200).json({ message: applications });
  } catch (error) {
      res.status(500).json('Internal Server Error');
  }
};

const updateApplication = async (req, res) => {
  try {
      const { agentId, id } = req.params;
      const { title, logoUrl, status, propertyAddress, leaseStartDate, leaseEndDate, fields } = req.body;
      const updateData = { title, logoUrl, status, propertyAddress, leaseStartDate, leaseEndDate, fields };

      const updatedApplication = await Application.findOneAndUpdate({ _id: id, agentId }, updateData, { new: true });
      if (!updatedApplication) {
          return res.status(404).json({ message: 'Application not found' });
      }
      return res.status(200).json({ message: 'Application updated successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};


const getApplicationByIdController = async (req, res) => {
  try {
      const { id } = req.params;
      const application = await Application.findById(id);
      if (!application) return res.sendStatus(403);
      res.json(application);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch application' });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Change this to your desired upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  }
});

const upload = multer({ storage: storage });

const createAgencyProfile = async (req, res) => {
  try {
      const { companyName, streetName, area, lga, state, userId } = req.body;
      if (!companyName || !streetName || !area || !lga || !state || !userId) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      const profilePicture = req.file ? req.file.filename : null;

      const newAgency = new Agency({ companyName, streetName, area, lga, state, userId, profilePicture  });
      await newAgency.save();
      res.status(201).json(newAgency);
  } catch (error) {
      console.error('Error creating agency profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const getTemplates = async (req, res) => {
  try {
      const templates = await Template.find();
      res.json(templates);
  } catch (error) {
      console.error('Error fetching templates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProperty = async (req, res) => {
  try {
      const { address, type, agencyId, price } = req.body;
      if (!agencyId) {
        return res.status(400).json({ error: 'agencyId is required' });
      }
      const newProperty = new Property({ address, type, agencyId, price });
      await newProperty.save();
      res.json(newProperty);
  } catch (error) {
      console.error('Error creating property:', error);
      res.status(500).json({ error: 'Failed to create property' });
  }
};


const getAllProperties = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: 'agencyId query parameter is required' });
    }
    
    const properties = await Property.find({ agencyId: id }).exec();

    res.status(200).json(properties);
    console.log(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Error fetching properties' });
  }
};

const sendEmail = async (req, res) => {
  try {
    const { email, link, agencyId } = req.body;

    if (!email || !link || !agencyId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: '75a4e9001@smtp-brevo.com',
        pass: 'Q8BvNpJ9GFaIZg0x',
      },
    });

    const mailOptions = {
      from: 'Dev@mytenant.ng',
      to: email,
      subject: 'Test Email From My Tenant Dev',
      html: `
        <p>Hello,</p>
        <p>Please click the following link to access the form:</p>
        <p><a href="${link}">${link}</a></p>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};



const userSubmitForm = async (req, res) => {
  const { agencyId, templateId, propertyId, formData } = req.body;

  try {
    const newSubmission = new FormSubmission({
      agencyId,
      templateId,
      propertyId,
      data: formData,
    });
    await newSubmission.save();
    res.status(201).json(newSubmission);
    
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form. Please try again later.' });
  }
};

const createTemplate = async (req, res) => {
  try {
    const { name, fields } = req.body;
    if (!name || !fields) {
      return res.status(400).json({ error: 'Name and fields are required' });
    }
    const newTemplate = new Template({ name, fields });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTemplate = async (req, res) => {
  const { templateId } = req.params;

  try {
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.status(200).json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Failed to fetch template. Please try again later.' });
  }
};



const submitReference = async (req, res) => {
  const { formSubmissionId, name, phone, email, contactInfo, relationship, additionalDetails, identityDocument } = req.body;
  try {
    const reference = new Reference({
      formSubmissionId,
      name,
      phone,
      email,
      contactInfo,
      relationship,
      additionalDetails,
      identityDocument,
    });
    await reference.save();
    res.status(201).json(reference);
  } catch (error) {
    console.error('Error creating reference:', error);
    res.status(500).json({ error: 'Failed to create reference', details: error.message });
  }
};

const getAllSubmitedForm = async (req, res) => {
  const { agencyId } = req.params;

  try {
    const formSubmissions = await FormSubmission.find()
    const referenceSubmission = await Reference.find();
    res.json({ formSubmissions, referenceSubmission });
    
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    res.status(500).json({ error: 'Failed to fetch form submissions' });
  }
};

const initiatePayment = async (req, res) => {
  const { MerchantRef, Amount, Description, CustomerName, CustomerEmail, CustomerMobile } = req.body;
  const paymentData = {
    Currency: 'NGN',
    MerchantRef,
    Amount,
    Description,
    CustomerName,
    CustomerEmail,
    CustomerMobile,
    IntegrationKey: "078b48a5c64442ddb63ac3d1f0604153",
    ReturnUrl: "http://127.0.0.1:3000"
  };

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://payment-api.staging.cyberpay.ng/api/v1/payments',
    headers: { 
      'ApiKey': 'MDc4YjQ4YTVjNjQ0NDJkZGI2M2FjM2QxZjA2MDQxNTM=',
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(paymentData)
  };
  try {
    console.log("Sending request to Cyberpay:", config);
    const response = await axios(config);
    console.log("Response from Cyberpay:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateFormSubmissionStatus = async (req, res) => {
  const { formSubmissionId, status, userEmail } = req.body;

  if (!formSubmissionId || !['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Missing or invalid required fields' });
  }
  try {
    const updatedFormSubmission = await FormSubmission.findByIdAndUpdate(
      formSubmissionId,
      { status },
      { new: true }
    );
    res.status(200).json({ message: 'Form approved.', updatedFormSubmission });
  } catch (error) {
    console.error('Error updating form submission status:', error);
    res.status(500).json({ message: 'Failed to update form submission status' });
  }
};

const sendRefrenceSms = async (req, res) => {
  const { phoneNumber, messageContent } = req.body;
  console.log(messageContent);
  const data = {
    to: phoneNumber,
    from: "N-Alert",
    sms: messageContent,
    type: "plain",
    api_key: process.env.TERMII_API_KEY,
    channel: "generic",
  };
  const options = {
    method: 'POST',
    url: 'https://api.ng.termii.com/api/sms/send',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  request(options, (error, response) => {
    if (error) {
      console.error('Error sending SMS:', error);
      return res.status(500).json({ message: 'Failed to send SMS' });
    }
    res.status(200).json({ message: 'SMS sent successfully', response: response.body });
  });
};

const sendApprovalMail = async (req, res) => {
  try {
    const { email, formId } = req.body;
    const link = "http://127.0.0.1:3000/dashboard/initiate-payment";
    if (!email || !formId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: '75a4e9001@smtp-brevo.com',
        pass: 'Q8BvNpJ9GFaIZg0x',
      },
    });

    const mailOptions = {
      from: 'Dev@mytenant.ng',
      to: email,
      subject: 'Form Approved - Next Steps',
      html: `
        <p>Hello,</p>
        <p>Your form has been approved. Click the following link to proceed: ${link} </p>
        <p><a href="${link}">Link</a></p>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
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

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

module.exports = { createFormController, 
                    getApplicationByIdController, 
                    getAllApplications, 
                    updateApplication,
                    generateLink,
                    createAgencyProfile,
                    getTemplates,
                    createProperty,
                    getAllProperties,
                    sendEmail,
                    userSubmitForm,
                    getTemplate,
                    sendRefrenceSms,
                    submitReference,
                    createTemplate,
                    updateFormSubmissionStatus,
                    initiatePayment,
                    getAllSubmitedForm,
                    sendApprovalMail,
                    getUsers,
                    getProperties,
                    getPayments,
                    getProperty,
                    getAgent

                  };


