"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '../../userContext';

interface FormSubmissionData {
  agencyId: string;
  templateId: string;
  propertyId: string;
  formData: { [key: string]: string }; // Adjust this according to your form fields
}

const SubmitForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logContextData } = useUser();

  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Log context data if needed
    logContextData();
  }, [logContextData]);

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
      templateId: searchParams.get('templateId') || '',
      propertyId: searchParams.get('propertyId') || '',
      formData,
    };

    try {
      const response = await axios.post('/api/submit-form', submissionData);
      console.log('Form submitted successfully:', response.data);
      // Redirect or handle success response
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="field1">Field 1:</label>
        <input
          type="text"
          id="field1"
          name="field1"
          value={formData.field1 || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="field2">Field 2:</label>
        <input
          type="text"
          id="field2"
          name="field2"
          value={formData.field2 || ''}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitForm;
