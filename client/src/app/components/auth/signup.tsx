"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: 'AGENT',
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
    <div className="pt-5 pb-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-8 max-w-3xl mx-auto p-10 bg-white shadow-2xl rounded-lg"
      >
        <h1 className="text-5xl font-bold text-darkBlue mb-8">Sign Up</h1>
        <p className="text-center text-darkBlue text-gray-500 mb-10 text-xl">
          Get started 
        </p>

        <div className="flex flex-col space-y-1">
          <label htmlFor="firstName" className="text-xl font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="pl-2 shadow-lg rounded-lg px-5 py-2 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="lastName" className="text-xl font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="pl-2 shadow-lg rounded-lg px-5 py-2 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-xl font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="pl-2 shadow-lg rounded-lg px-5 py-2 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-xl font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="pl-2 shadow-lg rounded-lg px-5 py-2 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            className={`w-full bg-orange text-white px-6 py-2 rounded-lg text-xl font-semibold transition duration-200 shadow-lg hover:shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loader mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Signup'
            )}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-500 text-lg">
            Have an account? <a href="/login" className="text-orange-500 hover:underline">Login</a>
          </p>
        </div>
      </form>
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 2s linear infinite;
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
