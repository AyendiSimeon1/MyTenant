"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

interface FormData {
  name: string;
  phone: string;
  email: string;
  contactInfo: string;
  relationship: string;
  additionalDetails: string;
  identityDocument: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  contactInfo: '',
  relationship: '',
  additionalDetails: '',
  identityDocument: ''
};

const ReferenceForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    if (searchParams) {
      const idFromParams = searchParams.get('id') || '';
      setId(idFromParams);
      console.log('This is the template id', idFromParams);
    }
  }, [searchParams]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:3001/api/v1/agents/submit-reference', {
        id,
        ...formData
      });

      if (res.status === 201) {
        alert('Reference submitted successfully');
      } else {
        alert('Error submitting reference');
      }
    } catch (error) {
      alert('Error submitting reference');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Reference Form</h1>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={formData.name}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        value={formData.phone}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        value={formData.email}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        name="contactInfo"
        placeholder="Contact Info"
        onChange={handleChange}
        value={formData.contactInfo}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        name="relationship"
        placeholder="Relationship to Tenant"
        onChange={handleChange}
        value={formData.relationship}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <textarea
        name="additionalDetails"
        placeholder="Additional Details"
        onChange={handleChange}
        value={formData.additionalDetails}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        name="identityDocument"
        placeholder="Identity Document"
        onChange={handleChange}
        value={formData.identityDocument}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
}

export default ReferenceForm;
