import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Stores from './pages/Stores';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import HolidayGifting from './pages/HolidayGifting';
import NewArrivals from './pages/NewArrivals';
import BestSellers from './pages/BestSellers';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Sustainability from './pages/Sustainability';
import Careers from './pages/Careers';
import GiftCard from './pages/GiftCard';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/men/*" element={<ProductListing category="men" />} />
              <Route path="/women/*" element={<ProductListing category="women" />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/holiday" element={<HolidayGifting />} />
              <Route path="/new" element={<NewArrivals />} />
              <Route path="/best-sellers" element={<BestSellers />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/gift-card" element={<GiftCard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;