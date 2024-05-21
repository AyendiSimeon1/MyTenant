// components/AboutUs.js
const AboutUs = () => {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
              <p className="text-gray-600">
                At MyTenant, we are dedicated to revolutionizing the tenant onboarding process. Our mission is to provide a seamless, efficient, and transparent experience for both agents and tenants. With our user-friendly platform, managing tenant applications and payments has never been easier.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src="/images/about-us.jpg" alt="About Us" className="rounded-lg shadow-lg"/>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;
  