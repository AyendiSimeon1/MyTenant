import { useState, useEffet } from 'react';
import { useRouter } from 'next/router';
import axois from 'axios';

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
      {applictions.map((application) => (
        <div key={application._id}>
          <h2>{application.name}</h2>
          <p>{application.email}</p>
          )}
          
      <div>
        )
  };
export default allApplications;