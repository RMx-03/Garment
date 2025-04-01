import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { Products } from '../data/products';
import { FiChevronDown } from 'react-icons/fi';

const ProductListing = ({ category }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  const products = category === 'women' ? Products.women : Products.men;
  const pageTitle = category === 'women' ? "Women's Clothing & Apparel" : "Men's Clothing & Apparel";

  const categories = [...new Set(products.map(product => product.category))];
  const colors = [...new Set(products.flatMap(product => product.colors))];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  }

  const sortProducts = (products) => {
    switch (sortBy) {
      case 'price-low-high':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return [...products].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return [...products].sort((a, b) => b.reviews - a.reviews);
      default:
        return products;
    }
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const colorMatch = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
    return categoryMatch && colorMatch;
  });

  const sortedProducts = sortProducts(filteredProducts);
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <div> 
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              {pageTitle} 
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {sortedProducts.length} results
            </p>
          </div>

          {/* Sort Menu */}
          <div className="relative">
            <button
              className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              Sort by
              <FiChevronDown className="ml-2 h-5 w-5" />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {[
                    { value: 'featured', label: 'Featured' },
                    { value: 'newest', label: 'Newest Arrivals' },
                    { value: 'price-low-high', label: 'Price: Low to High' },
                    { value: 'price-high-low', label: 'Price: High to Low' },
                    { value: 'rating', label: 'Highest Rated' },
                    { value: 'reviews', label: 'Most Reviewed' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        sortBy === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortMenu(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-x-8 pt-6">
          {/* Filters - Mobile */}
          <div className="lg:hidden mb-6">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full border ${
                    selectedCategories.includes(cat)
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <div className="border-b border-gray-200 py-6">
                <h2 className="text-lg font-medium text-gray-900">Category</h2>
                <div className="mt-4 space-y-4">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <label className="ml-3 text-sm text-gray-600">{cat}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-b border-gray-200 py-6">
                <h2 className="text-lg font-medium text-gray-900">Color</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColors.includes(color)
                          ? 'border-black'
                          : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;