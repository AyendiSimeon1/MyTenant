"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AllProperties from '../components/dashboard/allProperties';
import Applications from '../components/dashboard/applications';
import RejectedApplications from '../components/dashboard/RejectedApplications';
import SuccessfulPayments from '../components/dashboard/SuccessfulPayments';
import PendingInspections from '../components/dashboard/pendingInspections';
import ApprovedApplications from '../components/dashboard/approvedApplications';
import withAuth from '../components/authMiddleware';
import { useUser } from '../../userContext';
import Link from 'next/link';
import SubmittedForm from '../components/dashboard/formComponent';


type Property = {
  _id: string;
  address: string;
  type: string;
  createdAt: string;
  agencyId: string;
  imageUrl: string;
};

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeComponent, setActiveComponent] = useState('all-properties');

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
  
    return `${weekday}, ${day} ${month} ${year}`;
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

  const renderComponent = () => {
    switch (activeComponent) {
      case 'all-properties':
        return <AllProperties />;
      case 'applications':
        return <Applications />;
      case 'approved-applications':
        return <ApprovedApplications />;
      case 'rejected-applications':
        return <RejectedApplications />;
      case 'successful-payments':
        return <SuccessfulPayments />;
      case 'pending-inspections':
        return <PendingInspections />;
     
      default:
        return <AllProperties />;
    }
  };

  console.log('Agency:', agency);

  return (
    <div className="min-h-screen bg-gray-100 pt-8 mx-5">
      <div className='flex px-5 border-b-2'>
        <h1 className='font-bold text-xl'>MyTenant</h1>
      </div>
      <div className='px-5 pt-5'>
        <h1 className='font-bold'>{getFormattedDate()}</h1>
        <h1 className='font-bold'>Welcome Back,</h1>
        <p className='text-slate'>This is property portfolio report</p>
        <div className='flex justify-between pt-4'>
          <div className='border-2 border-current p-10 m-2 rounded-lg' onClick={() => setActiveComponent('applications')}>
            <p>Total Applications</p>
            <p className='font-bold'>101</p>
          </div>
          <div className='border-2 border-current m-2 p-10 rounded-lg' onClick={() => setActiveComponent('approved-applications')}>
            <p>Reviewed Applications</p>
            <p className='font-bold'>180</p>
          </div>
          <div className='border-2 border-current m-2 p-10 rounded-lg' onClick={() => setActiveComponent('pending-inspections')}>
            <p>Pending Inspection</p>
            <p className='font-bold'>13</p>
          </div>
          <div className='border-2 border-current m-2 p-10 rounded-lg' onClick={() => setActiveComponent('total-tenants')}>
            <p>Total Tenants</p>
            <p className="font-bold">10</p>
          </div>
        </div>
        <div className="mt-4 font-weight-medium">
          <ul className="flex justify-between space-x-4 border-b-2">
            <li onClick={() => setActiveComponent('all-properties')}>
              <a href="#" className="text-gray-800 flex items-center">
                <i className="fas fa-home mr-2"></i>
                All Properties
              </a>
            </li>
            <li onClick={() => setActiveComponent('applications')}>
              <a href="#" className="text-gray-800 flex items-center">
                <i className="fas fa-file-alt mr-2"></i>
                Applications
              </a>
            </li>
            <li onClick={() => setActiveComponent('approved-applications')}>
              <a href="#" className="text-gray-800 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                Approved Applications
              </a>
            </li>
            <li onClick={() => setActiveComponent('rejected-applications')}>
              <a href="#" className="text-gray-800 flex items-center">
                <i className="fas fa-times-circle mr-2"></i>
                Rejected Applications
              </a>
            </li>
            <li onClick={() => setActiveComponent('successful-payments')}>
              <a href="#" className="text-gray-800 flex items-center">
                <i className="fas fa-money-check-alt mr-2"></i>
                Successful Payment
              </a>
            </li>
          </ul>
        </div>
      </div>
      {renderComponent()}
    </div>
  )};

  export default Dashboard;