import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Account</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">Log In</Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-gray-600 hover:text-gray-900">Sign Up</Link>
              </li>
              <li>
                <Link to="/gift-card" className="text-sm text-gray-600 hover:text-gray-900">Redeem a Gift Card</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-sm text-gray-600 hover:text-gray-900">Environmental Initiatives</Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-gray-900">Careers</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Get Help</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-gray-900">Help Center</Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-600 hover:text-gray-900">Return Policy</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-gray-900">Shipping Info</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Connect</h3>
            <div className="mt-4">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="min-w-0 flex-1 border border-gray-300 px-4 py-2"
                />
                <button
                  type="submit"
                  className="ml-4 flex items-center justify-center bg-black px-4 py-2 text-white hover:bg-gray-800"
                >
                  <FiArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-8">
          <p className="text-sm text-gray-500">&copy; 2025 Garments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;