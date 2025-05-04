import { Link } from 'react-router-dom';
import { memo, useState, useEffect, useRef, useMemo } from 'react';
import { OptimizedImage } from '../components/common/OptimizedImage';
import useComponentLoaded from '../hooks/useComponentLoaded';

// Define key images to preload
const HERO_IMAGE = "https://img.freepik.com/free-photo/girl-yellow-wall-with-shopping-bags_1157-34351.jpg?t=st=1743157201~exp=1743160801~hmac=9fcb9100b990a0023f4663d11e4fdf88b18dcf1b7db8afeb9665a03b23e30707&w=1380";
const MATERIALS_IMAGE = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f";
const FACTORIES_IMAGE = "https://images.unsplash.com/photo-1441986300917-64674bd600d8";
const STORES_IMAGE = "https://images.unsplash.com/photo-1523381294911-8d3cead13475";

// Cache for preloaded images to avoid flickering
const PRELOADED_IMAGES = {};

// Preload critical images
if (typeof window !== 'undefined') {
  // Immediately start loading the hero image
  const heroImg = new Image();
  heroImg.onload = () => {
    PRELOADED_IMAGES[HERO_IMAGE] = true;
  };
  heroImg.src = HERO_IMAGE;
}

// Custom optimized Image component with loading state
const PreloadedImage = memo(({ src, alt, className, priority = false }) => {
  const [imageLoaded, setImageLoaded] = useState(PRELOADED_IMAGES[src] || false);
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    isMountedRef.current = true;
    
    // Check if already preloaded
    if (PRELOADED_IMAGES[src]) {
      setImageLoaded(true);
      return;
    }
    
    // Otherwise preload it
    const img = new Image();
    img.onload = () => {
      if (isMountedRef.current) {
        PRELOADED_IMAGES[src] = true;
        setImageLoaded(true);
      }
    };
    img.src = src;
    
    return () => {
      isMountedRef.current = false;
    };
  }, [src]);
  
  const handleImageLoad = () => {
    if (isMountedRef.current) {
      PRELOADED_IMAGES[src] = true;
      setImageLoaded(true);
    }
  };
  
  return (
    <div className="relative w-full h-full">
      <OptimizedImage
        src={src}
        alt={alt}
        className={className}
        afterLoad={handleImageLoad}
        priority={priority}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );
});

PreloadedImage.displayName = 'PreloadedImage';

// Optimized About page component
const About = memo(() => {
  // Register this component for loading tracking
  const { markAsLoaded } = useComponentLoaded('about-page', true, 0, 2000);
  
  // Preload critical images and mark as loaded when hero image is ready
  useEffect(() => {
    if (PRELOADED_IMAGES[HERO_IMAGE]) {
      markAsLoaded();
    } else {
      const img = new Image();
      img.onload = () => {
        PRELOADED_IMAGES[HERO_IMAGE] = true;
        markAsLoaded();
      };
      img.src = HERO_IMAGE;
    }
    
    // Start preloading other images in the background
    [MATERIALS_IMAGE, FACTORIES_IMAGE, STORES_IMAGE].forEach(src => {
      if (!PRELOADED_IMAGES[src]) {
        const img = new Image();
        img.onload = () => {
          PRELOADED_IMAGES[src] = true;
        };
        img.src = src;
      }
    });
  }, [markAsLoaded]);
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <PreloadedImage
            src={HERO_IMAGE}
            alt="About Hero"
            className="h-full w-full object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl mb-6 prata-regular">
            We believe<br />
            we can all<br />
            make<br />
            a difference.
          </h1>
          <p className="text-xl outfit-regular">
            Our way: Exceptional quality.<br />
            Ethical factories. Radical Transparency.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="text-2xl md:text-3xl leading-relaxed outfit-regular">
          At Garments, we want the right choice to be as easy as putting on a great T-shirt. 
          That's why we partner with the best, ethical factories around the world. 
          Source only the finest materials. And share those stories with you—down to the true cost of every product we make. 
          It's a new way of doing things. We call it Radical Transparency.
        </p>
      </div>

      {/* Transparency Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl prata-regular">OUR PRICES</h2>
              <h3 className="text-3xl prata-regular">Radically Transparent.</h3>
              <p className="text-lg text-gray-600 outfit-regular">
                We believe our customers have a right to know how much their clothes cost to make. 
                We reveal the true costs behind all of our products—from materials to labor to transportation—then 
                offer them to you, minus the traditional retail markup.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="h-64 bg-gray-200"></div>
                <p className="mt-4 text-center outfit-regular">Garments T-shirt</p>
              </div>
              <div>
                <div className="h-64 bg-gray-400"></div>
                <p className="mt-4 text-center outfit-regular">Traditional Retail</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More to Explore */}
      <div className="py-24">
        <h2 className="text-3xl text-center mb-16 prata-regular">More to Explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <div>
            <PreloadedImage
              src={MATERIALS_IMAGE}
              alt="Our Materials"
              className="w-full h-64 object-cover"
            />
            <h3 className="mt-4 text-xl prata-regular">Our Materials</h3>
          </div>
          <div>
            <PreloadedImage
              src={FACTORIES_IMAGE}
              alt="Our Factories"
              className="w-full h-64 object-cover"
            />
            <h3 className="mt-4 text-xl prata-regular">Our Factories</h3>
          </div>
          <div>
            <PreloadedImage
              src={STORES_IMAGE}
              alt="Our Stores"
              className="w-full h-64 object-cover"
            />
            <h3 className="mt-4 text-xl prata-regular">Our Stores</h3>
          </div>
        </div>
      </div>
    </div>
  );
});

About.displayName = 'About';

export default About;