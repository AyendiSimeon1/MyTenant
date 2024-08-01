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

        const allApprovedApplications = await Application.find({ applicationStatus: 'Approved' });
        res.status(200).json({
            message: 'All Approved applications',
            application: allApprovedApplications,
            count: allApprovedApplications.length
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error
        })
    }
};


const rejectedApplications = async (req, res) => {
    try {
        const rejectedApplications = await Application.find({ applicationStatus: 'Rejected' });
        res.json({
          message: 'All rejected applications',
          count: rejectedApplications.length,
          applications: rejectedApplications
        });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching rejected applications' });
      } 
}

const paidApplications = async (req, res) => {
    try {
        const paidApplicationIds = await Payment.distinct('applicationId', { status: 'completed' });
        const paidApplications = await Application.find({ _id: { $in: paidApplicationIds } });
        
        res.json({
          message: 'All applications with successful payments',
          count: paidApplications.length,
          applications: paidApplications
        });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching paid applications' });
      };
};

module.exports = { updateApplication };