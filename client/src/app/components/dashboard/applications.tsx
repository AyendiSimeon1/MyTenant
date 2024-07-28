import React, {useState, useEffect } from 'react';
import axios from 'axios';

interface Application {

}

const Applications = () => {
    const [application, setApplication] = useState<Application[]>([]);

    useEffect(() => {
        
        const fetchApplication = async () => {
            try {
                const url = "https://127.0.0.1:3001/api/v1/agents/properties";
                const response = await axios.get(url);
                setApplication(response.data)
    
            } catch (error) {
                console.log(error);
    
            }
        }
    });
    return (
        <div>
            
        </div>
    )
}

export default Applications;