import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const popularCategories = [
  {
    title: "Women's Sweaters",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    href: "/category/womens-sweaters"
  },
  {
    title: "Women's Bottom",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
    href: "/category/womens-bottom"
  },
  {
    title: "Women's Boots",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
    href: "/category/womens-boots"
  },
  {
    title: "Men's Best Sellers",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22",
    href: "/category/mens-best-sellers"
  }
];

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Search panel */}
      <div className="fixed inset-x-0 top-0 z-[101] flex">
        <div 
          ref={overlayRef}
          className="w-full transform bg-white shadow-lg"
          style={{ maxHeight: '90vh' }}
        >
          <div className="flex flex-col">
            {/* Search header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex-1 pr-4">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  className="w-full text-lg focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                aria-label="Close search"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Search content */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 73px)' }}>
              <div className="max-w-7xl mx-auto p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Popular Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {popularCategories.map((category) => (
                    <Link
                      key={category.title}
                      to={category.href}
                      className="group"
                      onClick={onClose}
                    >
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={category.image}
                          alt={category.title}
                          loading="lazy"
                          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                        {category.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;