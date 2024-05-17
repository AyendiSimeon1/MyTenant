const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient
const createForm = async (formData) => {
    const { 
        agent,
        agencyLogo,
        agentName,
        agentEmail,
        tenantName,
        tenantEmail,
        tenantPhone,
        propertyAddress,
        leaseStartDate,
        leaseEndDate,
        fields
      } = formData;

    const form = await prisma.form.create({
        data: {
            agent,
            agencyLogo,
            agentName,
            agentEmail,
            tenantName,
            tenantEmail,
            tenantPhone,
            propertyAddress,
            leaseStartDate: leaseStartDate ? new Date(leaseStartDate) : null,
            leaseEndDate: leaseEndDate ? new Date(leaseEndDate) : null,
            fields,
          },

    });

    return form;
}

const getForm = async (formId) => {
    try {
        const form = await prisma.Form.findUnique({
          where: {
            formId,
          },
        });
    
        if (!form) {
          return res.status(404).json({ error: 'Form not found' });
        }
    
        res.json({ form });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const responseForm = async (formId, formData) =>{
    const { response } = formData;
    try {
        
        const form = await prisma.Form.findUnique({
            where: {
            formId,
            },
        });
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        const formResponse = await prisma.FormResponse.create({
            data: {
            formId: form.id,
            response: response,
            },
        });
        return formResponse;

   
    } catch (error){
        console.error(error);
    }
};

module.exports = { createForm, getForm, responseForm };