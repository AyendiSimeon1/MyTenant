"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../../userContext';

interface PropertyFormData {
  address: string;
  type: string;
  agencyId: string;
}

const AddProperty: React.FC = () => {
  const router = useRouter();
  const { agency, user, logContextData } = useUser();

  const [formData, setFormData] = useState<PropertyFormData>({
    address: '',
    type: '',
    agencyId: '9c1def9a-e406-4041-ad01-a1b1baf8e688',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Submitting form with data:', formData); // Log formData

    try {
      const response = await axios.post('http://localhost:3001/api/v1/agents/create-property', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response); // Log response
      alert('Property added successfully');
      router.push('/properties');
    } catch (err: any) {
      console.error('Error adding property:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-8 max-w-lg mx-auto p-10 bg-white shadow-2xl rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Add New Property</h1>

        <div className="flex flex-col relative">
          <label htmlFor="address" className="mb-3 text-xl font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="type" className="mb-3 text-xl font-medium text-gray-700">
            Property Type
          </label>
          <input
            type="text"
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-orange text-white px-6 py-2 rounded-lg text-2xl font-semibold transition duration-200 shadow-lg hover:shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="loader mr-2"></div>
              Adding...
            </div>
          ) : (
            'Add Property'
          )}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
      <button onClick={logContextData} className="bg-blue-500 text-white px-4 py-2 rounded">Log Context Data</button>
    </div>
  );
};

export default AddProperty;
