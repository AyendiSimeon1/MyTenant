import axios from 'axios';
import { useState, useEffect } from 'react';

interface Application {
    fullName: String,
    lastName: String
}


const ApprovedApplications = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {

        const fetchApplications = () => {
            
            try {
                const response = await axios.get('127.0.0.1:3000/applications/approved-applications');
                setApplications(response.data);
            } catch (error) {
                console.log(error);
            };
        }
        fetchApplications();
    } []);
    return (
        <h1>Approved Application</h1>
      
    );
};

export default ApprovedApplications;