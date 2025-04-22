import { lazy, Suspense, memo } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

// Lazy-loaded components
const Hero = lazy(() => import('../components/home/Hero'));
const Marquee = lazy(() => import('../components/home/Marquee'));
const CategoryGrid = lazy(() => import('../components/home/CategoryGrid'));
const FeaturedCollections = lazy(() => import('../components/home/FeaturedCollections'));
const MissionSection = lazy(() => import('../components/home/MissionSection'));
const TestimonialSection = lazy(() => import('../components/home/TestimonialSection'));

// Loading placeholder
const LoadingPlaceholder = memo(({ height = "h-96" }) => (
  <div className={`${height} animate-pulse bg-gray-100 rounded-lg`} />
));

LoadingPlaceholder.displayName = 'LoadingPlaceholder';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

// Memoize the content wrapper
const HomeContent = memo(() => (
  <>
    <Hero />
    <Marquee />
    <FeaturedCollections />
    <Marquee />
    <CategoryGrid />
    <TestimonialSection />
    <MissionSection />
  </>
));

HomeContent.displayName = 'HomeContent';

const Home = memo(() => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        className="w-full"
        {...pageTransition}
      >
        <Suspense fallback={<LoadingPlaceholder height="h-screen" />}>
          <HomeContent />
        </Suspense>
      </m.div>
    </LazyMotion>
  );
});

Home.displayName = 'Home';

export default Home;