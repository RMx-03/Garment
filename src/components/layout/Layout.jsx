import { useLocation } from 'react-router-dom';
import { memo } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = memo(({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className={`flex-grow relative ${!isHomePage ? 'pt-16' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;