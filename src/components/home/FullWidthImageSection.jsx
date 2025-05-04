import { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useComponentLoaded from '../../hooks/useComponentLoaded';

// Selected high-quality image from the product images folder
const FULL_WIDTH_IMAGE = '/images/products/pexels-ayoub-moukhliss-1262835-22944600.webp';

// Global flag to track if the image has been loaded
let isImagePreloaded = false;

const FullWidthImageSection = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(isImagePreloaded);
  const isMountedRef = useRef(true);
  
  // Register this component for loading state management
  const { markAsLoaded } = useComponentLoaded('full-width-image-section', imageLoaded);
  
  useEffect(() => {
    // Mark component as mounted
    isMountedRef.current = true;
    
    // Check if image already loaded
    if (isImagePreloaded) {
      setImageLoaded(true);
      markAsLoaded();
      return;
    }
    
    // Preload the image
    const img = new Image();
    img.onload = () => {
      if (isMountedRef.current) {
        isImagePreloaded = true;
        setImageLoaded(true);
        markAsLoaded();
      }
    };
    img.src = FULL_WIDTH_IMAGE;
    
    return () => {
      isMountedRef.current = false;
    };
  }, [markAsLoaded]);
  
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ 
          backgroundImage: `url(${FULL_WIDTH_IMAGE})`,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 prata-regular">
            Timeless Style.
          </h2>
          <p className="text-xl md:text-2xl mb-8 outfit-regular">
            Discover our thoughtfully designed collection crafted for lasting quality and refined elegance.
          </p>
          <Link 
            to="/catalog" 
            className="inline-block bg-white text-black px-8 py-3 text-lg outfit-regular transition-all duration-300 hover:bg-black hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </div>
    </section>
  );
});

FullWidthImageSection.displayName = 'FullWidthImageSection';

export default FullWidthImageSection; 