// components/Tools.js
const organizeWork = () => {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Tools to Empower Your Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="p-6 bg-purple-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Tenant Management</h3>
                <p className="text-gray-600">Efficiently manage tenant information and track their application status.</p>
              </div>
            </div>
            <div>
              <div className="p-6 bg-purple-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Automated Reminders</h3>
                <p className="text-gray-600">Send automated reminders to tenants for document submissions and payments.</p>
              </div>
            </div>
            <div>
              <div className="p-6 bg-purple-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Integrated Communications</h3>
                <p className="text-gray-600">Communicate seamlessly with tenants through our integrated messaging system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default organizeWork;
  