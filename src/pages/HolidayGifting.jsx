import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { getHolidayGifts } from '../data/products';
import useComponentLoaded from '../hooks/useComponentLoaded';
import { useLoading } from '../components/loader/LoadingProvider';
import TrackedImage from '../components/common/TrackedImage';

const HolidayGifting = () => {
  const products = getHolidayGifts();
  const { setLoading } = useLoading();
  
  // Register this page in the loading system with immediate ready state
  useComponentLoaded('holiday-gifting-page', true, 0, 800);
  
  // Hide loading screen when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <TrackedImage
            src="https://images.unsplash.com/photo-1607083206968-13611ed3d814"
            alt="Holiday Gift Guide"
            className="w-full h-96 object-cover"
            componentId="holiday-hero-image"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl prata-regular">
            Holiday Gift Guide
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-white outfit-regular">
            Find the perfect gift for everyone on your list.
          </p>
          <div className="mt-8">
            <Link
              to="/catalog"
              className="inline-block bg-white text-black px-6 py-3 text-base font-medium hover:bg-gray-100 transition-colors outfit-regular"
            >
              SHOP OCCASION
            </Link>
          </div>
        </div>
      </div>

      {/* Gift Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 prata-regular">Featured Gifts</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HolidayGifting;