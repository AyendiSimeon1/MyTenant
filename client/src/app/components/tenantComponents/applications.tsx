import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AllApplications = async () => { 

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
    <h1>Hello</h1>
        )
  };
export default AllApplications;