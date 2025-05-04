import { Link } from 'react-router-dom';
import { FiArrowRight, FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';

// Mobile Footer Section component with collapsible functionality
const MobileFooterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-800 py-4 md:border-none md:py-0">
      <button 
        className="flex w-full items-center justify-between text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-semibold prata-regular">{title}</h3>
        <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <h3 className="text-sm font-semibold prata-regular hidden md:block">{title}</h3>
      <div className={`mt-4 space-y-4 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60' : 'max-h-0 md:max-h-none'}`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Branding Section */}
        <div className="mb-12 text-center">
          <Link to="/" className="prata-regular text-4xl font-bold text-white inline-block">
            GARMENTS
          </Link>
          <p className="mt-4 text-gray-400 outfit-regular">Ethical. Sustainable. Stylish.</p>
          
          {/* Social media icons - visible on mobile and desktop */}
          <div className="mt-6 flex justify-center space-x-5">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <FiInstagram className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <FiTwitter className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <FiTwitter className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <FiYoutube className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
        
        {/* Newsletter - above links on mobile */}
        <div className="mb-8 md:hidden">
          <h3 className="text-sm font-semibold text-white prata-regular mb-4">Join Our Newsletter</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Email Address"
              className="min-w-0 flex-1 border-0 bg-gray-800 text-gray-300 placeholder-gray-500 px-4 py-2 outfit-regular focus:ring-1 focus:ring-white focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 flex items-center justify-center bg-white px-4 py-2 text-black hover:bg-gray-200 focus:ring-2 focus:ring-white focus:outline-none transition-colors"
              aria-label="Subscribe"
            >
              <FiArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-4 border-t border-gray-800">
          <MobileFooterSection title="Account">
            <ul className="space-y-4">
              <li>
                <Link to="/login" className="text-sm text-gray-300 hover:text-white outfit-regular transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-gray-300 hover:text-white outfit-regular transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/gift-card" className="text-sm text-gray-300 hover:text-white outfit-regular transition-colors">
                  Redeem a Gift Card
                </Link>
              </li>
            </ul>
          </MobileFooterSection>

          <MobileFooterSection title="Company">
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-white outfit-regular transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-sm text-gray-300 hover:text-white outfit-regular transition-colors">
                  Environmental Initiatives
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-300 hover:text-white outfit-regular transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </MobileFooterSection>

          <MobileFooterSection title="Get Help">
            <ul className="space-y-4">
              <li>
                <Link to="/help" className="text-sm text-gray-300 hover:text-white outfit-regular transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-300 hover:text-white outfit-regular transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-300 hover:text-white outfit-regular transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </MobileFooterSection>

          <div className="hidden md:block">
            <h3 className="text-sm font-semibold text-white prata-regular">Connect</h3>
            <div className="mt-4">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="min-w-0 flex-1 border-0 bg-gray-800 text-gray-300 placeholder-gray-500 px-4 py-2 outfit-regular focus:ring-1 focus:ring-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-2 flex items-center justify-center bg-white px-4 py-2 text-black hover:bg-gray-200 focus:ring-2 focus:ring-white focus:outline-none transition-colors"
                  aria-label="Subscribe"
                >
                  <FiArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-sm text-gray-400 outfit-regular text-center md:text-left">&copy; 2025 Garments. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6 justify-center md:justify-end">
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors outfit-regular">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-gray-400 hover:text-white transition-colors outfit-regular">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-xs text-gray-400 hover:text-white transition-colors outfit-regular">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;