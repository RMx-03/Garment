import { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { OptimizedImage } from '../common/OptimizedImage';

const products = [
  {
    id: 1,
    name: 'MIDI DRESS',
    image: '/images/products/midi-dress.jpg',
    link: '/product/midi-dress',
    description: 'Elegant one-shoulder red midi dress with draped detail',
    price: 129.99
  },
  {
    id: 2,
    name: 'MAXI SHIRT DRESS',
    image: '/images/products/maxi-dress.jpg',
    link: '/product/maxi-shirt-dress',
    description: 'Comfortable and stylish grey maxi shirt dress',
    price: 149.99
  },
  {
    id: 3,
    name: 'ELEGANT DRESS',
    image: '/images/products/elegant-dress.jpg',
    link: '/product/elegant-dress',
    description: 'Floral print elegant dress with fitted silhouette',
    price: 169.99
  }
];

const ProductCard = memo(({ product, index }) => (
  <motion.div
    key={product.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ delay: index * 0.1 }}
    className="relative group"
  >
    <div className="relative overflow-hidden aspect-[3/4]">
      <OptimizedImage
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        width={400}
        height={600}
        loading={index === 0 ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-2xl font-medium mb-2">{product.name}</h3>
        <p className="text-sm opacity-90 mb-2">{product.description}</p>
        <p className="text-lg font-semibold mb-4">${product.price}</p>
        <Link
          to={product.link}
          className="inline-block bg-white text-black px-6 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white"
        >
          Shop Now
        </Link>
      </div>
    </div>
  </motion.div>
));

ProductCard.displayName = 'ProductCard';

const NavigationButton = memo(({ direction, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none disabled:opacity-50 disabled:hover:scale-100"
    style={{ [direction === 'left' ? 'left' : 'right']: '1rem' }}
    aria-label={`${direction === 'left' ? 'Previous' : 'Next'} product`}
  >
    <Icon className="w-5 h-5" />
  </button>
));

NavigationButton.displayName = 'NavigationButton';

const LatestProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">LATEST PRODUCTS</h2>
          <p className="text-gray-600">
            Embrace the essence of effortless style and unmatchable comfort with our collections.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </AnimatePresence>
          </div>

          <NavigationButton
            direction="left"
            onClick={prevSlide}
            icon={FiArrowLeft}
          />
          <NavigationButton
            direction="right"
            onClick={nextSlide}
            icon={FiArrowRight}
          />
        </div>
      </div>
    </section>
  );
};

export default memo(LatestProducts); 