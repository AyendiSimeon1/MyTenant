"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUser } from '../../../../userContext';

interface FormSubmissionData {
  agencyId: string;
  templateId: string;
  propertyId: string;
  formData: { [key: string]: string }; // Adjust this according to your form fields
}

const SubmitForm: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const { user, logContextData } = useUser();

  const [formData, setFormData] = useState<FormSubmissionData['formData']>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Initialize formData with empty strings for each expected field
    // Replace these with actual form fields
    setFormData({
      name: '',
      email: '',
      // add other form fields here
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { agencyId, templateId, propertyId } = query;

    if (!agencyId || !templateId || !propertyId) {
      setError('Missing required parameters');
      setLoading(false);
      return;
    }

    const submissionData: FormSubmissionData = {
      agencyId: agencyId as string,
      templateId: templateId as string,
      propertyId: propertyId as string,
      formData,
    };

    console.log('Submitting form with data:', submissionData); // Log formData

    try {
      const response = await axios.post('http://localhost:3001/api/v1/form-submissions', submissionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response); // Log response
      alert('Form submitted successfully');
      router.push('/thank-you');
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-8 max-w-lg mx-auto p-10 bg-white shadow-2xl rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Submit Form</h1>

        <div className="flex flex-col relative">
          <label htmlFor="name" className="mb-3 text-xl font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="email" className="mb-3 text-xl font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        {/* Add more form fields as needed */}

        <button
          type="submit"
          className={`w-full bg-orange text-white px-6 py-2 rounded-lg text-2xl font-semibold transition duration-200 shadow-lg hover:shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="loader mr-2"></div>
              Submitting...
            </div>
          ) : (
            'Submit'
          )}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
      <button onClick={logContextData} className="bg-blue-500 text-white px-4 py-2 rounded">Log Context Data</button>
    </div>
  );
};

export default SubmitForm;
