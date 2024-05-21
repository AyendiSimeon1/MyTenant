const { PrismaClient } = require('@prisma/client');

const { createForm } = require('../crud/agent.crud');

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

module.exports = { createFormController };