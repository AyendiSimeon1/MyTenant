"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardHeader from '../components/dashboard/dashboardHeader';
import StatCard from '../components/dashboard/statCard';
import Sidebar from '../components/dashboard/sidebar';

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex flex-col flex-grow transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader user={user} toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Members onsite" value="26/88" icon="users" />
            <StatCard title="All Applications" value="4" icon="money-bill-alt" />
            <StatCard title="Approved applications" value="2" icon="envelope" />
            <StatCard title="Pending applications" value="6" icon="ticket-alt" />
          </div>
          {/* Additional sections such as bookings, events, discussions can be added here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
