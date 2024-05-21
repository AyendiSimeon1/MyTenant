// components/Features.js
const Tools = () => {
    return (
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Customizable Forms</h3>
                <p className="text-gray-600">
                  Create and customize tenant application forms to gather all necessary information.
                </p>
              </div>
            </div>
            <div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Secure Payments</h3>
                <p className="text-gray-600">
                  Accept payments securely and effortlessly through our integrated payment system.
                </p>
              </div>
            </div>
            <div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Real-time Tracking</h3>
                <p className="text-gray-600">
                  Monitor the status of applications and payments in real-time from a centralized dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Tools;
  