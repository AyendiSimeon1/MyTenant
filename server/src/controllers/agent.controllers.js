const { PrismaClient } = require('@prisma/client');

const { createForm, 
        getAllApplication, 
        updateApplications, 
        updateApplicationStatus,
        createFormLink 
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
  const userId = req.user.id; 
  if (!userId || !req.body.companyName || !req.body.streetName || !req.body.area || !req.body.lga || !req.body.state) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { companyName, logo, streetName, area, lga, state } = req.body;

    const data = {
      companyName,
      logo,
      streetName,
      area,
      lga,
      state,
      userId 
    };

    const newAgency = await agencyService.createAgency(data);
    res.status(201).json(newAgency);
  } catch (error) {
    console.error('Error creating agency profile:', error);

    // Provide more specific error messages if possible
    if (error.message.includes('data type mismatch')) {
      return res.status(400).json({ message: 'Data type mismatch between userId and agencyId (if applicable)' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = { createFormController, 
                    getApplicationByIdController, 
                    getAllApplications, 
                    updateApplication,
                    generateLink,
                    createAgencyProfile
                  };