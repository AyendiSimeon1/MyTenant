"use client";
import Image from 'next/image';
import { useEffect } from 'react';
const AboutUs: React.FC = () => {
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 animate-on-scroll">
            <h2 className="text-4xl font-bold text-darkBlue mb-4">About Us</h2>
            <p className="text-lg text-gray-600">
              At MyTenant, we are dedicated to revolutionizing the tenant onboarding process. Our mission is to provide a seamless, efficient, and transparent experience for both agents and tenants. With our user-friendly platform, managing tenant applications and payments has never been easier.
            </p>
          </div>
          <div className="md:w-1/2 animate-on-scroll">
          <Image src="/mytenant-logo.jpg" width={600} height={100} className="rounded-lg shadow-lg"  alt='illustrator image'/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;