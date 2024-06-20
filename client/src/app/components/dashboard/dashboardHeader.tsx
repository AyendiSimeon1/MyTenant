"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardHeaderProps {
  user: User | null;
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, toggleSidebar }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button onClick={toggleSidebar} className="text-darkBlue lg:hidden">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="text-3xl font-bold text-darkBlue">Dashboard</h1>
        {user && (
          <div className="flex items-center">
            <span className="mr-4 text-darkBlue">Welcome, {user.name}</span>
            <Image
              className="rounded-full"
              src="/path-to-profile-picture.jpg"
              alt="Profile"
              width={32}
              height={32}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
