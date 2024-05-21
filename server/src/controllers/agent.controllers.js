const { PrismaClient } = require('@prisma/client');

const { createForm, getAllApplication, updateApplications, updateApplicationStatus } = require('../crud/agent.crud');
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
  

  const createFormLinkController = async (req, res) => {
    try {
      const { id } = req.params;
      const form = await prisma.form.findUnique({ where: { id: parseInt(id) } });
  
      if (!form || form.agentId !== req.user.id) return res.sendStatus(403);
  
      const formLink = await createFormLink(form.id);
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
    console.log([agentId, id]);
    const { title, logoUrl, status,propertyAddress, leaseStartDate, leaseEndDate,  fields } = req.body;

    
    const updatedApplication = await updateApplications(agentId, id, title, logoUrl, status,propertyAddress, leaseStartDate, leaseEndDate,  fields);
    if(!updatedApplication) {
      res.status(404).json({ message: 'Application not found' });

    }
    return updatedApplication;
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
}

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

module.exports = { createFormController, getApplicationByIdController, getAllApplications, updateApplication };