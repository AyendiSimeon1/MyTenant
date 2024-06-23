import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-5 bg-white border-b-4 border-gray-200">
      <div className="text-lg font-semibold">Admin Dashboard</div>
      <div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
