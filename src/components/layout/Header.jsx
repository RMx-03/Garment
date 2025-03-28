import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import SearchOverlay from '../search/SearchOverlay';
import CartOverlay from "../cart/CartOverlay";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showWomenMenu, setShowWomenMenu] = useState(false);
  const [showMenMenu, setShowMenMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const [cartCount, setCartCount] = useState(0); 
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const womenCategories = {
    highlights: [
      { name: "Shop All New Arrivals", link: "/women/new" },
      { name: "The Gift Guide", link: "/women/gift-guide" },
      { name: "New Bottoms", link: "/women/bottoms" },
      { name: "New Tops", link: "/women/tops" },
      { name: "T-Shirt Bundles", link: "/women/bundles" },
      { name: "Under $100", link: "/women/under-100" },
    ],
    featured: [
      { name: "The Holiday Outfit Edit", link: "/women/holiday" },
      { name: "Giftable Sweaters", link: "/women/sweaters" },
      { name: "Uniform & Capsule", link: "/women/uniform" },
      { name: "Top Rated Women's Clothing", link: "/women/top-rated" },
    ]
  };

  const menCategories = {
    highlights: [
      { name: "Shop All New Arrivals", link: "/men/new" },
      { name: "The Gift Guide", link: "/men/gift-guide" },
      { name: "New Bottoms", link: "/men/bottoms" },
      { name: "New Tops", link: "/men/tops" },
      { name: "T-Shirt Bundles", link: "/men/bundles" },
      { name: "Under $100", link: "/men/under-100" },
    ],
    featured: [
      { name: "The Holiday Outfit Edit", link: "/men/holiday" },
      { name: "Giftable Sweaters", link: "/men/sweaters" },
      { name: "The Performance Chino Shop", link: "/men/chinos" },
      { name: "Top Rated Men's Clothing", link: "/men/top-rated" },
    ]
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
      <nav className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold">GARMENTS</Link>
            </div>

            {/* Main Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <div 
                  className="relative group"
                  onMouseEnter={() => setShowWomenMenu(true)}
                  onMouseLeave={() => setShowWomenMenu(false)}
                >
                  <Link to="/women" className="text-gray-700 hover:text-black flex items-center">
                    Women <FiChevronDown className="ml-1" />
                  </Link>
                  {showWomenMenu && (
                    <div className="absolute left-1/2 -translate-x-1/2 w-screen bg-white border-t border-gray-200 shadow-lg">
                      <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-4 gap-x-8">
                        <div className="col-span-1">
                          <h3 className="text-gray-500 text-sm font-medium mb-4">HIGHLIGHTS</h3>
                          <ul className="space-y-4">
                            {womenCategories.highlights.map((item) => (
                              <li key={item.name}>
                                <Link 
                                  to={item.link} 
                                  className="text-gray-700 hover:text-black block"
                                  onClick={() => setShowWomenMenu(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-1">
                          <h3 className="text-gray-500 text-sm font-medium mb-4">FEATURED SHOPS</h3>
                          <ul className="space-y-4">
                            {womenCategories.featured.map((item) => (
                              <li key={item.name}>
                                <Link 
                                  to={item.link} 
                                  className="text-gray-700 hover:text-black block"
                                  onClick={() => setShowWomenMenu(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-2">
                          <div className="grid grid-cols-2 gap-4">
                            <Link 
                              to="/women/holiday" 
                              className="group"
                              onClick={() => setShowWomenMenu(false)}
                            >
                              <img
                                src="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7"
                                alt="Featured Women's Collection"
                                className="w-full h-64 object-cover group-hover:opacity-90"
                              />
                              <p className="mt-2 text-sm">The Holiday Outfit Edit</p>
                            </Link>
                            <Link 
                              to="/women/sweaters" 
                              className="group"
                              onClick={() => setShowWomenMenu(false)}
                            >
                              <img
                                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27"
                                alt="Giftable Sweaters"
                                className="w-full h-64 object-cover group-hover:opacity-90"
                              />
                              <p className="mt-2 text-sm">Giftable Sweaters</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className="relative group"
                  onMouseEnter={() => setShowMenMenu(true)}
                  onMouseLeave={() => setShowMenMenu(false)}
                >
                  <Link to="/men" className="text-gray-700 hover:text-black flex items-center">
                    Men <FiChevronDown className="ml-1" />
                  </Link>
                  {showMenMenu && (
                    <div className="absolute left-1/2 -translate-x-1/2 w-screen bg-white border-t border-gray-200 shadow-lg">
                      <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-4 gap-x-8">
                        <div className="col-span-1">
                          <h3 className="text-gray-500 text-sm font-medium mb-4">HIGHLIGHTS</h3>
                          <ul className="space-y-4">
                            {menCategories.highlights.map((item) => (
                              <li key={item.name}>
                                <Link 
                                  to={item.link} 
                                  className="text-gray-700 hover:text-black block"
                                  onClick={() => setShowMenMenu(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-1">
                          <h3 className="text-gray-500 text-sm font-medium mb-4">FEATURED SHOPS</h3>
                          <ul className="space-y-4">
                            {menCategories.featured.map((item) => (
                              <li key={item.name}>
                                <Link 
                                  to={item.link} 
                                  className="text-gray-700 hover:text-black block"
                                  onClick={() => setShowMenMenu(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-2">
                          <div className="grid grid-cols-2 gap-4">
                            <Link 
                              to="/men/holiday" 
                              className="group"
                              onClick={() => setShowMenMenu(false)}
                            >
                              <img
                                src="https://images.unsplash.com/photo-1617137968427-85924c800a22"
                                alt="Featured Men's Collection"
                                className="w-full h-64 object-cover group-hover:opacity-90"
                              />
                              <p className="mt-2 text-sm">The Holiday Outfit Edit</p>
                            </Link>
                            <Link 
                              to="/men/sweaters" 
                              className="group"
                              onClick={() => setShowMenMenu(false)}
                            >
                              <img
                                src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2"
                                alt="Giftable Sweaters"
                                className="w-full h-64 object-cover group-hover:opacity-90"
                              />
                              <p className="mt-2 text-sm">Giftable Sweaters</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
              {/* <Link to="/cart" className="text-gray-700 hover:text-black">
                <FiShoppingBag className="h-6 w-6" />
              </Link> */}
              <button className="text-gray-700 hover:text-black relative" onClick={toggleCart}>
                <FiShoppingBag className="h-6 w-6" />
                {/* Cart Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>


            </div>
          </div>

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
      <CartOverlay 
        isOpen={isCartOpen}
        onClose={toggleCart}
        updateCartCount={setCartCount}       
      />
    </header>
  );
};

export default Header;