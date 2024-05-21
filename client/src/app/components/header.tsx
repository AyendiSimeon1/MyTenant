// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-purple-600">MyTenant</a>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/features" legacyBehavior>
            <a className="text-gray-700 hover:text-purple-600">Features</a>
          </Link>
          <Link href="/pricing" legacyBehavior>
            <a className="text-gray-700 hover:text-purple-600">Pricing</a>
          </Link>
          <Link href="/resources" legacyBehavior>
            <a className="text-gray-700 hover:text-purple-600">Resources</a>
          </Link>
          <Link href="/blog" legacyBehavior>
            <a className="text-gray-700 hover:text-purple-600">Blog</a>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/signup" legacyBehavior>
            <a className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Contact us</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
