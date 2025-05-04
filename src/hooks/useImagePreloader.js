import { useEffect, useRef } from 'react';
import { useLoading } from '../components/loader/LoadingProvider';

/**
 * Custom hook to preload images for faster display
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 * @param {string} componentId - Unique identifier for tracking loading state
 * @param {number} timeout - Maximum time to wait for preloading in ms
 */
const useImagePreloader = (imageUrls, componentId, timeout = 5000) => {
  const { registerComponent, componentLoaded } = useLoading();
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    // Skip if no images
    if (!imageUrls || imageUrls.length === 0) return;
    
    const preloaderId = componentId || `preloader-${Date.now()}`;
    
    // Register this preloader
    registerComponent(preloaderId);
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    let isCompleted = false;
    
    // Set a safety timeout to prevent hanging on slow images
    timeoutRef.current = setTimeout(() => {
      if (!isCompleted) {
        console.log(`Image preloader ${preloaderId} timed out after ${timeout}ms`);
        componentLoaded(preloaderId);
        isCompleted = true;
      }
    }, timeout);
    
    // Handle image load event
    const handleImageLoad = () => {
      loadedCount++;
      
      // If all images are loaded, mark the component as loaded
      if (loadedCount === totalImages && !isCompleted) {
        clearTimeout(timeoutRef.current);
        componentLoaded(preloaderId);
        isCompleted = true;
      }
    };
    
    // Batch preloading in smaller chunks to reduce lag
    const batchSize = 3; // Process 3 images at a time
    const batches = Math.ceil(imageUrls.length / batchSize);
    
    // Function to preload a batch of images
    const preloadBatch = (batchIndex) => {
      if (batchIndex >= batches || isCompleted) return;
      
      const startIdx = batchIndex * batchSize;
      const endIdx = Math.min(startIdx + batchSize, imageUrls.length);
      
      // Preload this batch
      for (let i = startIdx; i < endIdx; i++) {
        const img = new Image();
        img.onload = () => {
          handleImageLoad();
          // When this image loads, start loading the next batch if we're still going
          if (batchIndex + 1 < batches && !isCompleted) {
            setTimeout(() => preloadBatch(batchIndex + 1), 50);
          }
        };
        img.onerror = handleImageLoad; // Count errors as "loaded" to avoid hanging
        img.src = imageUrls[i];
      }
    };
    
    // Start with the first batch
    preloadBatch(0);
    
    // Clean up
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // If unmounted before loading completes, mark as complete anyway
      if (!isCompleted) {
        componentLoaded(preloaderId);
        isCompleted = true;
      }
    };
  }, [imageUrls, componentId, registerComponent, componentLoaded, timeout]);
};

export default useImagePreloader; 