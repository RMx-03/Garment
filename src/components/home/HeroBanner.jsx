import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OptimizedImage } from '../common/OptimizedImage';

const ScrollIndicator = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.5 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
  >
    <div className="flex flex-col items-center text-white">
      <span className="text-sm mb-2">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"
      >
        <motion.div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>
    </div>
  </motion.div>
));

ScrollIndicator.displayName = 'ScrollIndicator';

const HeroBanner = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/images/hero-banner.jpg"
          alt="Hero Banner"
          className="h-full w-full object-cover"
          priority={true}
          width={1920}
          height={1080}
          quality={90}
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Discover Your Perfect Style
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Explore our latest collection of premium fashion pieces designed for the modern you
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>

      <ScrollIndicator />
    </div>
  );
};

export default memo(HeroBanner); 