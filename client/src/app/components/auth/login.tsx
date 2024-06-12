"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '../../../userContext';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';

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

        // Redirect based on agency profile existence
        if (response.data.user.hasAgencyProfile) {
          router.push('/dashboard');
        } else {
          router.push('/profile');
        }
      }
    } catch (err: any) {
      console.error('Error logging in:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-8 max-w-lg mx-auto p-10 bg-white shadow-2xl rounded-lg">
      <h1 className="text-5xl font-bold text-center mb-8">Login</h1>
      <p className="text-center text-gray-500 mb-10 text-xl">Access your account</p>

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
          className="pl-14 shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
          required
        />
      </div>

      <div className="flex flex-col relative">
        <label htmlFor="password" className="mb-3 text-xl font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="pl-14 shadow-lg rounded-lg px-5 py-2 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange focus:ring-opacity-50"
            required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange text-white px-6 py-2 rounded-lg text-2xl font-semibold transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
        disabled={loading} // Disable button while loading
      >
        {loading ? <ClipLoader size={24} color={"#fff"} /> : "Login"} {/* Show loader or text */}
      </button>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="text-center mt-4">
        <p className="text-gray-500 text-lg">
          Don't have an account? <Link href="/signup" className="text-orange-500 hover:underline">Signup</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
