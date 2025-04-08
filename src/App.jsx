import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Stores = lazy(() => import('./pages/Stores'));
const ProductListing = lazy(() => import('./pages/ProductListing'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const About = lazy(() => import('./pages/About'));
const HolidayGifting = lazy(() => import('./pages/HolidayGifting'));
const NewArrivals = lazy(() => import('./pages/NewArrivals'));
const BestSellers = lazy(() => import('./pages/BestSellers'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const Careers = lazy(() => import('./pages/Careers'));
const GiftCard = lazy(() => import('./pages/GiftCard'));

// Fallback while loading lazy components
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse">
      <div className="h-8 w-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Layout wraps all pages that share Header/Footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="stores" element={<Stores />} />
              <Route path="men/*" element={<ProductListing category="men" />} />
              <Route path="women/*" element={<ProductListing category="women" />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="about" element={<About />} />
              <Route path="holiday" element={<HolidayGifting />} />
              <Route path="new" element={<NewArrivals />} />
              <Route path="best-sellers" element={<BestSellers />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="checkout/success" element={<CheckoutSuccess />} />
              <Route path="sustainability" element={<Sustainability />} />
              <Route path="careers" element={<Careers />} />
              <Route path="gift-card" element={<GiftCard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;