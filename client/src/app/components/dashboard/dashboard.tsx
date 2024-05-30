"use client";
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

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, agency } = useUser(); // Assuming useUser provides user and agency data
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex flex-col flex-grow transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader user={user} toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <div className="space-x-4">
              <Link href="/dashboard/create-property" passHref>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Property</button>
              </Link>
              <Link href="/dashboard/properties" passHref>
                <button className="bg-green-500 text-white px-4 py-2 rounded">All Properties</button>
              </Link>
              <LogoutButton />
            </div>
          </div>
          {agency && (
            <div className="mb-6 p-4 bg-white shadow rounded">
              <h2 className="text-2xl font-semibold">Agency Info</h2>
              <p><strong>Name:</strong> {agency.companyName}</p>
              <p><strong>ID:</strong> {agency.id}</p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Members onsite" value="26/88" icon="users" />
            <StatCard title="All Applications" value="4" icon="money-bill-alt" />
            <StatCard title="Approved applications" value="2" icon="envelope" />
            <StatCard title="Pending applications" value="6" icon="ticket-alt" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
