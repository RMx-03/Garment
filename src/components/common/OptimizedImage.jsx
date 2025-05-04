import { memo, useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Global image cache to prevent unnecessary reloads across rerenders
const IMAGE_CACHE = {};

// Global placeholder for uniform blur placeholders
const PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=';

// Initialize session storage cache
const initializeCache = () => {
  if (typeof window === 'undefined') return;
  
  // Check for existing cache in sessionStorage
  try {
    const cachedImages = sessionStorage.getItem('image-cache');
    if (cachedImages) {
      const parsedCache = JSON.parse(cachedImages);
      Object.keys(parsedCache).forEach(key => {
        IMAGE_CACHE[key] = parsedCache[key];
      });
    }
  } catch (e) {
    console.warn('Failed to retrieve image cache from sessionStorage', e);
  }
};

// Save cache to session storage
const saveCache = () => {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem('image-cache', JSON.stringify(IMAGE_CACHE));
  } catch (e) {
    // Ignore errors - sessionStorage might be full or disabled
  }
};

// Initialize cache on load
initializeCache();

// Save cache on beforeunload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', saveCache);
  
  // Also periodically save the cache to ensure persistence
  setInterval(saveCache, 5000);
}

// Preload an image into both the browser cache and our in-memory cache
const preloadImage = (src) => {
  if (!src || IMAGE_CACHE[src]) return;
  
  // Set a cache entry to prevent duplicate loads
  IMAGE_CACHE[src] = true;
  
  // Force browser to cache the image
  const img = new Image();
  img.src = src;
  
  // Try to store in sessionStorage if needed
  saveCache();
};

// Custom areEqual function for memo to ensure deep comparison of props
const areEqual = (prevProps, nextProps) => {
  // Always consider the same src as equal (prevents reloading)
  if (prevProps.src === nextProps.src) {
    return true;
  }
  
  // Otherwise do a shallow comparison of all props
  return Object.keys(prevProps).every(key => {
    return prevProps[key] === nextProps[key];
  });
};

export const OptimizedImage = memo(({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  priority = false,
  placeholder = 'blur',
  afterLoad,
  ...props
}) => {
  const loadedRef = useRef(false);
  const mountedRef = useRef(true);
  const [isVisible, setIsVisible] = useState(false);
  const [loadStarted, setLoadStarted] = useState(false);
  
  // Handle empty or invalid src
  const imageSrc = useMemo(() => src || '/images/products/placeholder.jpg', [src]);
  
  // Generate blur data URL for placeholder if needed using useMemo
  const blurDataURL = useMemo(() => {
    return placeholder === 'blur' ? PLACEHOLDER : undefined;
  }, [placeholder]);
  
  // Mark component as mounted to prevent memory leaks
  useEffect(() => {
    // Check if image is already in cache
    if (IMAGE_CACHE[imageSrc]) {
      loadedRef.current = true;
      setLoadStarted(true);
      
      // Call afterLoad callback if provided and image was in cache
      if (typeof afterLoad === 'function') {
        afterLoad();
      }
    }
    
    // Mark as mounted
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
    };
  }, [imageSrc, afterLoad]);
  
  // Pre-cache the image on mount
  useEffect(() => {
    if (priority || IMAGE_CACHE[imageSrc]) {
      // Start loading immediately for priority images
      setLoadStarted(true);
      preloadImage(imageSrc);
    }
  }, [imageSrc, priority]);
  
  // Intersection observer to detect when image enters viewport
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || priority) {
      // If no IntersectionObserver or priority image, load immediately
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    
    // Start observing after a small delay to prevent flashes on fast scrolling
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        observer.observe(document.body);
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [priority]);
  
  // When image becomes visible in viewport, start loading
  useEffect(() => {
    if (isVisible && !loadStarted) {
      setLoadStarted(true);
    }
  }, [isVisible, loadStarted]);
  
  // Handle image load only once
  const handleLoad = useCallback(() => {
    if (!loadedRef.current && mountedRef.current) {
      loadedRef.current = true;
      
      // Cache this image
      IMAGE_CACHE[imageSrc] = true;
      saveCache();
      
      // Call afterLoad callback if provided
      if (typeof afterLoad === 'function') {
        afterLoad();
      }
    }
  }, [imageSrc, afterLoad]);

  // Force loading with native img if in cache already
  if (IMAGE_CACHE[imageSrc] && priority) {
    return (
      <img
        src={imageSrc}
        alt={alt || 'Image'}
        className={className}
        width={width}
        height={height}
        loading="eager"
        onLoad={handleLoad}
        {...props}
      />
    );
  }

  // Show nothing until visible (unless priority)
  if (!isVisible && !priority && !loadStarted) {
    return <div className={className} style={{ width, height, backgroundColor: '#f3f4f6' }} />;
  }

  return (
    <LazyLoadImage
      src={loadStarted ? imageSrc : undefined}
      alt={alt || 'Image'}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      effect={placeholder === 'blur' ? 'blur' : 'opacity'}
      placeholderSrc={blurDataURL}
      wrapperClassName="block"
      afterLoad={handleLoad}
      threshold={200}
      visibleByDefault={priority}
      {...props}
    />
  );
}, areEqual);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 