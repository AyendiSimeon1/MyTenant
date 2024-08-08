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
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Hello");
console.log(process.env.CLOUDINARY_CLOUD_NAME);




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

const getPropertiesByAgent = async (req, res) => {
  try {
    const { agentId } = req.params; // Assuming agentId is passed as a route parameter

    if (!agentId) {
      return res.status(400).json({ message: 'Agent ID is required' });
    }

    const properties = await Property.find({ agencyId: agentId });

    if (!properties.length) {
      return res.status(404).json({ message: 'No properties found for this agent' });
    }

    res.status(200).json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
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

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    const propertiesWithImages = properties.map(property => {
      let imageUrl = null;
      if (property.image && property.image.data) {
        const base64Image = property.image.data.toString('base64');
        imageUrl = `data:${property.image.contentType};base64,${base64Image}`;
      }
      console.log('imageUrl:', imageUrl);
      return {
        ...property.toObject(),
        imageUrl,
      };
    });

    // Make copies of propertiesWithImages for independent sorting
    const latestProperties = [...propertiesWithImages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const trendingProperties = [...propertiesWithImages].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // Limit the number of properties
    const latestPropertiesLimited = latestProperties.slice(0, 10);
    const trendingPropertiesLimited = trendingProperties.slice(0, 10);

    res.status(200).json({
      latest: latestPropertiesLimited,
      trending: trendingPropertiesLimited,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};



const applyForProperty = async (req, res) => {
  const data = req.body;
  try {
    const applicationData = req.body;

    const newApplication = new Application(applicationData);
    const savedApplication = await newApplication.save();

    await Property.findByIdAndUpdate(applicationData.propertyId, {
      $push: { applications: savedApplication._id }
    });

    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

const getAllApplicationsForAgent = async (req, res) => {
  try {
    const agentId = '667448bb3468267bcb6c033b'; 

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


const getApprovedApplicationsForAgent = async (req, res) => {
  try {
    const agentId = req.query;

    const properties = await Property.find({ agentId: agentId }).select('_id');

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

const createProperty = async (req, res) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads',
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
    }
  });

  const upload = multer({ storage: storage });

  try {
    const uploadMiddleware = upload.single('image');

    // Execute the upload middleware
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(400).json({ message: 'Error uploading image', error: err });
      }

      console.log('Request body after upload middleware:', req.body);
      console.log('Request file after upload middleware:', req.file);

      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
      }

      const { originalname, path, filename } = req.file;
      const { title, description, agencyId, price, location, applications } = req.body;

      // Ensure required fields are provided
      if (!title || !description || !price || !location) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }

      // Construct the new property object
      const newProperty = new Property({
        title,
        description,
        agencyId,
        price,
        location,
        applications,
        image: {
          filename: originalname,
          url: path,
          publicId: filename
        }
      });

      // Save the new property to the database
      const savedProperty = await newProperty.save();
      res.status(201).json(savedProperty);
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
const generateReceipt = (recieptData, filepath) => {
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
                    createProperty,
                    getPropertiesByAgent,
                    getAllApplicationsForAgent,
                    updateApplicationStatus,
                    generateReceipt,
                    getProperties,
                    getProperty,
                    getAgent,
                    applyForProperty,
                    getApprovedApplicationsForAgent,
                    getRejectedApplicationsForAgent,
                    getPaymentsForApprovedApplications,
                    getReciept
                  };


