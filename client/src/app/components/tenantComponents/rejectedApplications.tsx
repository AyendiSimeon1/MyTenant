import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const allApplications = async () => { 

  const router = useRouter();
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
      const response = await axios.get('/api/applications');
      setApplications(response.data);
    };
    fetchApplications();
  })
  return (
    <div>
      <h1>All Applications</h1>
  

      </div>
        )
  };
export default allApplications;