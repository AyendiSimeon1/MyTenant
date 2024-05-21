const crypto = require('crypto');



const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;

const uuid = crypto.randomUUID();
console.log(uuid);

const createForm = async ( title, logoUrl, status, propertyAddress, leaseStartDate, leaseEndDate, fields) => {
  try {
    const application = await prisma.Application.create({
      data: {
        id: uuid,  
        title,
        logoUrl,
        status,
        propertyAddress,
        leaseStartDate,
        leaseEndDate,
        fields: JSON.stringify(fields),
      },
    });

    return application; 
  } catch (error) {
    console.error("Error creating application:", error);
    throw error; 
  }
};

  const createFormLink = async (formId) => {
    return await prisma.formLink.create({
      data: {
        formId,
        url: `http://your-domain.com/forms/${formId}/fill`,
      },
    });
  };

  const getApplicationById = async (id, agentId) => {
    return await prisma.application.findFirst({
      where: { id: parseInt(id), agentId },
    });
  };

  const updateApplicationStatus = async (id, status) => {
    return await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });
  };
  
  module.exports = { createForm, createFormLink, getApplicationById, updateApplicationStatus };