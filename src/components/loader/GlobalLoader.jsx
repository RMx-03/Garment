import { useLoading } from './LoadingProvider';
import Loader from './Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

// Using memo to prevent unnecessary re-renders
const GlobalLoader = memo(({ text = 'GARMENTS', spinDuration = 8 }) => {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
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