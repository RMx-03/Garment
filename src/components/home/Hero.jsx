import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import TrackedImage from '../common/TrackedImage';
import useComponentLoaded from '../../hooks/useComponentLoaded';

const ScrollIndicator = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.5 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
  >
    <div className="flex flex-col items-center text-white">
      <span className="text-sm mb-2 outfit-regular">Scroll to explore</span>
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

const HeroContent = memo(() => {
  // Register this component in the loading system
  useComponentLoaded('hero-content', true, 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight prata-regular">
        Your Cozy Era
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl mx-auto outfit-regular">
        Get peak comfy-chic with new winter essentials.
      </p>
      <Link
        to="/catalog"
        className="inline-block bg-white px-8 py-3 text-base font-medium text-black hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 outfit-regular"
      >
        SHOP NOW
      </Link>
    </motion.div>
  );
});

HeroContent.displayName = 'HeroContent';

// Use a constant image configuration to prevent re-renders
const HERO_IMAGE_CONFIG = {
  src: "/images/products/pexels-davidedegiovanni-1649707.webp",
  alt: "Hero",
  className: "h-full w-full object-cover",
  priority: true,
  width: 1920,
  height: 1080,
  quality: 90,
  componentId: "hero-main-image" // Unique ID for tracking load state
};

const Hero = memo(() => {
  // Register this component in the loading system
  useComponentLoaded('hero-component', true);
  
  // Memoize the image to prevent re-renders
  const heroImage = useMemo(() => (
    <TrackedImage {...HERO_IMAGE_CONFIG} />
  ), []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {heroImage}
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