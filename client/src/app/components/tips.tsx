
import Image from 'next/image';


const Tips = () => {
  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Tips and Useful Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              {/* <Image src={tip1Image} alt="Tip 1" className="rounded mb-4" layout="responsive" width={300} height={200} /> */}
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Best Practices for Tenant Onboarding</h3>
              <p className="text-gray-600">Learn the best practices to ensure a smooth onboarding process for your tenants.</p>
            </div>
          </div>
          <div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              {/* <Image src={tip2Image} alt="Tip 2" className="rounded mb-4" layout="responsive" width={300} height={200} /> */}
              <h3 className="text-xl font-semibold text-purple-600 mb-2">How to Manage Tenant Payments Effectively</h3>
              <p className="text-gray-600">Discover strategies to manage tenant payments efficiently and securely.</p>
            </div>
          </div>
          <div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              {/* <Image src={tip3Image} alt="Tip 3" className="rounded mb-4" layout="responsive" width={300} height={200} /> */}
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Leveraging Technology for Better Tenant Communication</h3>
              <p className="text-gray-600">Utilize technology to enhance communication with your tenants.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tips;
