import React, {useState, useEffect } from 'react';
import axios from 'axios';

interface Application {

}

const Applications = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        
        const fetchApplication = async () => {
            try {
                const agentId = '667448bb3468267bcb6c033b';
                const url = `http://127.0.0.1:3001/api/v1/agents/get-agents-applications/${agentId}`;
                const response = await axios.get(url);
                setApplications(response.data);

            } catch (error) {
                console.log(error);
    
            }
        }
        fetchApplication();
    });
    return (
        <div>
            <h1>All Applications</h1>

            {/* {applications.map((application, index) => {
                <div key={index}> 
                    <h1>{application.title}</h1>
                </div>
            })}; */}
        </div>
    )
}

export default Applications;