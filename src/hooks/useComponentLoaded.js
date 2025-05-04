import { useEffect, useRef } from 'react';
import { useLoading } from '../components/loader/LoadingProvider';

/**
 * Custom hook for components to register themselves for loading state management
 * @param {string} componentId - Unique identifier for the component
 * @param {boolean} isLoaded - Whether the component is loaded
 * @param {number} delay - Optional delay in ms before marking component as loaded (for visual stability)
 * @param {number} timeout - Optional timeout in ms to auto-mark as loaded even if isLoaded never becomes true
 */
const useComponentLoaded = (componentId, isLoaded = false, delay = 0, timeout = 3000) => {
  const { registerComponent, componentLoaded } = useLoading();
  const isRegisteredRef = useRef(false);
  const hasReportedLoadedRef = useRef(false);
  const timeoutIdRef = useRef(null);
  const delayIdRef = useRef(null);
  
  // Handle registration and cleanup
  useEffect(() => {
    // Only register if this is the first time and component hasn't reported loaded yet
    if (!isRegisteredRef.current && !hasReportedLoadedRef.current) {
      registerComponent(componentId);
      isRegisteredRef.current = true;
    }
    
    // Set a safety timeout to prevent infinite loading
    timeoutIdRef.current = setTimeout(() => {
      if (!hasReportedLoadedRef.current) {
        console.log(`Component ${componentId} timed out. Auto-marking as loaded.`);
        componentLoaded(componentId);
        hasReportedLoadedRef.current = true;
      }
    }, timeout);
    
    // Clean up on unmount if not yet loaded
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      
      if (delayIdRef.current) {
        clearTimeout(delayIdRef.current);
      }
      
      if (!hasReportedLoadedRef.current) {
        componentLoaded(componentId);
        hasReportedLoadedRef.current = true;
      }
    };
  }, [componentId, registerComponent, componentLoaded, timeout]);
  
  // Handle isLoaded changes
  useEffect(() => {
    // Mark as loaded when isLoaded becomes true
    if (isLoaded && !hasReportedLoadedRef.current) {
      // Add delay if specified for visual stability
      if (delay > 0) {
        delayIdRef.current = setTimeout(() => {
          componentLoaded(componentId);
          hasReportedLoadedRef.current = true;
        }, delay);
      } else {
        componentLoaded(componentId);
        hasReportedLoadedRef.current = true;
      }
    }
    
    return () => {
      if (delayIdRef.current) {
        clearTimeout(delayIdRef.current);
      }
    };
  }, [componentId, isLoaded, componentLoaded, delay]);
  
  // Return a function to manually report as loaded
  return {
    markAsLoaded: () => {
      if (!hasReportedLoadedRef.current) {
        componentLoaded(componentId);
        hasReportedLoadedRef.current = true;
      }
    }
  };
};

export default useComponentLoaded; 