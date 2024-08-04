import axios from 'axios';
import { useState, useEffect } from 'react';

interface Application {
    fullName: String,
    lastName: String
}


const ApprovedApplications = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {

        const fetchApplications = async () => {
            const agentId = '494949';
            try {
                const response = await axios.get(`127.0.0.1:3001/applications/approved-applications/${agentId}`);
                setApplications(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApplications();
    });
    return (
        <h1>Approved Application</h1>
      
    );
};

export default ApprovedApplications;