import { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useComponentLoaded from '../../hooks/useComponentLoaded';

// Community images - can be changed later as needed
const communityImages = [
  {
    id: 1,
    src: '/images/products/pexels-cup-of-couple-6634909.webp',
    alt: 'Community member wearing Le Flair Studios clothing'
  },
  {
    id: 2,
    src: '/images/products/karsten-winegeart-5Y3pdONPEHE-unsplash.webp',
    alt: 'Person showcasing Le Flair Studios style'
  },
  {
    id: 3,
    src: '/images/products/shalom-ejiofor-YLSBNapbXXY-unsplash.webp',
    alt: 'Le Flair Studios community fashion'
  },
  {
    id: 4,
    src: '/images/products/marcel-strauss-JiBaSCt8KDo-unsplash.webp',
    alt: 'Stylish person in Le Flair Studios apparel'
  },
  {
    id: 5,
    src: '/images/products/karsten-winegeart-G3TiavJKCpY-unsplash.webp', 
    alt: 'Individual expressing their unique style'
  },
  {
    id: 6,
    src: '/images/products/molly-archer-BTdHmE4jst8-unsplash.webp',
    alt: 'Fashion forward individual in Le Flair Studios clothing'
  }
];

// Track if the component has been loaded before
let isComponentLoaded = false;

const CommunitySection = memo(() => {
  // State for tracking which image is currently shown in the main display
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(isComponentLoaded);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const autoPlayTimerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  
  // Register this component for loading state management
  const { markAsLoaded } = useComponentLoaded('community-section', imagesLoaded);
  
  // Function to preload all images
  useEffect(() => {
    if (isComponentLoaded) {
      setImagesLoaded(true);
      markAsLoaded();
      return;
    }
    
    let loadedCount = 0;
    const totalImages = communityImages.length;
    
    communityImages.forEach(image => {
      const img = new Image();
      img.onload = () => {
        if (isMountedRef.current) {
          loadedCount++;
          if (loadedCount === totalImages) {
            isComponentLoaded = true;
            setImagesLoaded(true);
            markAsLoaded();
          }
        }
      };
      img.src = image.src;
    });
    
    return () => {
      isMountedRef.current = false;
    };
  }, [markAsLoaded]);
  
  // Auto-play functionality with progress indicator
  useEffect(() => {
    if (isAutoPlaying) {
      // Reset progress
      setProgressPercent(0);
      
      // Start progress animation
      const startTime = Date.now();
      const duration = 5000; // 5 seconds per slide
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setProgressPercent(progress);
        
        if (progress < 100 && isMountedRef.current) {
          progressTimerRef.current = requestAnimationFrame(updateProgress);
        }
      };
      
      progressTimerRef.current = requestAnimationFrame(updateProgress);
      
      // Set up the interval to change images
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % communityImages.length);
        setProgressPercent(0);
        
        // Reset progress animation
        if (progressTimerRef.current) {
          cancelAnimationFrame(progressTimerRef.current);
        }
        
        const newStartTime = Date.now();
        const newUpdateProgress = () => {
          const elapsed = Date.now() - newStartTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          setProgressPercent(progress);
          
          if (progress < 100 && isMountedRef.current) {
            progressTimerRef.current = requestAnimationFrame(newUpdateProgress);
          }
        };
        
        progressTimerRef.current = requestAnimationFrame(newUpdateProgress);
      }, 5000); // Change image every 5 seconds
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      if (progressTimerRef.current) {
        cancelAnimationFrame(progressTimerRef.current);
      }
    };
  }, [isAutoPlaying, currentImageIndex]);
  
  // Handle swipe gestures for mobile
  const touchStartXRef = useRef(null);
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartXRef.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    
    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, show next image
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % communityImages.length);
      } else {
        // Swipe right, show previous image
        setCurrentImageIndex(prevIndex => 
          prevIndex === 0 ? communityImages.length - 1 : prevIndex - 1
        );
      }
      
      // Reset progress
      setProgressPercent(0);
      
      // Reset autoplay timer
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      if (progressTimerRef.current) {
        cancelAnimationFrame(progressTimerRef.current);
      }
      
      if (isAutoPlaying) {
        // Restart timers
        const startTime = Date.now();
        const duration = 5000;
        
        const updateProgress = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          setProgressPercent(progress);
          
          if (progress < 100 && isMountedRef.current) {
            progressTimerRef.current = requestAnimationFrame(updateProgress);
          }
        };
        
        progressTimerRef.current = requestAnimationFrame(updateProgress);
        
        autoPlayTimerRef.current = setInterval(() => {
          setCurrentImageIndex(prevIndex => (prevIndex + 1) % communityImages.length);
          setProgressPercent(0);
          
          if (progressTimerRef.current) {
            cancelAnimationFrame(progressTimerRef.current);
          }
          
          const newStartTime = Date.now();
          const newUpdateProgress = () => {
            const elapsed = Date.now() - newStartTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            setProgressPercent(progress);
            
            if (progress < 100 && isMountedRef.current) {
              progressTimerRef.current = requestAnimationFrame(newUpdateProgress);
            }
          };
          
          progressTimerRef.current = requestAnimationFrame(newUpdateProgress);
        }, 5000);
      }
    }
    
    touchStartXRef.current = null;
  };
  
  // Switch to a specific image
  const showImage = (index) => {
    setCurrentImageIndex(index);
    setProgressPercent(0);
    
    // Reset auto-play timer when manually changing images
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    if (progressTimerRef.current) {
      cancelAnimationFrame(progressTimerRef.current);
    }
    
    if (isAutoPlaying) {
      // Restart progress animation
      const startTime = Date.now();
      const duration = 5000;
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setProgressPercent(progress);
        
        if (progress < 100 && isMountedRef.current) {
          progressTimerRef.current = requestAnimationFrame(updateProgress);
        }
      };
      
      progressTimerRef.current = requestAnimationFrame(updateProgress);
      
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % communityImages.length);
        setProgressPercent(0);
        
        if (progressTimerRef.current) {
          cancelAnimationFrame(progressTimerRef.current);
        }
        
        const newStartTime = Date.now();
        const newUpdateProgress = () => {
          const elapsed = Date.now() - newStartTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          setProgressPercent(progress);
          
          if (progress < 100 && isMountedRef.current) {
            progressTimerRef.current = requestAnimationFrame(newUpdateProgress);
          }
        };
        
        progressTimerRef.current = requestAnimationFrame(newUpdateProgress);
      }, 5000);
    }
  };
  
  return (
    <section className="w-full py-12 md:py-16 bg-white bg-grainy-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile heading - visible only on smaller screens */}
        <h2 className="text-3xl md:text-4xl font-normal mb-6 text-black prata-regular text-center lg:hidden">
          Join the Community
        </h2>
        
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 pr-0 lg:pr-12 mb-10 lg:mb-0">
            {/* Desktop heading - hidden on mobile */}
            <h2 className="text-4xl md:text-5xl font-normal mb-6 text-black prata-regular hidden lg:block">
              Join the Community
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-base md:text-lg outfit-regular mb-6">
                At Le Flair Studios, we believe that everyone has their own unique
                flair a special something that differentiates you from everyone else.
                It is in your DNA, and we want you to magnify it, not erase it.
              </p>
              <p className="text-base md:text-lg outfit-regular mb-8">
                Our community is built around celebrating individual style and personal expression.
                When you wear our pieces, you're not just wearing clothes – you're making a statement
                about who you are and the values you stand for.
              </p>
              <Link 
                to="/about" 
                className="inline-block bg-black text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-all duration-300 hover:bg-gray-800 outfit-regular focus:ring-2 focus:ring-gray-500 focus:outline-none"
              >
                About Us
              </Link>
            </div>
          </div>
          
          {/* Right side - Image gallery */}
          <div className="lg:w-1/2 relative">
            {/* Current slide counter for accessibility */}
            <div className="sr-only" aria-live="polite">
              Showing slide {currentImageIndex + 1} of {communityImages.length}
            </div>
            
            {/* Main large image */}
            <div 
              className="relative overflow-hidden rounded-lg aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/3] lg:aspect-[4/5] mb-4"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {communityImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out transform ${
                    index === currentImageIndex 
                      ? 'opacity-100 z-10 scale-100' 
                      : 'opacity-0 z-0 scale-[1.05]'
                  }`}
                  style={{
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '700ms, 700ms',
                    willChange: 'opacity, transform'
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover object-center"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
              
              {/* Loading placeholder */}
              {!imagesLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              )}
              
              {/* Image indicators for mobile */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                {communityImages.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => showImage(index)}
                    className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Navigation arrows for desktop - only shown on larger screens */}
              <div className="hidden md:flex justify-between w-full absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none px-4 z-20">
                <button 
                  onClick={() => setCurrentImageIndex(prevIndex => prevIndex === 0 ? communityImages.length - 1 : prevIndex - 1)}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center transform transition-transform duration-300 hover:scale-110 pointer-events-auto"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => setCurrentImageIndex(prevIndex => (prevIndex + 1) % communityImages.length)}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center transform transition-transform duration-300 hover:scale-110 pointer-events-auto"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Thumbnail row */}
            <div className="flex -mx-1 overflow-x-auto pb-2 hide-scrollbar">
              {communityImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => showImage(index)}
                  className={`relative mx-1 min-w-[60px] sm:min-w-[80px] h-16 sm:h-20 rounded overflow-hidden transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'ring-1 ring-black scale-105 opacity-100' 
                      : 'ring-0 opacity-80 hover:opacity-100'
                  }`}
                  aria-label={`View ${image.alt}`}
                  aria-pressed={index === currentImageIndex}
                >
                  <img
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  
                  {/* Black overlay - only for active thumbnail */}
                  {index === currentImageIndex && (
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-50"
                      style={{
                        clipPath: `inset(0 ${100 - progressPercent}% 0 0)`,
                        transition: 'clip-path 0.3s ease'
                      }}
                    ></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CommunitySection.displayName = 'CommunitySection';

export default CommunitySection; 