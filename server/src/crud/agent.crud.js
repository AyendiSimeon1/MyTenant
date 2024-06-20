const crypto = require('crypto');

const { v4: uuidv4 } = require('uuid');



const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;

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

const updateApplications = async (agentId, id, updateData) => {
  try {
    return await prisma.application.update({
      where: { agentId, id },
      data: updateData,
    });
  } catch (error) {
    throw new Error(`Update failed: ${error.message}`);
  }
};

const createFormLink = async (applicationId) => {
  try {
    const uniqueLinkId = uuidv4().slice(0, 6);
    const baseUrl = "127.0.0.1:3001/"
    const uniqueLink = `${baseUrl}/applications/${uniqueLinkId}/`; 
    const link = await prisma.application.update({
      where : { id: applicationId },
      data : { uniqueLink },
    });
    return link;
  } catch (error) {
    console.log(error);
  }
}

  const getApplicationById = async (id, agentId) => {
    return await prisma.Application.findFirst({
      where: { id: parseInt(id), agentId },
    });
  };

  const updateApplicationStatus = async (id, status) => {
    const agencyId = uuidv4(); 
    return await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });
  };


  const createAgency = async (data) => {
    const agencyId = uuidv4(); // Generate a unique ID
  
    const newData = {
      ...data,
      agencyId,
     
    };
  
    return await prisma.agency.create({
      data: newData,
    });
  };
  
module.exports = { createForm,
                     createFormLink, 
                     getApplicationById, 
                     updateApplicationStatus, 
                     getAllApplication,
                     updateApplications,
                     createAgency 
                    };