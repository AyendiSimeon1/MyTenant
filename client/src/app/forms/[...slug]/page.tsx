"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from 'react-modal';
import { useUser } from '../../../userContext';

interface Field {
  [key: string]: any;
}

interface Template {
  name: string;
  fields: Field;
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const templateId = searchParams ? searchParams.get('templateId') || '' : '';
  const url = `http://127.0.0.1:3001/api/v1/agents/templates/${templateId}`;

  useEffect(() => {
    logContextData();

    const fetchTemplate = async () => {
      try {
        const response = await axios.get<Template>(url);
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
  }, [templateId, logContextData, url]);

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
      agencyId: searchParams ? searchParams.get('agencyId') || '' : '',
      templateId,
      propertyId: searchParams ? searchParams.get('propertyId') || '' : '',
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

      // Show the modal upon successful submission
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
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
      <h1 className="text-3xl font-bold mb-6">Submit Form</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
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
  );
};

export default SubmitForm;
