import { lazy, Suspense, memo, useMemo, useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useLoading } from '../components/loader/LoadingProvider';
import useComponentLoaded from '../hooks/useComponentLoaded';
import useImagePreloader from '../hooks/useImagePreloader';

// Global component cache to prevent reloading components between navigations
const COMPONENT_CACHE = {};

// Lazy-loaded components with caching wrapper
const createCachedComponent = (importFn, name) => {
  if (!COMPONENT_CACHE[name]) {
    COMPONENT_CACHE[name] = lazy(importFn);
  }
  return COMPONENT_CACHE[name];
};

// Cached component instances
const Hero = createCachedComponent(() => import('../components/home/Hero'), 'Hero');
const CommunitySection = createCachedComponent(() => import('../components/home/CommunitySection'), 'CommunitySection');
const FeaturedCollections = createCachedComponent(() => import('../components/home/FeaturedCollections'), 'FeaturedCollections');
const FeaturedShowcase = createCachedComponent(() => import('../components/home/FeaturedShowcase'), 'FeaturedShowcase');
const MissionSection = createCachedComponent(() => import('../components/home/MissionSection'), 'MissionSection');
const TestimonialSection = createCachedComponent(() => import('../components/home/TestimonialSection'), 'TestimonialSection');
const ParallaxMarquee = createCachedComponent(() => import('../components/home/ParallexMarquee'), 'ParallaxMarquee');
const FullWidthImageSection = createCachedComponent(() => import('../components/home/FullWidthImageSection'), 'FullWidthImageSection');

// Critical images to preload - limit to just 2-3 most important
const criticalImages = [
  '/images/products/pexels-davidedegiovanni-1649707.webp', // Hero image
  '/images/products/hendrik-morkel-xccjtrOXJ7k-unsplash.webp', // Mission section
  '/images/products/pexels-ayoub-moukhliss-1262835-22944600.webp', // Full width section
  '/images/products/pexels-cup-of-couple-6634909.webp' // Community section main image
];

// Pre-load critical images immediately
if (typeof window !== 'undefined') {
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

// Create a component that tracks when lazy-loaded components are mounted
const LazyComponentTracker = memo(({ componentId, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef(null);
  
  // Only track the Hero and first visible components
  const isPriority = componentId === 'home-hero-section' || 
                    componentId === 'home-parallax-section' ||
                    componentId === 'home-featured-section';
  
  // Register this component in the loading system with a short timeout for non-priority items
  useComponentLoaded(
    componentId, 
    isMounted, 
    0, 
    isPriority ? 3000 : 1000 // Shorter timeout for non-priority components
  );
  
  // Mark as mounted after rendering
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsMounted(true);
    }, 100); // Small delay to ensure the component had time to render
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  return children;
});

// Pre-cache the Hero component to avoid rerendering
const CachedHero = memo(() => (
  <LazyComponentTracker componentId="home-hero-section">
    <Hero />
  </LazyComponentTracker>
));
CachedHero.displayName = 'CachedHero';

// Pre-memoize all section components to prevent re-renders
const CachedParallaxMarquee = memo(() => (
  <LazyComponentTracker componentId="home-parallax-section">
    <ParallaxMarquee />
  </LazyComponentTracker>
));
CachedParallaxMarquee.displayName = 'CachedParallaxMarquee';

const CachedFeaturedCollections = memo(() => (
  <LazyComponentTracker componentId="home-featured-section">
    <FeaturedCollections />
  </LazyComponentTracker>
));
CachedFeaturedCollections.displayName = 'CachedFeaturedCollections';

// New full width image section component
const CachedFullWidthImageSection = memo(() => (
  <LazyComponentTracker componentId="home-fullwidth-image-section">
    <FullWidthImageSection />
  </LazyComponentTracker>
));
CachedFullWidthImageSection.displayName = 'CachedFullWidthImageSection';

const CachedFeaturedShowcase = memo(() => (
  <LazyComponentTracker componentId="home-showcase-section">
    <FeaturedShowcase />
  </LazyComponentTracker>
));
CachedFeaturedShowcase.displayName = 'CachedFeaturedShowcase';

const CachedCommunitySection = memo(() => (
  <LazyComponentTracker componentId="home-community-section">
    <CommunitySection />
  </LazyComponentTracker>
));
CachedCommunitySection.displayName = 'CachedCommunitySection';

const CachedTestimonialSection = memo(() => (
  <LazyComponentTracker componentId="home-testimonial-section">
    <TestimonialSection />
  </LazyComponentTracker>
));
CachedTestimonialSection.displayName = 'CachedTestimonialSection';

const CachedMissionSection = memo(() => (
  <LazyComponentTracker componentId="home-mission-section">
    <MissionSection />
  </LazyComponentTracker>
));
CachedMissionSection.displayName = 'CachedMissionSection';

// Memoize the content wrapper
const HomeContent = memo(() => {
  // Register the home content in the loading system with a short timeout
  useComponentLoaded('home-content', true, 0, 2000);
  
  // Mark the page as initially loaded after a reasonable timeout
  const { setLoading } = useLoading();
  const forceLoadTimerRef = useRef(null);
  
  useEffect(() => {
    // Force hide the loader after 5 seconds no matter what
    forceLoadTimerRef.current = setTimeout(() => {
      setLoading(false);
    }, 5000);
    
    return () => {
      if (forceLoadTimerRef.current) {
        clearTimeout(forceLoadTimerRef.current);
      }
    };
  }, [setLoading]);
  
  // Use useMemo for the entire content to prevent re-rendering
  const content = useMemo(() => (
    <>
      <CachedHero />
      <CachedParallaxMarquee />
      <CachedFeaturedCollections />
      <CachedFullWidthImageSection />
      <CachedFeaturedShowcase />
      <CachedCommunitySection />
      <CachedTestimonialSection />
      <CachedMissionSection />
    </>
  ), []);
  
  return content;
});

HomeContent.displayName = 'HomeContent';

const Home = memo(() => {
  // Register that the Home page is loading with a short timeout
  useComponentLoaded('home-page', true, 0, 2000);
  
  // Preload only the most critical images with a short timeout
  useImagePreloader(criticalImages, 'home-critical-images', 3000);
  
  // Use useMemo for transition animation to avoid recreating it on each render
  const animationProps = useMemo(() => pageTransition, []);

  // Memoize the suspense component to prevent rerenders
  const content = useMemo(() => (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  ), []);

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        className="w-full will-change-transform"
        {...animationProps}
      >
        {content}
      </m.div>
    </LazyMotion>
  );
});

Home.displayName = 'Home';

export default Home;