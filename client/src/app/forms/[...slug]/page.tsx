"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '../../../userContext';

interface Template {
  id: number;
  name: string;
  fields: { name: string; type: string }[];
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
  const { user, logContextData } = useUser();

  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const templateId = searchParams.get('templateId') || '';
  console.log('This is the template id', templateId);
  const url = `http://127.0.0.1:3001/api/v1/agents/templates/${templateId}`;

  console.log('this is the url', url);

  useEffect(() => {
    logContextData();

    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/v1/agents/templates/${templateId}`);
        setTemplate(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching template:', error);
        setError('Failed to fetch template. Please try again later.');
        setLoading(false);
      }
    };

    if (templateId) {
      fetchTemplate();
    }
  }, [templateId, logContextData]);

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
      agencyId: searchParams.get('agencyId') || '',
      templateId,
      propertyId: searchParams.get('propertyId') || '',
      formData,
    };

    try {
      const response = await axios.post('http://127.0.0.1:3001/api/v1/agents/submit-form', submissionData);
      console.log('Form submitted successfully:', response.data);
      
      const uniqueLink = `http://127.0.0.1:3001/reference/form/${response.data.id}`;

      await axios.post('http://127.0.0.1:3001/api/v1/agents/send-sms', {
        phoneNumber: formData.referencePhoneNumber,
        messageContent: `Please complete your reference: ${uniqueLink}`,
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Submit Form</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {template && (
        <form onSubmit={handleSubmit}>
          {template.fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.name}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
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
     
    </div>
);
};

export default SubmitForm;

