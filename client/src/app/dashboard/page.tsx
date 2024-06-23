"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DashboardHeader from '../components/dashboard/dashboardHeader';
import Sidebar from '../components/dashboard/sidebar';
import withAuth from '../components/authMiddleware';
import LogoutButton from '../components/auth/logoutButton';
import { useUser } from '../../userContext';
import Link from 'next/link';
import BookingCard from '../components/dashboard/bookingCard';
import SubmittedForm from '../components/dashboard/formComponent';

type Property = {
  _id: string;
  address: string;
  type: string;
  createdAt: string;
  agencyId: string;
  imageUrl: string; // Ensure this matches your actual data
};

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);

  const { user, agency } = useUser();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (agency && agency._id) {
      axios.get(`http://127.0.0.1:3001/api/v1/agents/properties/${agency._id}`)
        .then(response => {
          setProperties(response.data);
        })
        .catch(error => {
          console.error('Error fetching properties:', error);
        });
    }
  }, [agency]);

  console.log('Agency:', agency);

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
            </div>
          )}
          <div className="mt-6">
            <SubmittedForm />
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Properties</h2>
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(property => (
                  <BookingCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <p>No properties found for this agent.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
