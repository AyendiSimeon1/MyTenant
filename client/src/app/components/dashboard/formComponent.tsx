import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

interface Form {
  id: string;
  agencyId: string;
  templateId: number;
  propertyId: number;
  status: string;
  data: { [key: string]: any }; // Assuming data is JSON and will contain form details
}

const SubmittedForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get<Form[]>('http://127.0.0.1:3001/api/v1/agents/submited-forms');
      setForms(response.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
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

  const openModal = (form: Form) => {
    setSelectedForm(form);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedForm(null);
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submitted Forms</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Agency ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Template ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Property ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Status</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td className="py-2 px-4 border-b border-gray-200">{form.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{form.agencyId}</td>
                <td className="py-2 px-4 border-b border-gray-200">{form.templateId}</td>
                <td className="py-2 px-4 border-b border-gray-200">{form.propertyId}</td>
                <td className="py-2 px-4 border-b border-gray-200">{form.status}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => openModal(form)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedForm && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Form Details</h2>
          <div className="mb-4">
            {Object.entries(selectedForm.data).map(([key, value]) => (
              <div key={key} className="mb-2">
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
          <button
            onClick={() => handleApprove(selectedForm)}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(selectedForm)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </Modal>
      )}
    </div>
  );
};

export default SubmittedForms;
