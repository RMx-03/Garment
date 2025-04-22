import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { memo } from 'react';
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

const HeroContent = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-3xl mx-auto"
  >
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
      Your Cozy Era
    </h1>
    <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl mx-auto">
      Get peak comfy-chic with new winter essentials.
    </p>
    <Link
      to="/shop"
      className="inline-block bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
    >
      SHOP NOW
    </Link>
  </motion.div>
));

HeroContent.displayName = 'HeroContent';

const Hero = memo(() => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/images/products/pexels-davidedegiovanni-1649707.webp"
          alt="Hero"
          className="h-full w-full object-cover"
          priority={true}
          width={1920}
          height={1080}
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center text-center px-4 py-20">
        <HeroContent />
      </div>

      <ScrollIndicator />
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;