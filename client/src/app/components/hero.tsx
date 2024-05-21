// components/Hero.js
const Hero = () => {
    return (
      <section className="bg-purple-50 py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Simplify Your Tenant Onboarding Process
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Seamlessly manage tenant applications, form submissions, and payments with our all-in-one platform.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700">Get Started</button>
            <button className="bg-white text-purple-600 border border-purple-600 px-6 py-3 rounded-full hover:bg-purple-50">Request a Demo</button>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  