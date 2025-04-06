import { useState } from 'react';
import { Link } from 'react-router-dom';

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

const SearchOverlay = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search"
            className="w-full text-lg px-4 py-2 border-b-2 border-gray-200 focus:outline-none focus:border-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-black"
          >
            Cancel
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCategories.map((category) => (
              <Link
                key={category.title}
                to={category.href}
                className="group"
                onClick={onClose}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{category.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;