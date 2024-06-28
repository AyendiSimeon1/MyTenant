"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from 'react-modal';
import { useUser } from '../../../userContext';
import Image from 'next/image';

interface Field {
  [key: string]: any;
}

interface Template {
  name: string;
  fields: Field;
}

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
}

interface Property {
  _id: string;
  address: string;
  type: string;
  price: number;
  image: string;
}

interface FormSubmissionData {
  agencyId: string;
  templateId: string;
  propertyId: string;
  formData: { [key: string]: string };
}

const SubmitForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logContextData } = useUser();

  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [template, setTemplate] = useState<Template | null>(null);
  const [agentData, setAgentData] = useState<Agent | null>(null);
  const [propertyData, setPropertyData] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const templateId = searchParams?.get('templateId') || '';
  const propertyId = searchParams?.get('propertyId') || '';
  const agencyId = searchParams?.get('agencyId') || '';

  const url = `http://127.0.0.1:3001/api/v1/agents/templates/${templateId}`;

  useEffect(() => {
    logContextData();

    const fetchTemplate = async () => {
      try {
        const [templateRes, agentRes, propertyRes] = await Promise.all([
          axios.get<Template>(url),
          axios.get(`http://127.0.0.1:3001/api/v1/agents/agent/${agencyId}`),
          axios.get(`http://127.0.0.1:3001/api/v1/agents/property/${propertyId}`)
        ]);
        setTemplate(templateRes.data);
        setAgentData(agentRes.data);
        setPropertyData(propertyRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    if (templateId) {
      fetchTemplate();
    } else {
      setError('Missing required parameters');
      setLoading(false);
    }
  }, [templateId, propertyId, agencyId, logContextData, url]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const submissionData: FormSubmissionData = {
      agencyId,
      templateId,
      propertyId,
      formData,
    };

    try {
      const response = await axios.post('http://127.0.0.1:3001/api/v1/agents/submit-form', submissionData);
      console.log('Form submitted successfully:', response.data);

      const uniqueLink = `http://127.0.0.1:3000/forms/reference/${response.data._id}`;
      console.log(uniqueLink);
      await axios.post('http://127.0.0.1:3001/api/v1/agents/send-sms', {
        phoneNumber: formData.referencePhoneNumber,
        messageContent: `Please complete your reference: ${uniqueLink}`,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
    }
  };

  const renderField = (field: Field, fieldName: string) => {
    if (typeof field === 'object' && field !== null) {
      return (
        <div key={fieldName} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {fieldName}
          </label>
          {Object.entries(field).map(([nestedFieldName, nestedFieldValue]) =>
            renderField(nestedFieldValue, nestedFieldName)
          )}
        </div>
      );
    } else {
      return (
        <div key={fieldName} className="mb-4">
          <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700">
            {fieldName}
          </label>
          <input
            type="text"
            id={fieldName}
            name={fieldName}
            value={formData[fieldName] || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">{template?.name || 'Submit Form'}</h1>
          
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          
          {agentData && (
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Agent Information</h2>
              <div className="flex items-center">
                <Image 
                  src={agentData.profileImage} 
                  alt={agentData.name} 
                  width={100} 
                  height={100} 
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Name: {agentData.name}</p>
                  <p>Email: {agentData.email}</p>
                  <p>Phone: {agentData.phone}</p>
                </div>
              </div>
            </div>
          )}
          
          {propertyData && (
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Property Information</h2>
              <div className="flex items-center">
                <Image 
                  src={propertyData.image} 
                  alt={propertyData.address} 
                  width={200} 
                  height={150} 
                  className="rounded-lg mr-4"
                />
                <div>
                  <p className="font-semibold">Address: {propertyData.address}</p>
                  <p>Type: {propertyData.type}</p>
                  <p>Price: ${propertyData.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {template && (
            <form onSubmit={handleSubmit}>
              {Object.entries(template.fields).map(([fieldName, fieldValue]) =>
                renderField(fieldValue, fieldName)
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="referencePhoneNumber" className="block text-sm font-medium text-gray-700">
                  Reference Phone Number
                </label>
                <input
                  type="tel"
                  id="referencePhoneNumber"
                  name="referencePhoneNumber"
                  value={formData.referencePhoneNumber || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  pattern="^\d{10}$"
                  title="Please enter a valid 10-digit phone number."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          )}

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Form Submission Success"
            className="flex items-center justify-center min-h-screen"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Form Submitted Successfully</h2>
              <p>Your form has been submitted successfully.</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;
