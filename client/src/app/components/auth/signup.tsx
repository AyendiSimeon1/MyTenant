"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/signup', formData);
      console.log('User signed up successfully:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/login');
      }
    } catch (err: any) {
      console.error('Error signing up:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="z-10 w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg overflow-hidden relative z-10">
          <div className="px-10 py-12 sm:px-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">Sign Up</h1>
            <p className="text-gray-500 mb-8 text-xl">Get started with your account</p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="relative">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700 block mb-2">
                  First Name
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-12 py-3 shadow-sm block w-full sm:text-lg border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 block mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-12 py-3 shadow-sm block w-full sm:text-lg border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="relative sm:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                  Email
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-12 py-3 shadow-sm block w-full sm:text-lg border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="relative sm:col-span-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                  Password
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-12 py-3 shadow-sm block w-full sm:text-lg border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

            <div className="mt-8">
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loader mr-2"></div>
                    Signing up...
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </div>

          <div className="px-10 py-4 bg-gray-50 border-t border-gray-200 sm:px-12">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-orange-500 hover:text-orange-600">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
      <style jsx>{`
        .loader {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #fff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SignupForm;
