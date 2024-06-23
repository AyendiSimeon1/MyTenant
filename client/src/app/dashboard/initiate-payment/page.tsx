"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const Payment = () => {
 

  const [formData, setFormData] = useState({
    MerchantRef:  '453894252',
    Amount: '5000000',
    Description: '',
    CustomerName:  '',
    CustomerEmail: '',
    CustomerMobile: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3001/api/v1/agents/initiate-payment', formData);
      const paymentResponse = response.data;
      if (paymentResponse.succeeded) {
        window.location.href = paymentResponse.data.redirectUrl;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="MerchantRef">
            Merchant Reference
          </label>
          <input
            type="text"
            name="MerchantRef"
            value={formData.MerchantRef}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Amount">
            Amount
          </label>
          <input
            type="number"
            name="Amount"
            value={formData.Amount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Description">
            Description
          </label>
          <input
            type="text"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CustomerName">
            Customer Name
          </label>
          <input
            type="text"
            name="CustomerName"
            value={formData.CustomerName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CustomerEmail">
            Customer Email
          </label>
          <input
            type="email"
            name="CustomerEmail"
            value={formData.CustomerEmail}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CustomerMobile">
            Customer Mobile
          </label>
          <input
            type="tel"
            name="CustomerMobile"
            value={formData.CustomerMobile}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
