"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
      }
      });
      console.log('User logged in successfully:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
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
          className="pl-14 shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
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
          className="pl-14 shadow-lg rounded-lg px-5 py-4 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          required
        />
       
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg text-2xl font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
      >
        Login
      </button>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </form>
  );
};

export default LoginForm;
