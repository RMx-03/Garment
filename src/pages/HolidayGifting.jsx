import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { getHolidayGifts } from '../data/products';

const HolidayGifting = () => {
  const products = getHolidayGifts();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607083206968-13611ed3d814"
            loading="lazy"
            alt="Holiday Gift Guide"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Holiday Gift Guide
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-white">
            Find the perfect gift for everyone on your list.
          </p>
        </div>
      </div>

      {/* Gift Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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