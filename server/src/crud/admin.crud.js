const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;

const getUserEngagementReport = async () => {
    return await prisma.user.groupBy({
      by: ['role'],
      _count: {
        id: true,
      },
    });
  };
  
const getSuccessfulTenanciesReport = async () => {
  return await prisma.application.findMany({
    where: { status: 'approved' },
   });
};
  
  const getPaymentTransactionReport = async () => {
    return await prisma.payment.findMany();
  };

const getForms = async () => {
    return await prisma.form.findMany({ orderBy: { createdAt: 'desc' } });
};

const getPayments = async () => {
    return await prisma.payment.findMany({ orderBy: { createdAt: 'desc' } });
};

const getApplications = async () => {
    return await prisma.application.findMany({
        orderBy: { createdAt: 'desc' }
    });
};

const getReferenceDetails = async (formId) => {
    const form = await prisma.form.findUnique({
        where: { id: parseInt(formId) },
        include: { references: true },
    });
    return form;
};

const updateApplicationStatus = async (applicationId, status) => {
    return await prisma.application.update({
        where: { id: parseInt(applicationId) },
        data: { status }
    });
};

module.exports = {
    getForms,
    getPayments,
    getApplications,
    getSuccessfulTenanciesReport
};