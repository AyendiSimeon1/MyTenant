"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../userContext';

interface Form {
  id: string;
  agencyId: string;
  templateId: number;
  propertyId: number;
  status: string;
  data: { [key: string]: any };
}

interface Reference {
  id: string;
  name: string;
  phone: string;
  email: string;
  contactInfo: string;
  relationship: string;
  additionalDetails: string;
  identityDocument: string;
}

const SubmittedForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [agencies, setAgencies] = useState<{ [key: string]: string }>({});
  const [templates, setTemplates] = useState<{ [key: number]: string }>({});
  const [properties, setProperties] = useState<{ [key: number]: string }>({});
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [referenceData, setReferenceData] = useState<Reference | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const { agency } = useUser(); 
  const agencyId = agency?._id;
  console.log(agencyId);

  useEffect(() => {
    fetchForms();
   
    fetchProperties();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/api/v1/agents/submited-forms`);
      const responseData = response.data;
      const extractedForms: Form[] = Object.values(responseData).map((form: any) => ({
        id: form._id,
        agencyId: form.agencyId,
        templateId: form.templateId,
        propertyId: form.propertyId,
        status: form.status,
        data: form.data,
      }));
      setForms(extractedForms);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

 
  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/api/v1/properties');
      const propertiesData = response.data;
      const propertyNames = propertiesData.reduce((acc: { [key: number]: string }, property: any) => {
        acc[property.id] = property.name;
        return acc;
      }, {});
      setProperties(propertyNames);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchFormWithReference = async (formId: string) => {
    if (!agency) {
      console.error('Agency not found in state');
      return;
    }
    
    try {
      const response = await axios.get(`http://127.0.0.1:3001/api/v1/agents/submited-forms`);
      const { formSubmission, referenceSubmission } = response.data;
      setSelectedForm(formSubmission);
      setReferenceData(referenceSubmission);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching form with reference:', error);
    }
  };

  const handleApprove = async (form: Form) => {
    try {
      await axios.post('http://127.0.0.1:3001/api/v1/agents/update-status', {
        formSubmissionId: form.id,
        status: 'approved'
      });
      fetchForms();
      closeModal();
    } catch (error) {
      console.error('Error approving form:', error);
    }
  };

  const handleReject = async (form: Form) => {
    try {
      await axios.post('http://127.0.0.1:3001/api/v1/agents/update-status', {
        formSubmissionId: form.id,
        status: 'rejected'
      });
      fetchForms();
      closeModal();
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  const handleSendEmail = async (form: Form) => {
    try {
      const userEmail = form.data.email;
      await axios.post('http://127.0.0.1:3001/api/v1/agents/send-approval-mail', {
        email: userEmail,
        formId: form.id,
        link: `http://127.0.0.1:3000/dashboard/initiate-payment`
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const openModal = (form: Form) => {
    fetchFormWithReference(form.id);
  };

  const closeModal = () => {
    setSelectedForm(null);
    setReferenceData(null);
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submitted Forms</h1>
      {/* <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Agency Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Template Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Property Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Status</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td className="py-2 px-4 border-b border-gray-200">{form.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{agencies[form.agencyId]}</td>
                <td className="py-2 px-4 border-b border-gray-200">{templates[form.templateId]}</td>
                <td className="py-2 px-4 border-b border-gray-200">{properties[form.propertyId]}</td>
                <td className="py-2 px-4 border-b border-gray-200">{form.status}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => openModal(form)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    View Details
                  </button>
                  {form.status === 'approved' && (
                    <button
                      onClick={() => handleSendEmail(form)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Send Email
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/* {selectedForm  (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Form Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition duration-150"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4 flex-grow overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {Object.entries(selectedForm.data).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                    <div className="bg-gray-50 px-3 py-2 rounded-md text-gray-900">{value}</div>
                  </div>
                ))}
                {Object.entries(referenceData).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                    <div className="bg-gray-50 px-3 py-2 rounded-md text-gray-900">{value}</div>
                  </div>
                ))} 
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => handleApprove(selectedForm)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(selectedForm)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150"
              >
                Reject
              </button>
            </div>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default SubmittedForms;
