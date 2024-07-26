"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DashboardHeader from '../components/dashboard/dashboardHeader';
import AllProperties from '../components/dashboard/allProperties';
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

  function getFormattedDate() {
    const date = new Date();
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  
    const weekday = weekdays[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    const generatedDate =  `${weekday}, ${day} ${month} ${year}`;
    return generatedDate;
  }
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
    <div className="min-h-screen bg-gray-100  pt-8 mx-5">
      <div className='flex px-5 border-b-2'>
        <h1 className='font-bold text-xl'>MyTenant</h1>
          
          </div>
      <div className='px-5 pt-5'>
      
        <h1 className='font-bold'>{getFormattedDate()}</h1>
        <h1 className='font-bold'>Welcome Back,</h1>
        <p className='text-slate'>This is property portfolio report</p>
          <div className='flex justify-between pt-4'>
            <div className='border-2 border-current p-10  m-2 rounded-lg'>
              <p>Total Applications</p>
              <p className='font-bold'>101</p>
            </div>
            <div className='border-2 border-current m-2 p-10 rounded-lg'>
              <p>Reviewed Applications</p>
              <p className='font-bold'>180</p>
            </div>
            <div className='border-2 border-current m-2 p-10 rounded-lg'>
              <p>Pending Inspection</p>
              <p className='font-bold'>13</p>
            </div>
            <div className='border-2 border-current m-2 p-10 rounded-lg'>
              <p>Total Tenats</p>
              <p className="font-bold">10</p>
            </div>
          </div>
          <div className="mt-4 font-weight-medium">
          <ul className="flex justify-between space-x-4 border-b-2">
              <li>
                <a href="#home" className="text-gray-800 flex items-center">
                  <i className="fas fa-home mr-2"></i>
                  All Properties
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-800 flex items-center">
                  <i className="fas fa-file-alt mr-2"></i>
                  Applications
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-800 flex items-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  Approved Applications
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-800 flex items-center">
                  <i className="fas fa-times-circle mr-2"></i>
                  Rejected Applications
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-800 flex items-center">
                  <i className="fas fa-money-check-alt mr-2"></i>
                  Successful Payment
                </a>
              </li>
            </ul>
          </div>
      </div>
      <AllProperties />
     
      {/* <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}
      {/* <div className={`flex flex-col flex-grow transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
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
      </div> */}
    </div>
  );
};

export default Dashboard;
