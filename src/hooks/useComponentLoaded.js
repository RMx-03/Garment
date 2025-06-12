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
  const componentIdRef = useRef(componentId);
  
  // Update componentId ref when it changes
  useEffect(() => {
    componentIdRef.current = componentId;
  }, [componentId]);
  
  // Handle registration and cleanup
  useEffect(() => {
    const currentComponentId = componentIdRef.current;
    
    // Only register if this is the first time and component hasn't reported loaded yet
    if (!isRegisteredRef.current && !hasReportedLoadedRef.current) {
      registerComponent(currentComponentId);
      isRegisteredRef.current = true;
      
      // Set a safety timeout to prevent infinite loading
      timeoutIdRef.current = setTimeout(() => {
        if (!hasReportedLoadedRef.current) {
          componentLoaded(currentComponentId);
          hasReportedLoadedRef.current = true;
        }
      }, timeout);
    }
    
    // Clean up on unmount if not yet loaded
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      
      if (delayIdRef.current) {
        clearTimeout(delayIdRef.current);
      }
      
      if (!hasReportedLoadedRef.current) {
        componentLoaded(currentComponentId);
        hasReportedLoadedRef.current = true;
      }
    };
  }, [registerComponent, componentLoaded, timeout]);
  
  // Handle isLoaded changes
  useEffect(() => {
    const currentComponentId = componentIdRef.current;
    
    // Mark as loaded when isLoaded becomes true
    if (isLoaded && !hasReportedLoadedRef.current) {
      // Clear any existing timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      
      // Add delay if specified for visual stability
      if (delay > 0) {
        delayIdRef.current = setTimeout(() => {
          if (!hasReportedLoadedRef.current) {
            componentLoaded(currentComponentId);
            hasReportedLoadedRef.current = true;
          }
        }, delay);
      } else {
        componentLoaded(currentComponentId);
        hasReportedLoadedRef.current = true;
      }
    }
    
    return () => {
      if (delayIdRef.current) {
        clearTimeout(delayIdRef.current);
      }
    };
  }, [isLoaded, componentLoaded, delay]);
  
  // Return a function to manually report as loaded
  return {
    markAsLoaded: () => {
      const currentComponentId = componentIdRef.current;
      if (!hasReportedLoadedRef.current) {
        // Clear any existing timeouts
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
        if (delayIdRef.current) {
          clearTimeout(delayIdRef.current);
          delayIdRef.current = null;
        }
        
        componentLoaded(currentComponentId);
        hasReportedLoadedRef.current = true;
      }
    }
  };
};

export default useComponentLoaded; 