const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { createForm, 
        getAllApplication, 
        updateApplications, 
        updateApplicationStatus,
        createFormLink,
        createAgency
      } = require('../crud/agent.crud');
const prisma =  new PrismaClient;

const createFormController = async (req, res) => {
    try {
      const { title, logoUrl, status,propertyAddress, leaseStartDate, leaseEndDate,  fields } = req.body;
      const form = await createForm(title, logoUrl, status, propertyAddress, leaseStartDate, leaseEndDate, fields);
      res.json(form);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create form' });
    }
  };
  

  const generateLink = async (req, res) => {
    try {
      const { applicationId } = req.params;
  
      const formLink = await createFormLink(applicationId);
      if(!formLink) {
        res.status(404).json({ message: 'Application not found' });
      }
      res.json(formLink);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create form link' });
    }
  };

const getAllApplications = async (req, res) => {
  try {
    const { agentId } = req.params;
    const applications = await getAllApplication(agentId);
    if(!applications) {
      res.status(404).json({ message:'Applications not found' });
    }
    res.status(200).json({ message: applications });
  } catch (error) {
    res.status(500).json('Internal Server Error');
  }
}
const updateApplication = async (req, res) => {
  try {
    const { agentId, id } = req.params;
    const { title, logoUrl, status, propertyAddress, leaseStartDate, leaseEndDate, fields } = req.body;

    const updateData = {
      title,
      logoUrl,
      status,
      propertyAddress,
      leaseStartDate,
      leaseEndDate,
      fields: JSON.stringify(fields),
    };

    const updatedApplication = await updateApplications(agentId, id, updateData);
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.status(200).json({ message: 'Application updated successfully' });  // Or just return a 200 status code
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

  const getApplicationByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const application = await getApplicationById(id, req.user.id);
  
      if (!application) return res.sendStatus(403);
  
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch application' });
    }
  };

  const approveApplicationController = async (req, res) => {
    try {
      const { id } = req.params;
      const application = await getApplicationById(id, req.user.id);
  
      if (!application) return res.sendStatus(403);
  
      await updateApplicationStatus(id, 'approved');
  
      // TODO: Implement sending payment link to applicant
  
      res.json({ message: 'Application approved and payment link sent' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to approve application' });
    }
  };

const rejectApplicationController = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await getApplicationById(id, req.user.id);

    if (!application) return res.sendStatus(403);

    await updateApplicationStatus(id, 'rejected');

    res.json({ message: 'Application rejected' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject application' });
  }
};



const createAgencyProfile = async (req, res) => {
  const { companyName, streetName, area, lga, state, userId } = req.body;

  if (!companyName || !streetName || !area || !lga || !state || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const data = {
    companyName,
    streetName,
    area,
    lga,
    state,
    user: {
      connect: { id: userId },
    },
    
  };

  try {
    const newAgency = await prisma.Agency.create({ data });
    res.status(201).json(newAgency);
  } catch (error) {
    console.error('Error creating agency profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTemplates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany();
    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProperty = async (req, res) => {
  const { address, type, agencyId } = req.body;

  console.log('Received data:', { address, type, agencyId }); // Log received data


  try {
    // Create a new property
    const newProperty = await prisma.property.create({
      data: {
        address,
        type,
        agency: {
          connect: { id: agencyId },
        },
      },
    });

    res.json(newProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
};


const getAllProperties = async (req, res) => {
  const { id } = req.params; // Access the parameter correctly

  console.log(id); // Should now log the agency ID

  // Rest of your code to handle agencyId
  try {
    if (!id) {
      return res.status(400).json({ error: 'agencyId query parameter is required' });
    }
    
    const properties = await prisma.property.findMany({
      where: {
        agencyId: id
      },
    });
    
    res.status(200).json(properties);
    console.log(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching properties' });
}
};

const sendEmail = async (req, res) => {
  try {
    const { email, link, agencyId } = req.body;

    // Check if email, link, and agencyId are provided
    if (!email || !link || !agencyId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Create a nodemailer transporter with Brevo SMTP details
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: '75a4e9001@smtp-brevo.com',
        pass: 'Q8BvNpJ9GFaIZg0x',
      },
    });

    // Define email options
    const mailOptions = {
      from: '75a4e9001@smtp-brevo.com',
      to: email,
      subject: 'Test Email From My Tenant',
      html: `
        <p>Hello,</p>
        <p>Please click the following link to access the form:</p>
        <p><a href="${link}">${link}</a></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

const submitForm = async (req, res) => {
  const { agencyId, templateId, propertyId, formData } = req.body;

  if (!agencyId || !templateId || !propertyId || !formData) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newFormSubmission = await prisma.formSubmission.create({
      data: {
        agency: { connect: { id: agencyId } },
        template: { connect: { id: templateId } },
        property: { connect: { id: propertyId } },
        data: formData,
      },
    });

    res.status(201).json(newFormSubmission);
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Internal server error' });
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
                    sendEmail
                  };