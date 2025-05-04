import { useState, useCallback, memo, useEffect, useRef, useMemo } from 'react';
import { OptimizedImage } from './OptimizedImage';
import useComponentLoaded from '../../hooks/useComponentLoaded';

/**
 * A wrapper around OptimizedImage that tracks when the image is loaded
 */
const TrackedImage = memo(({ src, alt, componentId, afterLoad, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadTimeoutRef = useRef(null);
  const mountedRef = useRef(true);
  
  // Memoize the image source to prevent rerendering
  const imageSrc = useMemo(() => src, [src]);
  
  // Generate a unique component ID if none provided
  const imageId = useMemo(() => 
    componentId || `image-${imageSrc.replace(/[^a-zA-Z0-9]/g, '')}`, 
    [componentId, imageSrc]
  );
  
  // Cache references to the src to prevent rerendering
  useEffect(() => {
    // Preload the image immediately to prevent flickering
    const img = new Image();
    img.src = imageSrc;
    
    return () => {
      mountedRef.current = false;
    };
  }, [imageSrc]);
  
  // Add a fallback timeout - if image hasn't loaded in 5 seconds, consider it "loaded" anyway
  useEffect(() => {
    loadTimeoutRef.current = setTimeout(() => {
      if (!isLoaded && mountedRef.current) {
        console.log(`Image ${imageId} load timeout reached. Force completing.`);
        setIsLoaded(true);
      }
    }, 5000);
    
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [imageId, isLoaded]);
  
  // Track this image in the loading system with a shorter timeout
  useComponentLoaded(imageId, isLoaded, 0, 2000);
  
  // Handle image load complete
  const handleLoad = useCallback(() => {
    if (mountedRef.current) {
      setIsLoaded(true);
      if (afterLoad) {
        afterLoad();
      }
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    }
  }, [afterLoad]);
  
  // Memoize the props to prevent unnecessary re-renders
  const optimizedProps = useMemo(() => {
    return {
      src: imageSrc,
      alt: alt || 'Image',
      afterLoad: handleLoad,
      ...props
    };
  }, [imageSrc, alt, handleLoad, props]);
  
  return <OptimizedImage {...optimizedProps} />;
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  // Only re-render if src or essential props change
  return (
    prevProps.src === nextProps.src && 
    prevProps.alt === nextProps.alt &&
    prevProps.className === nextProps.className
  );
});

TrackedImage.displayName = 'TrackedImage';

export default TrackedImage; 