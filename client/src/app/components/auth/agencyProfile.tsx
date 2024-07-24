"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '../../../userContext';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { FiUser, FiMapPin, FiHome, FiMap, FiFlag, FiImage } from 'react-icons/fi';

interface AgencyFormData {
  agencyName: string;
  officeAddress: string;
  userId: string;
  profilePicture: File | null;
}

const AgencyProfileSetup: React.FC = () => {
  const router = useRouter();
  const { user, setAgency, logContextData } = useUser();

  const [formData, setFormData] = useState<AgencyFormData>({
    agencyName: '',
    officeAddress: '',
    userId: user?.id || '',
    profilePicture: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSubmit.append(key, value);
      }
    });

    try {
      const response = await axios.post('http://127.0.0.1:3001/api/v1/agents/profile', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAgency(response.data);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error setting up agency profile:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 px-8 sm:px-6 lg:px-8">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="z-10 w-full pt-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl overflow-hidden p-10 space-y-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-2">Setup Agency Profile</h2>
            <p className="text-gray-500 text-xl">Create your agency account</p>
          </div>
          
          <div className="space-y-6">
  <div className="relative">
    <label htmlFor="companyName" className="text-xl font-medium text-gray-700 block mb-2">Agency Name</label>
    <div className="relative">
      <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
      <input
        type="text"
        name="agencyName"
        id="agencyName"
        value={formData.agencyName}
        onChange={handleChange}
        className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-lg text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        required
      />
    </div>
  </div>

  <div className="flex space-x-4">
    <div className="relative flex-1">
      <label htmlFor="streetName" className="text-xl font-medium text-gray-700 block mb-2">Office Address</label>
      <div className="relative">
        <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          name="officeAddress"
          id="officeAddress"
          value={formData.officeAddress}
          onChange={handleChange}
          className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-lg text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          required
        />
      </div>
    </div>

          <div className="relative">
            <label htmlFor="profilePicture" className="text-xl font-medium text-gray-700 block mb-2">Logo</label>
            <div className="relative">
              <FiImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-lg text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>
        </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg text-2xl font-semibold text-white bg-[#FFDAB9] hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            disabled={loading}
          >
            {loading ? <ClipLoader size={24} color={"#ffffff"} /> : "Setup Agency"}
          </button>

          <div className="text-center mt-4">
            <Link href="/dashboard" className="text-orange-500 hover:underline text-lg">
              Go to dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default AgencyProfileSetup;