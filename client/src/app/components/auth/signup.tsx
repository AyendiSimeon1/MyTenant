"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'; // Ensure you import from 'next/router'
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
    role: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="pt-5">
    <form
    onSubmit={handleSubmit}
    className="flex flex-col space-y-8 max-w-lg mx-auto p-10 bg-white shadow-2xl rounded-lg"
  >
    <h1 className="text-5xl font-bold text-center mb-8">Sign Up</h1>
    <p className="text-center text-gray-500 mb-10 text-xl">
      Let's get started with your 30 days free trial
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
        className="pl-2 shadow-lg rounded-lg px-5 py-2 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
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
        className="pl-2 shadow-lg rounded-lg px-5 py-2 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
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
        className="pl-2 shadow-lg rounded-lg px-5 py-2 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
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
        className="pl-2 shadow-lg rounded-lg px-5 py-2 text-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50"
        required
      />
    </div>
    <div className="flex flex-col space-y-1">
    <button
        type="submit"
        className="w-full  text-white text-orange px-6 py-4 rounded-lg text-xl font-semibold  transition duration-200 shadow-lg hover:shadow-xl"
      >
        Signup
      </button>
    </div>
    </form>
    </div>

  );
};

export default SignupForm;
