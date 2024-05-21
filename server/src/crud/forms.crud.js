const { PrismaClient } = require("@prisma/client");
const mailgun = require('mailgun-js');

const prisma = new PrismaClient
const createForm = async (formData) => {
    const { 
        agent,
        agencyLogo,
        agentName,
        agentEmail,
        tenantName,
        tenantEmail,
        tenantPhone,
        propertyAddress,
        leaseStartDate,
        leaseEndDate,
        fields
      } = formData;

    const form = await prisma.form.create({
        data: {
            agent,
            agencyLogo,
            agentName,
            agentEmail,
            tenantName,
            tenantEmail,
            tenantPhone,
            propertyAddress,
            leaseStartDate: leaseStartDate ? new Date(leaseStartDate) : null,
            leaseEndDate: leaseEndDate ? new Date(leaseEndDate) : null,
            fields,
          },

    });

    return form;
}

const getForm = async (formId) => {
    try {
        const form = await prisma.Form.findUnique({
          where: {
            formId,
          },
        });
        return form;
      } catch (error) {
        console.log(error);
      }
      
}

const responseForm = async (formId, formData) =>{
    const { response } = formData;
    try {
        
        const form = await prisma.Form.findUnique({
            where: {
            formId,
            },
        });
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        const formResponse = await prisma.FormResponse.create({
            data: {
            formId: form.id,
            response: response,
            },
        });
        return formResponse;

   
    } catch (error){
        console.error(error);
    }
};

const addRefrence = async (formData) => {
  const { firstName, lastName, email, phoneNumber, occupation, relationToTenant } = formData;
  const createRefrence = await prisma.reference.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNumber,
      occupation,
      relationToTenant
    }

  });

  await sendEmailNotification(email, createRefrence);

  return createRefrence;

  

}

const sendEmailNotification = async (recipientEmail, createdReference) => {
  // Replace with your actual Mailgun API key and domain
  const mg = mailgun.createClient({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });

  // Craft the email content (same as in previous response)
  const emailContent = `
    <h2>Reference Request for ${createdReference.tenantName} (if applicable)</h2>
    <p>Dear ${recipientEmail},</p>
    <p>You have been added as a reference for (if applicable) on our platform.</p>
    <p>We may contact you soon to verify your relationship with ${createdReference.tenantName} and gather your feedback.</p>
    <p>Thank you for your time and cooperation.</p>
    <p>Sincerely,</p>
    <p>Your Platform Name Team</p>
  `;

  // Define the email message data
  const mailData = {
    from: 'Your Platform Name <your_email@example.com>', 
    to: recipientEmail,
    subject: 'Reference Request for Tenant Application',
    html: emailContent 
  };

  // Send the email using Mailgun API
  try {
    const response = await mg.messages().send(mailData);
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);

  }
};


const referenceForm =  async (req, res) => {
  const { firstName, lastName, email, phoneNumber, occupation, relationToTenant } = req.body;
  const { tenantId } = req.user; // Assuming tenant ID is obtained from authenticated user

  // Additional validation for tenant ID (e.g., ensure user has permission to add references)

  try {
    const referenceId = generateUniqueReferenceId();
    const verificationLink = generateVerificationLink(referenceId, tenantId);

    const createRefrence = await prisma.reference.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        occupation,
        relationToTenant,
        referenceId,
        tenantId // Link the reference to the tenant
      }
    });

    // Send email notification with the verification link (replace with actual logic)
    console.log(`Sending email notification with verification link: ${verificationLink}`);

    res.json({ message: 'Reference created successfully', verificationLink });
  } catch (error) {
    console.error('Error creating reference:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createForm, getForm, responseForm, addRefrence };