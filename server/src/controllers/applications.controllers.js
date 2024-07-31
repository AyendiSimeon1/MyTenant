const { updateApplicationStatus, approvedApplications } = require('../crud/applications.crud');

const updateApplication = async (req, res) => {
    
    try {
        const { applicationId } = req.body;
        const { status } = req.body;

        const updatedApplication = await updateApplicationStatus(applicationId, status);
        res.status(201).json({
            message: 'The Application have been updated successfully',
            application: updatedApplication
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const approvedApplication = async (req, res) => {
    
    try {
        const { applicationId } = req.body;
        const { applicationStatus } = req.body;
        
        const allApprovedApplications = await approvedApplicaioins(applicationId, applicationStatus);
        res.status(200).json({
            message: 'All Approved applications',
            application: allApprovedApplications
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error
        })
    }
}



module.exports = { updateApplication };