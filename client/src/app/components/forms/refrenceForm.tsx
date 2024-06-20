"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
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
  const formSubmissionId = searchParams?.get('formSubmissionId'); // Use optional chaining to get the query parameter
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formSubmissionId) {
      alert('Missing formSubmissionId');
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:3001/api/v1/agents/submit-reference', {
        formSubmissionId,
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
    <form onSubmit={handleSubmit}>
      <h1>Reference Form</h1>
      <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} value={formData.email} required />
      <input name="contactInfo" placeholder="Contact Info" onChange={handleChange} value={formData.contactInfo} required />
      <input name="relationship" placeholder="Relationship to Tenant" onChange={handleChange} value={formData.relationship} required />
      <textarea name="additionalDetails" placeholder="Additional Details" onChange={handleChange} value={formData.additionalDetails} />
      <input name="identityDocument" placeholder="Identity Document" onChange={handleChange} value={formData.identityDocument} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReferenceForm;
