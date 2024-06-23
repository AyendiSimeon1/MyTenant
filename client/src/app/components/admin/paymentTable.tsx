import React from 'react';

interface Payment {
  id: string;
  tenantId: string;
  amount: number;
  status: string;
}

interface PaymentTableProps {
  payments: Payment[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/4 py-2">Tenant ID</th>
            <th className="w-1/4 py-2">Amount</th>
            <th className="w-1/4 py-2">Status</th>
            <th className="w-1/4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="w-1/4 py-2 px-4">{payment.tenantId}</td>
              <td className="w-1/4 py-2 px-4">{payment.amount}</td>
              <td className="w-1/4 py-2 px-4">{payment.status}</td>
              <td className="w-1/4 py-2 px-4">
                <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
