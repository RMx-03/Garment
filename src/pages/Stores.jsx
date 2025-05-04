import { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '../components/common/OptimizedImage';
import useComponentLoaded from '../hooks/useComponentLoaded';

// Preload store images - memoized to avoid recreation
const stores = [
  {
    city: 'SEATTLE',
    name: 'University Village',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  {
    city: 'SAN FRANCISCO',
    name: 'Valencia Street, San Francisco',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  {
    city: 'PALO ALTO',
    name: 'Stanford',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  }
];

// Cache for preloaded images
const PRELOADED_IMAGES = {};

// Custom comparison function to prevent unnecessary rerenders
const areEqual = () => true; // This component's props never change

const StoreItem = memo(({ store, index }) => {
  const [imageLoaded, setImageLoaded] = useState(PRELOADED_IMAGES[store.image] || false);
  const isMountedRef = useRef(true);
  
  // Handle the image loading
  useEffect(() => {
    // Register mount status for cleanup
    isMountedRef.current = true;
    
    // If image already in cache, mark as loaded
    if (PRELOADED_IMAGES[store.image]) {
      setImageLoaded(true);
      return;
    }
    
    // Otherwise preload it
    const img = new Image();
    img.onload = () => {
      if (isMountedRef.current) {
        PRELOADED_IMAGES[store.image] = true;
        setImageLoaded(true);
      }
    };
    img.src = store.image;
    
    return () => {
      isMountedRef.current = false;
    };
  }, [store.image]);
  
  // Handle image load callback
  const handleImageLoad = () => {
    if (isMountedRef.current) {
      PRELOADED_IMAGES[store.image] = true;
      setImageLoaded(true);
    }
  };
  
  return (
    <div key={store.name} className="group">
      <div className="aspect-w-3 aspect-h-2 overflow-hidden relative">
        <OptimizedImage
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          afterLoad={handleImageLoad}
          priority={index < 2} // Prioritize loading the first two stores
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500 outfit-regular">{store.city}</p>
        <h3 className="text-lg text-gray-900 prata-regular">{store.name}</h3>
      </div>
    </div>
  );
});
StoreItem.displayName = 'StoreItem';

const Stores = memo(() => {
  // Register component loading
  const { markAsLoaded } = useComponentLoaded('stores-page', true, 0, 2000);
  
  // Immediately preload first store image
  useEffect(() => {
    if (stores.length > 0) {
      const img = new Image();
      img.onload = () => {
        PRELOADED_IMAGES[stores[0].image] = true;
        markAsLoaded();
      };
      img.src = stores[0].image;
    }
  }, [markAsLoaded]);
  
  return (
    <div className="bg-white">
      {/* Secondary Navigation */}
      {/* <div className="border-b border-gray-200">
        <nav className="flex justify-center space-x-8 py-4">
          <Link to="/about" className="text-sm text-gray-700 hover:text-black">About</Link>
          <Link to="/stores" className="text-sm text-gray-900 font-medium">Stores</Link>
          <Link to="/factories" className="text-sm text-gray-700 hover:text-black">Factories</Link>
          <Link to="/environmental" className="text-sm text-gray-700 hover:text-black">Environmental Initiatives</Link>
          <Link to="/carbon" className="text-sm text-gray-700 hover:text-black">Our Carbon Commitment</Link>
          <Link to="/impact" className="text-sm text-gray-700 hover:text-black">Annual Impact Report</Link>
          <Link to="/cleaner" className="text-sm text-gray-700 hover:text-black">Cleaner Fashion</Link>
        </nav>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl text-center mb-4 prata-regular">Stores</h1>
        <p className="text-center text-gray-600 mb-12 outfit-regular">Find one of our stores nearest to you.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store, index) => (
            <StoreItem key={store.name} store={store} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
});

Stores.displayName = 'Stores';

export default Stores;