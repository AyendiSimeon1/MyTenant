"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '../../../userContext';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';
import { FiMail, FiLock } from 'react-icons/fi';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, setAgency } = useUser();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/auth/login', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('User logged in successfully:', response.data);
      setUser(response.data.user);
      setAgency(response.data.agency);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push(response.data.user.hasAgencyProfile ? '/dashboard' : '/profile');
      }
    } catch (err: any) {
      console.error('Error logging in:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="z-10 w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl overflow-hidden p-10 space-y-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-2">Login</h2>
            <p className="text-gray-500 text-xl">Access your account</p>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="text-xl font-medium text-gray-700 block mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-lg text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-xl font-medium text-gray-700 block mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-lg text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                  required
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg text-2xl font-semibold text-white bg-[#FFDAB9] hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            disabled={loading}
          >
            {loading ? <ClipLoader size={24} color={"#ffffff"} /> : "Login"}
          </button>

          {/* <div className="text-center mt-4">
            <p className="text-gray-500 text-lg">
              Don't have an account
              <Link href="/signup" className="text-orange-500 hover:underline">
                Signup
              </Link>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;