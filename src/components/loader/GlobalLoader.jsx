import { useLoading } from './LoadingProvider';
import Loader from './Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

// Using memo to prevent unnecessary re-renders
const GlobalLoader = memo(({ text = 'GARMENTS', spinDuration = 8 }) => {
  const { isLoading } = useLoading();
  const [showLoader, setShowLoader] = useState(true);
  
  // Add a small delay before hiding the loader to prevent flashing
  useEffect(() => {
    if (!isLoading) {
      // Small delay before actually removing the loader from DOM
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 600); // This should be slightly longer than the exit animation
      return () => clearTimeout(timer);
    } else {
      setShowLoader(true);
    }
  }, [isLoading]);
  
  // Don't render anything if we're not showing the loader
  if (!showLoader && !isLoading) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 pointer-events-none"
        >
          <Loader text={text} spinDuration={spinDuration} />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

GlobalLoader.displayName = 'GlobalLoader';

export default GlobalLoader; 