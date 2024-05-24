"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import heroImage from '../../../public/hero-illustration.png';


const HeroSection: React.FC = () => {
  const heroRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    });

    observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []); // Empty dependency array to run effect only once

  return (
    <section ref={heroRef} className="hero py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-darkBlue mb-4">Empowering Seamless Tenant Onboarding</h1>
            <p className="text-lg text-gray-600">
              MyTenant revolutionizes the tenant experience. We provide a smooth, efficient, and transparent process for both agents and tenants. Manage applications and payments effortlessly with our user-friendly platform.
            </p>
            {/* Placeholder for icons (optional) */}
            {/* <div className="flex mt-4">
              <i className="text-xl text-blue-500 mr-4">icon-1</i>
              <i className="text-xl text-green-500">icon-2</i>
              <i className="text-xl text-orange-500">icon-3</i>
            </div> */}
          </div>
          <div className="md:w-1/2">
          
          <Image src="/hero-illustration.png" width={600} height={600} className="rounded-lg shadow-lg"  alt='illustrator image'/>


          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
