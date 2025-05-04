import { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { getBestSellers } from '../data/products';
import useComponentLoaded from '../hooks/useComponentLoaded';
import { useLoading } from '../components/loader/LoadingProvider';
import TrackedImage from '../components/common/TrackedImage';

const BestSellers = () => {
  const products = getBestSellers();
  const { setLoading } = useLoading();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  
  // Register this page in the loading system with immediate ready state
  useComponentLoaded('best-sellers-page', true, 0, 800);
  
  // Hide loading screen when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 prata-regular">Best Sellers</h1>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;