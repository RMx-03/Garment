import { lazy, Suspense, useState, useEffect, useCallback, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import GlobalLoader from './components/loader/GlobalLoader';
import { useLoading } from './components/loader/LoadingProvider';

// Create a PageCache context to persist page components
const PageCacheContext = createContext({});

// PageCache provider to maintain rendered pages in memory
const PageCacheProvider = ({ children }) => {
  const [cache, setCache] = useState({});

  const addToCache = useCallback((path, component) => {
    setCache(prevCache => ({
      ...prevCache,
      [path]: component
    }));
  }, []);

  return (
    <PageCacheContext.Provider value={{ cache, addToCache }}>
      {children}
    </PageCacheContext.Provider>
  );
};

// Custom hook to use the page cache
const usePageCache = () => useContext(PageCacheContext);

// Global page components cache - this prevents component recreation between navigations
const PAGE_CACHE = {};

// Enhanced lazy loader that uses the global cache
const createCachedPage = (importFn, name) => {
  if (!PAGE_CACHE[name]) {
    PAGE_CACHE[name] = lazy(importFn);
  }
  return PAGE_CACHE[name];
};

// Improved lazy loading with prefetch and caching - priority order based on most visited pages
const Home = createCachedPage(() => import('./pages/Home'), 'Home');
const ProductListing = createCachedPage(() => import('./pages/ProductListing'), 'ProductListing');
const ProductDetail = createCachedPage(() => import('./pages/ProductDetail'), 'ProductDetail');
const BestSellers = createCachedPage(() => import('./pages/BestSellers'), 'BestSellers');
const NewArrivals = createCachedPage(() => import('./pages/NewArrivals'), 'NewArrivals');
const Catalog = createCachedPage(() => import('./pages/Catalog'), 'Catalog');
const HolidayGifting = createCachedPage(() => import('./pages/HolidayGifting'), 'HolidayGifting');
const Checkout = createCachedPage(() => import('./pages/Checkout'), 'Checkout');
const CheckoutSuccess = createCachedPage(() => import('./pages/CheckoutSuccess'), 'CheckoutSuccess');
const Login = createCachedPage(() => import('./pages/Login'), 'Login');
const SignUp = createCachedPage(() => import('./pages/SignUp'), 'SignUp');
const About = createCachedPage(() => import('./pages/About'), 'About');
const Sustainability = createCachedPage(() => import('./pages/Sustainability'), 'Sustainability');
const Careers = createCachedPage(() => import('./pages/Careers'), 'Careers');
const GiftCard = createCachedPage(() => import('./pages/GiftCard'), 'GiftCard');
const Stores = createCachedPage(() => import('./pages/Stores'), 'Stores');
const NotFound = createCachedPage(() => import('./pages/NotFound'), 'NotFound');

// Enhanced route component that caches the rendered component
const CachedRoute = ({ path, element: Component }) => {
  const { cache, addToCache } = usePageCache();
  const location = useLocation();

  useEffect(() => {
    // Add the current component to cache when it's rendered
    if (location.pathname === path && !cache[path]) {
      addToCache(path, <Component />);
    }
  }, [location.pathname, path, cache, addToCache, Component]);

  // Return the cached component if available, otherwise render the new one
  return cache[path] || <Component />;
};

// ScrollToTop component to handle smooth scrolling on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { setLoading } = useLoading();
  const { cache } = usePageCache();

  useEffect(() => {
    // Show loader only if the page is not cached
    if (!cache[pathname]) {
      setLoading(true);
    } else {
      // For cached pages, just handle the scroll without showing the loader
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    // Short timeout to prevent flashing for quick page loads
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Give a small delay to load critical content before hiding loader
      setTimeout(() => setLoading(false), 300);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [pathname, setLoading, cache]);

  return null;
};

// Prefetch component to start loading other pages in the background
const Prefetcher = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Preload About and Stores pages as they're frequently accessed
    const preloadPages = () => {
      // Start preloading About and Stores pages after the current page loads
      const timer = setTimeout(() => {
        import('./pages/About');
        import('./pages/Stores');
      }, 2000);
      
      return () => clearTimeout(timer);
    };
    
    preloadPages();
  }, [location.pathname]);
  
  return null;
};

function App() {
  return (
    <CartProvider>
      <PageCacheProvider>
        <Router>
          <ScrollToTop />
          <Prefetcher />
          {/* GlobalLoader will show until all registered components are loaded */}
          <GlobalLoader text="GARMENTS" spinDuration={8} />
          <Layout>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<CachedRoute path="/" element={Home} />} />
                <Route path="/catalog" element={<CachedRoute path="/catalog" element={Catalog} />} />
                <Route path="/stores" element={<CachedRoute path="/stores" element={Stores} />} />
                <Route path="/men/*" element={<CachedRoute path="/men/*" element={() => <ProductListing category="men" />} />} />
                <Route path="/women/*" element={<CachedRoute path="/women/*" element={() => <ProductListing category="women" />} />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<CachedRoute path="/login" element={Login} />} />
                <Route path="/signup" element={<CachedRoute path="/signup" element={SignUp} />} />
                <Route path="/about" element={<CachedRoute path="/about" element={About} />} />
                <Route path="/holiday" element={<CachedRoute path="/holiday" element={HolidayGifting} />} />
                <Route path="/new" element={<CachedRoute path="/new" element={NewArrivals} />} />
                <Route path="/best-sellers" element={<CachedRoute path="/best-sellers" element={BestSellers} />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/sustainability" element={<CachedRoute path="/sustainability" element={Sustainability} />} />
                <Route path="/careers" element={<CachedRoute path="/careers" element={Careers} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </PageCacheProvider>
    </CartProvider>
  );
}

export default App;