import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

// Create context for loading state
const LoadingContext = createContext({
  isLoading: true,
  setLoading: () => {},
  registerComponent: () => {},
  componentLoaded: () => {},
});

// Hook to use loading context
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingComponents, setPendingComponents] = useState(new Set());
  const componentRegistry = useRef(new Map());
  const timeoutRef = useRef(null);
  
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
    setIsLoading(state);
  }, []);
  
  // Force complete loading after a timeout (failsafe)
  useEffect(() => {
    // Set a maximum loading time of 8 seconds
    const MAXIMUM_LOADING_TIME = 8000;
    
    if (isLoading) {
      timeoutRef.current = setTimeout(() => {
        console.log('Loading timeout reached. Force completing loading.');
        setPendingComponents(new Set());
        setIsLoading(false);
      }, MAXIMUM_LOADING_TIME);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading]);
  
  // Check for stalled components (taking too long)
  useEffect(() => {
    // Component timeout after 5 seconds
    const COMPONENT_TIMEOUT = 5000;
    const interval = setInterval(() => {
      const now = Date.now();
      let hasStalled = false;
      
      componentRegistry.current.forEach((registeredTime, componentId) => {
        if (now - registeredTime > COMPONENT_TIMEOUT) {
          console.log(`Component ${componentId} took too long to load. Force completing.`);
          componentLoaded(componentId);
          hasStalled = true;
        }
      });
      
      if (hasStalled) {
        // Force update if we cleared stalled components
        setPendingComponents(prev => new Set(prev));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [componentLoaded]);
  
  // Update loading state based on pending components
  useEffect(() => {
    if (pendingComponents.size === 0) {
      // Use a small delay to ensure smooth transitions
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [pendingComponents]);
  
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