"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/admin/dashboardLayout';
import UserTable from '../components/admin/userTable';
import PropertyTable from '../components/admin/propertyTable';
import PaymentTable from '../components/admin/paymentTable';
import FormSubmissionTable from '../components/admin/formSubmission';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('users'); // Default to users section
  const [usersData, setUsersData] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);
  const [formSubmissionsData, setFormSubmissionsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        switch (activeSection) {
          case 'users':
            response = await axios.get('http://127.0.0.1:3001/api/v1/agents/users');
            setUsersData(response.data);
            break;
          case 'properties':
            response = await axios.get('http://127.0.0.1:3001/api/v1/agents/properties');
            setPropertiesData(response.data);
            break;
          case 'payments':
            response = await axios.get('http://127.0.0.1:3001/api/v1/agents/all-payments');
            setPaymentsData(response.data);
            break;
          case 'form-submissions':
            response = await axios.get('http://127.0.0.1:3001/api/v1/agents/submited-forms');
            setFormSubmissionsData(response.data);
            break;
          default:
            throw new Error('Unknown section');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSection]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto mt-10">
        <div className="flex space-x-4">
          <button
            onClick={() => handleSectionChange('users')}
            className={`px-4 py-2 rounded ${
              activeSection === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => handleSectionChange('properties')}
            className={`px-4 py-2 rounded ${
              activeSection === 'properties' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => handleSectionChange('payments')}
            className={`px-4 py-2 rounded ${
              activeSection === 'payments' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => handleSectionChange('form-submissions')}
            className={`px-4 py-2 rounded ${
              activeSection === 'form-submissions' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Form Submissions
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {activeSection === 'users' && <UserTable users={usersData} />}
        {activeSection === 'properties' && <PropertyTable properties={propertiesData} />}
        {activeSection === 'payments' && <PaymentTable payments={paymentsData} />}
        {activeSection === 'form-submissions' && <FormSubmissionTable formSubmissions={formSubmissionsData} />}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
