"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AgencyFormData {
  companyName: string;
  logo: File | null;
  streetName: string;
  area: string;
  lga: string;
  state: string;
}

const AgencyProfileSetup: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<AgencyFormData>({
    companyName: '',
    logo: null,
    streetName: '',
    area: '',
    lga: '',
    state: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, logo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('companyName', formData.companyName);
    if (formData.logo) {
      formDataToSend.append('logo', formData.logo);
    }
    formDataToSend.append('streetName', formData.streetName);
    formDataToSend.append('area', formData.area);
    formDataToSend.append('lga', formData.lga);
    formDataToSend.append('state', formData.state);

    try {
      const response = await axios.post('/api/agency/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Agency profile setup successfully:', response.data);
      router.push('/dashboard'); // Redirect to dashboard or next step
    } catch (err: any) {
      console.error('Error setting up agency profile:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <label htmlFor="logo" className="mb-3 text-xl font-medium text-gray-700">
          Logo
        </label>
        <input
          type="file"
          name="logo"
          id="logo"
          onChange={handleFileChange}
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
          {/* Add your LGA options here */}
          <option value="LGA1">LGA1</option>
          <option value="LGA2">LGA2</option>
          {/* More LGAs */}
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
          {/* Add your state options here */}
          <option value="State1">State1</option>
          <option value="State2">State2</option>
          {/* More states */}
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
  );
};

export default AgencyProfileSetup;
