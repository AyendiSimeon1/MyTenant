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

const getAgencyProfileByUserId = async (userId) => {
  try {
    const agencyProfile = await prisma.agency.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!agencyProfile) {
      throw new Error('Agency profile not found');
    }

    return agencyProfile;
  } catch (error) {
    console.error('Error fetching agency profile:', error);
    throw error;
  }
};

module.exports = {
    getForms,
    getPayments,
    getApplications,
    getSuccessfulTenanciesReport,
    getAgencyProfileByUserId
};