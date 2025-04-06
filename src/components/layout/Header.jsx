import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import SearchOverlay from '../search/SearchOverlay';
import CartOverlay from '../cart/CartOverlay';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);  
  const { getCartCount } = useCart(); 
  const location = useLocation();
  const isHomePage = location.pathname === '/';



  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
      <nav className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-700 hover:text-black"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold">GARMENTS</Link>
            </div>

            {/* Main Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-8">
                <div 
                  className="relative group"
                  
                >
                  <Link to="/women" className="text-gray-700 hover:text-black flex items-center">
                    Women 
                  </Link>                  
                </div>
                
                <div 
                  className="relative group"
                  
                >
                  <Link to="/men" className="text-gray-700 hover:text-black flex items-center">
                    Men 
                  </Link>                  
                </div>
                <Link to="/about" className="text-gray-700 hover:text-black">About</Link>
                <Link to="/stores" className="text-gray-700 hover:text-black">Stores</Link>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button 
                className="text-gray-700 hover:text-black"
                onClick={() => setIsSearchOpen(true)}
              >
                <FiSearch className="h-6 w-6" />
              </button>
              <Link to="/login" className="text-gray-700 hover:text-black">
                <FiUser className="h-6 w-6" />
              </Link>

              {/* Cart */}
              <button
                className="text-gray-700 hover:text-black relative"
                onClick={() => setIsCartOpen(true)}
              >
                <FiShoppingBag className="h-6 w-6" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="space-y-1">
                  <Link
                    to="/women"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Women
                  </Link>
                  <Link
                    to="/men"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Men
                  </Link>
                  <Link
                    to="/about"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/stores"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Stores
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Navigation - Only shown on homepage */}
          {isHomePage && (
            <div className="border-t border-gray-200">
              <div className="flex justify-center space-x-8 py-3">
                <Link to="/holiday" className="text-sm text-gray-700 hover:text-black">Holiday Gifting</Link>
                <Link to="/new" className="text-sm text-gray-700 hover:text-black">New Arrivals</Link>
                <Link to="/best-sellers" className="text-sm text-gray-700 hover:text-black">Best-Sellers</Link>
                <Link to="/clothing" className="text-sm text-gray-700 hover:text-black">Clothing</Link>
                <Link to="/tops" className="text-sm text-gray-700 hover:text-black">Tops & Sweaters</Link>
                <Link to="/pants" className="text-sm text-gray-700 hover:text-black">Pants & Jeans</Link>
                <Link to="/outerwear" className="text-sm text-gray-700 hover:text-black">Outerwear</Link>
                <Link to="/shoes" className="text-sm text-gray-700 hover:text-black">Shoes & Bags</Link>
                <Link to="/sale" className="text-sm text-red-600 hover:text-red-700">Sale</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}

      {/* Cart Overlay */}
      {isCartOpen && <CartOverlay onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default Header;