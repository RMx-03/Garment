import React, { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useComponentLoaded from '../../hooks/useComponentLoaded';

// Static image path to ensure it doesn't change
const MISSION_IMAGE_PATH = '/images/products/hendrik-morkel-xccjtrOXJ7k-unsplash.webp';

// Global reference to track if the image has already been loaded
let missionImageLoaded = false;

const MissionSection = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(missionImageLoaded);
  const isMountedRef = useRef(true);
  
  // Register this component in the loading system
  const { markAsLoaded } = useComponentLoaded('mission-section', imageLoaded);
  
  // Preload the image on mount and check if it's already been loaded previously
  useEffect(() => {
    // Mark mounted status for cleanup
    isMountedRef.current = true;
    
    // If the image is already loaded globally, mark it loaded immediately
    if (missionImageLoaded) {
      setImageLoaded(true);
      markAsLoaded();
      return;
    }
    
    // Preload the image
    const img = new Image();
    
    img.onload = () => {
      if (isMountedRef.current) {
        missionImageLoaded = true; // Set global flag
        setImageLoaded(true);
      }
    };
    
    img.src = MISSION_IMAGE_PATH;
    
    // Clean up
    return () => {
      isMountedRef.current = false;
    };
  }, [markAsLoaded]);
  
  return (
    <section className="relative py-24 bg-gray-100 will-change-transform">
      {/* Regular img tag for maximum compatibility */}
      <img
        src={MISSION_IMAGE_PATH}
        alt="Mission"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          display: 'block',
          opacity: imageLoaded ? 1 : 0, // Only show when loaded
          transition: 'opacity 0.3s ease'
        }}
        loading="eager"
      />
      
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <div className="relative bg-black bg-opacity-40 h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <h2 className="text-4xl mb-4 prata-regular">We're on a Mission To Clean Up the Industry</h2>
          <p className="text-lg mb-8 outfit-regular">Read about our progress in our latest Impact Report.</p>
          <Link
            to="/sustainability"
            className="bg-white text-black px-8 py-3 inline-block hover:bg-gray-100 transition-colors outfit-regular focus:ring-2 focus:ring-white focus:outline-none"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </section>
  );
});

MissionSection.displayName = 'MissionSection';

export default MissionSection;
