import { lazy, Suspense, memo } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Loader from '../components/loader/Loader';

// Lazy-loaded components
const Hero = lazy(() => import('../components/home/Hero'));
const Marquee = lazy(() => import('../components/home/Marquee'));
const CategoryGrid = lazy(() => import('../components/home/CategoryGrid'));
const FeaturedCollections = lazy(() => import('../components/home/FeaturedCollections'));
const MissionSection = lazy(() => import('../components/home/MissionSection'));
const TestimonialSection = lazy(() => import('../components/home/TestimonialSection'));
const ParallaxMarquee = lazy(() => import('../components/home/ParallexMarquee'));

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
    <ParallaxMarquee />    
    <FeaturedCollections />
    
    {/* <Marquee /> */}
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
        <Suspense fallback={<Loader text="GARMENTS" spinDuration={8} />}>
          <HomeContent />
        </Suspense>
      </m.div>
    </LazyMotion>
  );
});

Home.displayName = 'Home';

export default Home;