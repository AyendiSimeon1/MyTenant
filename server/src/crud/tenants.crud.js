const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const getTenantById = async (id) => {
    return await prisma.user.findUnique({ where: { id } });
  };

  const submitApplication = async (applicationId, submissionData) => {
    return await prisma.submittedApplication.create({
      data: {
        ...submissionData,
        applicationId,
      },
    });
  };
  
  const updateApplicationIdDocument = async (tenantId, idDocument) => {
    return await prisma.application.update({
      where: { tenantId },
      data: { idDocument },
    });
  };

  const createPayment = async (tenantId, amount) => {
    return await prisma.payment.create({
      data: {
        tenantId,
        amount,
        status: 'completed',
      },
    });
  };
  const updateApplicationStatus = async (id, status) => {
    return await prisma.application.update({
      where: { id },
      data: { status },
    });
  };
  
  module.exports = { submitApplication, getTenantById }