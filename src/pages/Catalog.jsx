import { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import SortMenu from '../components/filters/SortMenu';
import Filters from '../components/filters/Filters';
import MobileFilters from '../components/filters/MobileFilters';
import { Products } from '../data/products';
import { useLoading } from '../components/loader/LoadingProvider';
import useComponentLoaded from '../hooks/useComponentLoaded';

const Catalog = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const { setLoading } = useLoading();
  
  // Register this page in the loading system
  useComponentLoaded('catalog-page', true, 0, 1500);
  
  // Hide loading screen when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [setLoading]);

  // Combine all products from both men and women categories
  const allProducts = [...Products.women, ...Products.men];
  
  // Get unique categories and colors from all products
  const categories = [...new Set(allProducts.map(p => p.category))];
  const colors = [...new Set(allProducts.flatMap(p => p.colors || []))];

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleColor = (col) => {
    setSelectedColors(prev =>
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  const sortProducts = (prods) => {
    switch (sortBy) {
      case 'price-low-high':
        return [...prods].sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return [...prods].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...prods].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
      case 'rating':
        return [...prods].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'reviews':
        return [...prods].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      default:
        return prods;
    }
  };

  const filtered = allProducts.filter(p => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const colorMatch = selectedColors.length === 0 || (p.colors && p.colors.some(c => selectedColors.includes(c)));
    return categoryMatch && colorMatch;
  });

  const sorted = sortProducts(filtered);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-baseline border-b pb-6 border-gray-200">
          <div>
            <h1 className="text-2xl md:text-3xl prata-regular font-medium text-gray-900">Catalog</h1>
            <p className="text-sm outfit-regular text-gray-500 mt-1">{sorted.length} results</p>
          </div>
          <SortMenu sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        <div className="flex flex-col lg:flex-row gap-x-8 pt-6">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Filters
              categories={categories}
              colors={colors}
              selectedCategories={selectedCategories}
              selectedColors={selectedColors}
              onToggleCategory={toggleCategory}
              onToggleColor={toggleColor}
            />
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden mb-6">
            <MobileFilters
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {sorted.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Empty State */}
            {sorted.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg mt-8">
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your filters or check back later for new products.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog; 