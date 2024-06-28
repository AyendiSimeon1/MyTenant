import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DashboardHeader from './dashboardHeader';
import StatCard from './statCard';
import Sidebar from './sidebar';
import withAuth from '../authMiddleware';
import LogoutButton from '../auth/logoutButton';
import { useUser } from '../../../userContext';
import Link from 'next/link';
import SubmittedForms from './formComponent';
import BookingCard from './bookingCard';

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [applications, setApplications] = useState([]);
  const { user, agency } = useUser(); 
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // router.push('/login');
    } else {
      // fetchApplications();
    }
  }, [router]);

  // const fetchApplications = async () => {
  //   try {
  //     const response = await axios.get(`/api/applications/${agency?.id}`);
  //     setApplications(response.data);
  //   } catch (error) {
  //     console.error('Error fetching applications', error);
  //   }
  // };

  return (
    <h1>Hello World</h1>
  );
};

export default withAuth(Dashboard);
