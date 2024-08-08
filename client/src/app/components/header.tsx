"use client";
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-darkBlue">MyTenant</a>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/features" legacyBehavior>
            <a className="text-gray-700 hover:text-darkBlue transition duration-300">Features</a>
          </Link>
          <Link href="/pricing" legacyBehavior>
            <a className="text-gray-700 hover:text-darkBlue transition duration-300">About Us</a>
          </Link>
          <Link href="/resources" legacyBehavior>
            <a className="text-gray-700 hover:text-darkBlue transition duration-300">Resources</a>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/signup" legacyBehavior>
            <a className="bg-orange px-4 py-2 rounded hover:bg-darkBlue transition duration-300">Signup</a>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/features" legacyBehavior>
            <a className="block text-gray-700 hover:text-darkBlue transition duration-300">Features</a>
          </Link>
          <Link href="/pricing" legacyBehavior>
            <a className="block text-gray-700 hover:text-darkBlue transition duration-300">About Us</a>
          </Link>
          <Link href="/resources" legacyBehavior>
            <a className="block text-gray-700 hover:text-darkBlue transition duration-300">Resources</a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a className="block bg-orange mt-2 px-4 py-2 rounded hover:bg-darkBlue transition duration-300">Signup</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
