"use client";
import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const Features: React.FC = () => {
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
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-darkBlue mb-8 animate-on-scroll">
          Tools to Empower Your Workflow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="transform hover:translate-y-[-10px] transition-transform duration-300">
            <div className="p-6 bg-lightBlue rounded-lg shadow-lg animate-on-scroll">
              <h3 className="text-2xl font-semibold text-orange mb-2 animate-on-scroll">Tenant Management</h3>
              <p className="text-gray-600">Efficiently manage tenant information and track their application status.</p>
            </div>
          </div>
          <div className="transform hover:translate-y-[-10px] transition-transform duration-300">
            <div className="p-6 bg-lightBlue rounded-lg shadow-lg animate-on-scroll">
              <h3 className="text-2xl font-semibold text-orange mb-2 animate-on-scroll">Automated Reminders</h3>
              <p className="text-gray-600">Send automated reminders to tenants for document submissions and payments.</p>
            </div>
          </div>
          <div className="transform hover:translate-y-[-10px] transition-transform duration-300">
            <div className="p-6 bg-lightBlue rounded-lg shadow-lg animate-on-scroll">
              <h3 className="text-2xl font-semibold text-orange mb-2 animate-on-scroll">Integrated Communications</h3>
              <p className="text-gray-600">Communicate seamlessly with tenants through our integrated messaging system.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
