"use client";
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const PaymentButton = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:3001/api/v1/initiatePayment', {
        MerchantRef: 'unique-merchant-reference',
        Amount: 500000,
        Description: 'Payment for property',
        CustomerName: 'John Doe',
        CustomerEmail: 'johndoe@example.com',
        CustomerMobile: '08012345678',
        Splits: [
          {
            WalletCode: 'wallet-code-1',
            Amount: 300000,
            ShouldDeductFrom: true
          },
          {
            WalletCode: 'wallet-code-2',
            Amount: 200000,
            ShouldDeductFrom: false
          }
        ]
      });

      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        console.error('Failed to get redirect URL');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full text-center">
        <Image src="/path/to/your/logo.png" alt="Logo" className="mx-auto mb-4 w-24 h-24" width={96} height={96} />
        <h1 className="text-2xl font-bold mb-4">Make Payment to My Tenant</h1>
        <p className="mb-6 text-gray-700">You can easily make a payment for your property using the button below. Click &quot;Pay Now&quot; to proceed to the secure payment portal.</p>
        <button 
          onClick={handlePayment} 
          disabled={loading} 
          className={`flex items-center justify-center px-6 py-3 w-full text-white font-semibold rounded-lg transition-colors ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading && (
            <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          )}
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default PaymentButton;
