"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '../../../userContext';
import Link from 'next/link';

interface AgencyFormData {
  companyName: string;
  streetName: string;
  area: string;
  lga: string;
  state: string;
  userId: string;
}

const AgencyProfileSetup: React.FC = () => {
  const router = useRouter();
  const { user, setAgency, logContextData } = useUser();

  useEffect(() => {
    if (user) {
      console.log('I am the user id', user.id);
    }
  }, [user]);

  const [formData, setFormData] = useState<AgencyFormData>({
    companyName: '',
    streetName: '',
    area: '',
    lga: '',
    state: '',
    userId: user?.id || '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      console.log('User context updated:', user);
      setFormData((prevData) => ({
        ...prevData,
        userId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Form data being submitted:', formData);

    try {
      const response = await axios.post('http://127.0.0.1:3001/api/v1/agents/profile', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAgency(response.data);
      console.log('Agency profile setup successfully:', response.data);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error setting up agency profile:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-8 max-w-lg mx-auto p-10 bg-white shadow-2xl rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Setup Agency Profile</h1>

        <div className="flex flex-col relative">
          <label htmlFor="companyName" className="mb-3 text-xl font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="streetName" className="mb-3 text-xl font-medium text-gray-700">
            Street Name
          </label>
          <input
            type="text"
            name="streetName"
            id="streetName"
            value={formData.streetName}
            onChange={handleChange}
            className="shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="area" className="mb-3 text-xl font-medium text-gray-700">
            Area
          </label>
          <input
            type="text"
            name="area"
            id="area"
            value={formData.area}
            onChange={handleChange}
            className="shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="lga" className="mb-3 text-xl font-medium text-gray-700">
            LGA
          </label>
          <select
            name="lga"
            id="lga"
            value={formData.lga}
            onChange={handleChange}
            className="shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          >
            <option value="" disabled>Select LGA</option>
            <option value="LGA1">LGA1</option>
            <option value="LGA2">LGA2</option>
          </select>
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="state" className="mb-3 text-xl font-medium text-gray-700">
            State
          </label>
          <select
            name="state"
            id="state"
            value={formData.state}
            onChange={handleChange}
            className="shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          >
            <option value="" disabled>Select State</option>
            <option value="State1">State1</option>
            <option value="State2">State2</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full bg-orange text-white px-6 py-2 rounded-lg text-2xl font-semibold transition duration-200 shadow-lg hover:shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="loader mr-2"></div>
              Setting up...
            </div>
          ) : (
            'Setup Agency'
          )}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
      <p className="text-gray-500 text-lg">
        <Link href="/dashboard" className="text-orange-500 hover:underline">Go to dashboard</Link>
      </p>
      <button onClick={logContextData} className="bg-blue-500 text-white px-4 py-2 rounded">Log Context Data</button>
    </div>
  );
};

export default AgencyProfileSetup;
