import { useState, useEffect } from 'react';
import axios from 'axios';

const RejectedApplications = () => {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const fetchApplications = async () => {
            
            try {
                url = '127.0.0.1:3000/applications/rejected-applications';
                const response = await axios.get(url);
                setApplications(response.data);
            } catch (error) {
                console.log(error);
            };
        }
    });
    return (
        <h1>Rejected Applications</h1>
      
      
    );
};

export default RejectedApplications;
