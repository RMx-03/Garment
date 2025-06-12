import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

// Create context for loading state
const LoadingContext = createContext({
  isLoading: false,
  setLoading: () => {},
  registerComponent: () => {},
  componentLoaded: () => {},
});

// Hook to use loading context
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false); // Start with false to prevent initial flash
  const [pendingComponents, setPendingComponents] = useState(new Set());
  const componentRegistry = useRef(new Map());
  const loadingTimeoutRef = useRef(null);
  const firstLoadRef = useRef(true);
  
  // Register a component that needs to load
  const registerComponent = useCallback((componentId) => {
    // Track registration time
    componentRegistry.current.set(componentId, Date.now());
    
    setPendingComponents(prev => {
      const newSet = new Set(prev);
      newSet.add(componentId);
      return newSet;
    });
  }, []);
  
  // Mark a component as loaded
  const componentLoaded = useCallback((componentId) => {
    componentRegistry.current.delete(componentId);
    
    setPendingComponents(prev => {
      const newSet = new Set(prev);
      newSet.delete(componentId);
      return newSet;
    });
  }, []);
  
  // Set loading state directly (for manual control)
  const setLoading = useCallback((state) => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    if (state) {
      setIsLoading(true);
      // Set a maximum loading time of 6 seconds (reduced from 8)
      loadingTimeoutRef.current = setTimeout(() => {
        console.log('Loading timeout reached. Force completing loading.');
        setPendingComponents(new Set());
        setIsLoading(false);
        firstLoadRef.current = false;
      }, 6000);
    } else {
      // Add a small delay only for the first load to ensure smooth transition
      const delay = firstLoadRef.current ? 300 : 100;
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        firstLoadRef.current = false;
      }, delay);
    }
  }, []);
  
  // Check for stalled components (taking too long)
  useEffect(() => {
    const COMPONENT_TIMEOUT = 3000; // Reduced from 5000ms
    const interval = setInterval(() => {
      const now = Date.now();
      const stalledComponents = [];
      
      componentRegistry.current.forEach((registeredTime, componentId) => {
        if (now - registeredTime > COMPONENT_TIMEOUT) {
          stalledComponents.push(componentId);
        }
      });
      
      if (stalledComponents.length > 0) {
        console.log(`Components [${stalledComponents.join(', ')}] took too long to load. Force completing.`);
        stalledComponents.forEach(componentId => {
          componentLoaded(componentId);
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [componentLoaded]);
  
  // Update loading state based on pending components
  useEffect(() => {
    if (pendingComponents.size === 0) {
      // Only hide loader if we have pending components that finished
      if (componentRegistry.current.size === 0) {
        setLoading(false);
      }
    } else if (pendingComponents.size > 0 && !isLoading) {
      setLoading(true);
    }
  }, [pendingComponents, setLoading, isLoading]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      setLoading, 
      registerComponent, 
      componentLoaded 
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider; 