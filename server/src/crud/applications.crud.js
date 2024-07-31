const { Application } = require('../models/user.models');

const updateApplicationStatus = async (applicationId, newStatus) => {
    const application = await Application.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    };

    if (application.applicationStatus !== 'Pending') {
        throw new Error('Only Pending applications can be updated');
    }

    application.applicationStatus = newStatus;
    application.createdAt = new Date();
    await application.save();

    return application
};

const approvedApplications = async (applicationId, status) => {
    const application = await Application.findById(applicationId);
    if (!application)  {
        throw new Error('Application not found');
    }

    application.appliactionStatus.find(status);
    return application;
};

module.exports = { updateApplicationStatus, approvedApplications }