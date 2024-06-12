import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faMoneyBillAlt, faEnvelope, faTicketAlt, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg overflow-auto p-3 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-darkBlue">My Tenant</h1>
        <button onClick={toggleSidebar} className="text-darkBlue">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <nav className="space-y-1">
        <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-darkBlue font-medium transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Dashboard
        </Link>
        <Link href="/members" className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-darkBlue font-medium transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          Members
        </Link>
        <Link href="/invoices" className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-darkBlue font-medium transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faMoneyBillAlt} className="mr-2" />
          Invoices
        </Link>
        <Link href="/messages" className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-darkBlue font-medium transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          Messages
        </Link>
        <Link href="/tickets" className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-darkBlue font-medium transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faTicketAlt} className="mr-2" />
          Tickets
        </Link>
        <Link href="/settings" className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-darkBlue font-medium transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faCog} className="mr-2" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
