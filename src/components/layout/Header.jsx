import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import SearchOverlay from '../search/SearchOverlay';
import CartOverlay from '../cart/CartOverlay';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);  
  const [hasScrolled, setHasScrolled] = useState(false);
  const { getCartCount } = useCart(); 
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const mobileMenuRef = useRef(null);
  const searchButtonRef = useRef(null);
  const cartButtonRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isCartOpen) {
          setIsCartOpen(false);
          cartButtonRef.current?.focus();
        }
        if (isSearchOpen) {
          setIsSearchOpen(false);
          searchButtonRef.current?.focus();
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          mobileMenuButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCartOpen, isSearchOpen, isMobileMenuOpen]);

  const headerClasses = `fixed w-full top-0 z-50 transition-all duration-300 ${
    hasScrolled 
      ? 'bg-white shadow-sm' 
      : isHomePage 
        ? 'bg-transparent' 
        : 'bg-white shadow-sm'
  }`;

  const textColorClasses = hasScrolled || !isHomePage ? 'text-gray-700 hover:text-black' : 'text-white hover:text-white/80';
  const logoColorClass = hasScrolled || !isHomePage ? 'text-gray-900' : 'text-white';

  const handleOverlayOpen = (type) => {
    if (type === 'search') {
      setIsCartOpen(false);
      setIsMobileMenuOpen(false);
      setIsSearchOpen(true);
    } else if (type === 'cart') {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setIsCartOpen(true);
    } else if (type === 'mobile') {
      setIsSearchOpen(false);
      setIsCartOpen(false);
      setIsMobileMenuOpen(prev => !prev);
    } else if (type === 'account') {
      setIsSearchOpen(false);
      setIsCartOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/login');
    }
  };

  return (
    <header className={headerClasses} role="banner">
      <nav className="relative" aria-label="Main navigation">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu button */}
            <div className="flex lg:hidden">
              <button
                ref={mobileMenuButtonRef}
                type="button"
                className={textColorClasses}
                onClick={() => handleOverlayOpen('mobile')}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <FiX className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <FiMenu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className={`prata-regular text-2xl font-bold ${logoColorClass}`} aria-label="Garments home">
                GARMENTS
              </Link>
            </div>

            {/* Main Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-8" role="navigation" aria-label="Desktop navigation">
                <Link to="/women" className={`${textColorClasses} outfit-regular`}>Women</Link>
                <Link to="/men" className={`${textColorClasses} outfit-regular`}>Men</Link>
                <Link to="/about" className={`${textColorClasses} outfit-regular`}>About</Link>
                <Link to="/stores" className={`${textColorClasses} outfit-regular`}>Stores</Link>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4" role="navigation" aria-label="User navigation">
              <button
                ref={searchButtonRef}
                className={textColorClasses}
                onClick={() => handleOverlayOpen('search')}
                aria-expanded={isSearchOpen}
                aria-label="Search"
              >
                <FiSearch className="h-6 w-6" aria-hidden="true" />
              </button>
              
              <button 
                className={textColorClasses}
                onClick={() => handleOverlayOpen('account')}
                aria-label="Account"
              >
                <FiUser className="h-6 w-6" aria-hidden="true" />
              </button>
              
              <button
                ref={cartButtonRef}
                className={`${textColorClasses} relative`}
                onClick={() => handleOverlayOpen('cart')}
                aria-expanded={isCartOpen}
                aria-label={`Cart with ${getCartCount()} items`}
              >
                <FiShoppingBag className="h-6 w-6" aria-hidden="true" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" aria-hidden="true">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            ref={mobileMenuRef}
            className="lg:hidden bg-white shadow-lg"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/women"
                className="block px-3 py-2 text-base outfit-regular text-gray-700 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Women
              </Link>
              <Link
                to="/men"
                className="block px-3 py-2 text-base outfit-regular text-gray-700 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-base outfit-regular text-gray-700 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/stores"
                className="block px-3 py-2 text-base outfit-regular text-gray-700 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Stores
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Cart Overlay */}
      <CartOverlay 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  );
};

export default Header;