const crypto = require('crypto');

const { v4: uuidv4 } = require('uuid');



const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;

// const uuid = crypto.randomUUID();


const createForm = async ( title, logoUrl, status, propertyAddress, leaseStartDate, leaseEndDate, fields) => {
  try {
    const application = await prisma.Application.create({
      data: {
        id: uuidv4(),  
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

const getAllApplication = async (agentId)  =>{
  return await prisma.Application.findMany({
    where: {
      agentId : { equals : agentId}
    }
  })
};

const updateApplications = async (agentId, id, title, logoUrl, status,propertyAddress, leaseStartDate, leaseEndDate,  fields ) => {
  return await prisma.Application.update({
      where : {  agentId, id },
      data: { 
        title,
        logoUrl,
        status,
        propertyAddress,
        leaseStartDate,
        leaseEndDate,
        fields: JSON.stringify(fields),
      }
  });
}
  const createFormLink = async (formId) => {
    return await prisma.formLink.create({
      data: {
        formId,
        url: `http://your-domain.com/forms/${formId}/fill`,
      },
    });
  };

  const getApplicationById = async (id, agentId) => {
    return await prisma.Application.findFirst({
      where: { id: parseInt(id), agentId },
    });
  };

  const updateApplicationStatus = async (id, status) => {
    return await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });
  };
  
  module.exports = { createForm,
                     createFormLink, 
                     getApplicationById, 
                     updateApplicationStatus, 
                     getAllApplication,
                     updateApplications 
                    };