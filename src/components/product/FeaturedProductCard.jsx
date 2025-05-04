import { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '../common/OptimizedImage';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Pre-cache placeholder to avoid flashing
const PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=';

// Global cache for loaded images to prevent reloading across rerenders and navigation
// This object persists across component mounts/unmounts
const LOADED_IMAGES = {};

// Custom comparison function for memo to prevent unnecessary rerenders
const areEqual = (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id && prevProps.isMobile === nextProps.isMobile;
};

const FeaturedProductCard = memo(({ product, isMobile = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [primaryImageLoaded, setPrimaryImageLoaded] = useState(false);
  const [secondaryImageLoaded, setSecondaryImageLoaded] = useState(false);
  const isMountedRef = useRef(true);
  
  // Get primary and secondary images - memoize these values with useMemo
  const { primaryImage, secondaryImage } = useMemo(() => {
    const primary = Array.isArray(product.image) && product.image.length > 0 
      ? product.image[0] 
      : 'fallback-image.jpg';
      
    const secondary = Array.isArray(product.image) && product.image.length > 1 
      ? product.image[1] 
      : primary;
      
    return { primaryImage: primary, secondaryImage: secondary };
  }, [product.image]);

  // Check if these images are already loaded in our cache
  useEffect(() => {
    // Set mounted ref for cleanup
    isMountedRef.current = true;
    
    // Check if images are already loaded in the cache
    if (LOADED_IMAGES[primaryImage]) {
      setPrimaryImageLoaded(true);
    }
    
    if (LOADED_IMAGES[secondaryImage]) {
      setSecondaryImageLoaded(true);
    }
    
    // Preload both images on mount to prevent flashing later
    const img1 = new Image();
    const img2 = new Image();
    
    img1.onload = () => {
      if (isMountedRef.current) {
        LOADED_IMAGES[primaryImage] = true;
        setPrimaryImageLoaded(true);
      }
    };
    
    img2.onload = () => {
      if (isMountedRef.current) {
        LOADED_IMAGES[secondaryImage] = true;
        setSecondaryImageLoaded(true);
      }
    };
    
    img1.src = primaryImage;
    img2.src = secondaryImage;
    
    // Cleanup function to prevent memory leaks and state updates after unmount
    return () => {
      isMountedRef.current = false;
    };
  }, [primaryImage, secondaryImage]);

  // Memoize mouse event handlers to prevent re-renders
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  // Handle image load events - mark these in the global cache
  const handlePrimaryImageLoad = useCallback(() => {
    if (isMountedRef.current) {
      LOADED_IMAGES[primaryImage] = true;
      setPrimaryImageLoaded(true);
    }
  }, [primaryImage]);
  
  const handleSecondaryImageLoad = useCallback(() => {
    if (isMountedRef.current) {
      LOADED_IMAGES[secondaryImage] = true;
      setSecondaryImageLoaded(true);
    }
  }, [secondaryImage]);
  
  // Calculate different styles for mobile vs desktop
  const infoBoxClass = useMemo(() => {
    return isMobile 
      ? "p-3 sm:p-4 bg-white absolute bottom-0 left-0 right-0" // Always show all content on mobile
      : `p-3 sm:p-4 bg-white transition-transform duration-300 will-change-transform absolute bottom-0 left-0 right-0 ${
          isHovered ? 'translate-y-[-40px]' : 'translate-y-0'
        }`; // Animate on desktop
  }, [isMobile, isHovered]);
  
  // Colors container class - no animation/hiding on mobile
  const colorsContainerClass = useMemo(() => {
    return isMobile
      ? "mt-2 sm:mt-3" // Always visible on mobile
      : "colors-container mt-2 sm:mt-3"; // Use animation class on desktop
  }, [isMobile]);
  
  // Memoize card content to prevent re-renders
  const cardContent = useMemo(() => (
    <div className="bg-white border border-gray-200 overflow-hidden h-full relative">
      <div className="relative overflow-hidden pb-[130%]">
        {/* Primary Image */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 will-change-opacity ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <OptimizedImage
            src={primaryImage}
            alt={product.name || 'Product'}
            className="absolute inset-0 w-full h-full object-cover"
            effect="opacity"
            wrapperClassName="!absolute inset-0"
            placeholderSrc={PLACEHOLDER}
            afterLoad={handlePrimaryImageLoad}
            priority={true}
          />
        </div>
        
        {/* Secondary Image (preloaded but only shown on hover) */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 will-change-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <OptimizedImage
            src={secondaryImage}
            alt={`${product.name || 'Product'} - Alternate view`}
            className="absolute inset-0 w-full h-full object-cover"
            effect="opacity"
            wrapperClassName="!absolute inset-0"
            placeholderSrc={PLACEHOLDER}
            afterLoad={handleSecondaryImageLoad}
            loading="eager"
          />
        </div>
        
        {/* Loading skeleton */}
        {!primaryImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
        )}
      </div>
      
      <div className={infoBoxClass}>
        <h3 className="text-xs sm:text-sm text-gray-900 font-medium truncate">{product.name}</h3>
        <div className="mt-1 flex items-center">
          <p className="text-xs sm:text-sm font-medium text-gray-900">${product.price}</p>
          {product.originalPrice && (
            <p className="ml-2 text-xs sm:text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </p>
          )}
        </div>
        
        <div className={colorsContainerClass}>
          {product.colors?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="h-3 w-3 sm:h-4 sm:w-4 rounded-full border border-gray-300"
                  style={{ 
                    backgroundColor: color.toLowerCase().includes('wash') 
                      ? '#6b7280' // Default for wash colors
                      : color.toLowerCase() 
                  }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ), [
    isHovered, 
    primaryImage, 
    secondaryImage, 
    product.name, 
    product.price, 
    product.originalPrice, 
    product.colors, 
    primaryImageLoaded,
    handlePrimaryImageLoad,
    handleSecondaryImageLoad,
    infoBoxClass,
    colorsContainerClass
  ]);

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group featured-product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardContent}
    </Link>
  );
}, areEqual);

FeaturedProductCard.displayName = 'FeaturedProductCard';

export default FeaturedProductCard; 