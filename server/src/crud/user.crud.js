const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const getUser = async (id) => {
    const user = await prisma.User.findUnique({
        where : id
    });

    if(!user) {
        res.status(404).json({ message: 'User not found'});
    }

    return user;
}

const getAgentForms = async (agentId) => {
    try {
      const forms = await prisma.Form.findMany({
        where: { agentId },
    });
     console.log(forms);
      return forms;
    } catch (error) {
      console.error(error);
      
    }
    return forms;
};

const getDashboardData = async () => {
  try {
    const activeUsersCount = await prisma.User.count({ where: {isActive : true }});
    const recentApplications = await prisma.Form.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
    const recentPayements = await prisma.Payment.findMany({ orderBy: { createdAt: 'desc'}, take: 5});
    return activeUsersCount, recentApplications, recentPayements;
  } catch(errror) {
    console.log(error)
  }
}

module.exports = { getUser, getAgentForms }