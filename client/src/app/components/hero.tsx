"use client";

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

const Hero: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in');
        }
      });
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el as Element);
    });
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-darkBlue animate-on-scroll">
          Simplify Your Tenant Onboarding Process
        </h1>
        <p className="text-2xl text-gray-600 mt-4 animate-on-scroll">
          Seamlessly manage tenant applications, form submissions, and payments with our all-in-one platform.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button className="bg-orange text-white px-6 py-3 rounded-full hover:bg-darkBlue transition duration-300 transform hover:scale-105 animate-on-scroll">
            <FontAwesomeIcon icon={faRocket} className="mr-2" />
            Get Started
          </button>
          <button className="bg-white text-orange border border-orange px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105 animate-on-scroll">
            <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
            Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
