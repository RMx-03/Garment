import { FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';

const SortMenu = ({ sortBy, setSortBy }) => {
  const [open, setOpen] = useState(false);

  const options = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' }
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center text-sm text-gray-700 hover:text-gray-900 font-medium"
        onClick={() => setOpen(!open)}
      >
        Sort by <FiChevronDown className="ml-2 h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  sortBy === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } hover:bg-gray-100`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortMenu;
