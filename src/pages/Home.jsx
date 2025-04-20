import { lazy, Suspense } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

// Lazy-loaded components
const Hero = lazy(() => import('../components/home/Hero'));
const CategoryGrid = lazy(() => import('../components/home/CategoryGrid'));
const FeaturedCollections = lazy(() => import('../components/home/FeaturedCollections'));
const MissionSection = lazy(() => import('../components/home/MissionSection'));
const TestimonialSection = lazy(() => import('../components/home/TestimonialSection'));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-96" }) => (
  <div className={`${height} animate-pulse bg-gray-100 rounded-lg`} />
);

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

const Home = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        className="w-full"
        {...pageTransition}
      >
        <Suspense fallback={<LoadingPlaceholder height="h-screen" />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<LoadingPlaceholder />}>
          <CategoryGrid />
        </Suspense>
        
        <Suspense fallback={<LoadingPlaceholder />}>
          <FeaturedCollections />
        </Suspense>

        <Suspense fallback={<LoadingPlaceholder />}>
          <TestimonialSection />
        </Suspense>

        <Suspense fallback={<LoadingPlaceholder />}>
          <MissionSection />
        </Suspense>
      </m.div>
    </LazyMotion>
  );
};

export default Home;