import { memo, useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FeaturedProductCard from '../product/FeaturedProductCard';
import { getFeaturedCatalog } from '../../data/products';
import useComponentLoaded from '../../hooks/useComponentLoaded';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Pre-fetch the featured catalog once and store it globally to prevent reloading
const FEATURED_PRODUCTS = getFeaturedCatalog();

// Custom comparison function to prevent unnecessary rerenders
const areEqual = () => true; // This component's props never change

const FeaturedShowcase = memo(() => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isInitialMountRef = useRef(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Use useMemo to prevent re-computation on each render - reference the global catalog
  const featuredProducts = useMemo(() => FEATURED_PRODUCTS, []);
  
  // Register this component in the loading system only on the first mount
  useEffect(() => {
    // Only register on initial mount
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
    }
    
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Register the component in the loading system
  useComponentLoaded('featured-showcase', true, 0, 1500);
  
  // Calculate dimensions of carousel items and total visible
  const updateDimensions = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const firstItem = container.querySelector('.carousel-item');
    if (!firstItem) return;
    
    const itemRect = firstItem.getBoundingClientRect();
    
    setItemWidth(itemRect.width);
    setTotalItems(featuredProducts.length);
  }, [featuredProducts.length]);
  
  // Initialize dimensions
  useEffect(() => {
    updateDimensions();
    
    // Use resize observer instead of window resize event for better performance
    if (typeof ResizeObserver !== 'undefined' && scrollContainerRef.current) {
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(scrollContainerRef.current);
      
      return () => {
        if (scrollContainerRef.current) {
          resizeObserver.unobserve(scrollContainerRef.current);
        }
        resizeObserver.disconnect();
      };
    } else {
      // Fallback to window resize
      window.addEventListener('resize', updateDimensions);
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, [updateDimensions]);
  
  // Smooth scroll to an item
  const scrollToItem = useCallback((index) => {
    if (!scrollContainerRef.current || isAnimating) return;
    
    const validIndex = Math.max(0, Math.min(index, totalItems - 1));
    
    if (validIndex === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(validIndex);
    
    const container = scrollContainerRef.current;
    const scrollLeft = validIndex * itemWidth;
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
    
    // Clear animation flag after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [activeIndex, totalItems, itemWidth, isAnimating]);
  
  // Navigation handlers
  const handlePrev = useCallback(() => {
    scrollToItem(activeIndex - 1);
  }, [activeIndex, scrollToItem]);
  
  const handleNext = useCallback(() => {
    scrollToItem(activeIndex + 1);
  }, [activeIndex, scrollToItem]);
  
  // Handle scroll end for proper position
  const handleScrollEnd = useCallback(() => {
    if (!scrollContainerRef.current || isDraggingRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    const index = Math.round(scrollPosition / itemWidth);
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [activeIndex, itemWidth]);
  
  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    let scrollTimeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 100);
    };
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScrollEnd]);
  
  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  }, []);
  
  const handleTouchMove = useCallback((e) => {
    touchEndXRef.current = e.touches[0].clientX;
    
    // Prevent default only if significant horizontal motion detected
    const diffX = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diffX) > 10) {
      e.preventDefault();
    }
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    const diffX = touchStartXRef.current - touchEndXRef.current;
    
    if (Math.abs(diffX) > 50) { // Threshold for swipe
      if (diffX > 0) {
        // Swiped left - go next
        handleNext();
      } else {
        // Swiped right - go prev
        handlePrev();
      }
    }
  }, [handleNext, handlePrev]);
  
  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = scrollContainerRef.current?.scrollLeft || 0;
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'auto';
      scrollContainerRef.current.style.cursor = 'grabbing';
    }
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    
    const dx = e.clientX - dragStartXRef.current;
    scrollContainerRef.current.scrollLeft = dragStartScrollRef.current - dx;
  }, []);
  
  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    
    isDraggingRef.current = false;
    document.body.style.removeProperty('user-select');
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'smooth';
      scrollContainerRef.current.style.cursor = 'grab';
      
      // Snap to closest item
      handleScrollEnd();
    }
  }, [handleScrollEnd]);
  
  // Cleanup
  useEffect(() => {
    return () => {
      document.body.style.removeProperty('user-select');
    };
  }, []);
  
  // Indicator click handler
  const handleIndicatorClick = useCallback((index) => {
    scrollToItem(index);
  }, [scrollToItem]);
  
  // Memoize the carousel items to prevent re-rendering
  const carouselItems = useMemo(() => (
    featuredProducts.map((product, index) => (
      <div 
        key={product.id} 
        className="carousel-item flex-none w-[calc(100vw-3.5rem)] sm:w-[380px] md:w-[420px] lg:w-[450px] h-[450px] sm:h-[480px] md:h-[520px] lg:h-[550px] mx-1 md:mx-2 snap-center"
        data-index={index}
      >
        <FeaturedProductCard product={product} isMobile={isMobile} />
      </div>
    ))
  ), [featuredProducts, isMobile]);
  
  // Memoize the indicators to prevent re-rendering
  const indicators = useMemo(() => (
    featuredProducts.map((_, index) => (
      <button
        key={index}
        className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
          index === activeIndex ? 'bg-gray-800' : 'bg-gray-300'
        }`}
        onClick={() => handleIndicatorClick(index)}
        aria-label={`Go to slide ${index + 1}`}
        aria-current={index === activeIndex ? 'true' : 'false'}
      />
    ))
  ), [featuredProducts, activeIndex, handleIndicatorClick]);
  
  // Memoize mouse and touch event handlers
  const touchHandlers = useMemo(() => ({
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  }), [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  ]);
  
  // Memoize navigation button classNames
  const prevButtonClassName = useMemo(() => (
    `absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 shadow-md hover:bg-gray-800 transition featured-showcase-nav-button ${
      activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
    }`
  ), [activeIndex]);
  
  const nextButtonClassName = useMemo(() => (
    `absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 shadow-md hover:bg-gray-800 transition featured-showcase-nav-button ${
      activeIndex === totalItems - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
    }`
  ), [activeIndex, totalItems]);
  
  return (
    <section className="bg-gray-50 bg-grainy-light py-12 sm:py-16 w-full overflow-hidden will-change-transform">
      {/* Header with normal width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 prata-regular tracking-tight">
            Featured
          </h2>
          <Link 
            to="/catalog" 
            className="text-sm font-medium text-gray-900 outfit-regular hover:text-black flex items-center group"
          >
            Catalog
            <FiArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
      {/* Carousel container with wider padding for arrow placement */}
      <div className="relative w-full px-8 md:px-12">
        {/* Navigation buttons (only visible on larger screens) - now positioned outside cards */}
        <div className="hidden md:block">
          <button
            className={prevButtonClassName}
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous product"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            className={nextButtonClassName}
            onClick={handleNext}
            disabled={activeIndex === totalItems - 1}
            aria-label="Next product"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Items wrapper */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory will-change-transform"
          style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
          {...touchHandlers}
        >
          {/* Left spacing - reduced */}
          <div className="pl-2 md:pl-4 flex-none"></div>
          
          {/* Carousel items */}
          {carouselItems}
          
          {/* Right spacing - reduced */}
          <div className="pr-2 md:pr-4 flex-none"></div>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {indicators}
          </div>
        </div>
      </div>
    </section>
  );
}, areEqual);

FeaturedShowcase.displayName = 'FeaturedShowcase';

export default FeaturedShowcase; 