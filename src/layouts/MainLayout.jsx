import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ScrollProgress from '../components/common/ScrollProgress';
import BackToTop from '../components/common/BackToTop';
import FloatingCartButton from '../components/common/FloatingCartButton';
import FloatingChat from '../components/common/FloatingChat';
import SearchModal from '../components/common/SearchModal';
import CartDrawer from '../components/cart/CartDrawer';

const MainLayout = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-primary dark:text-primary-dark">
      {/* Scroll Progress Bar at very top */}
      <ScrollProgress />

      {/* Sticky Top Header */}
      <Navbar 
        onSearchClick={() => setSearchOpen(true)} 
        onCartToggle={() => setCartOpen(true)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Outlet />
      </main>

      {/* Standard Footer */}
      <Footer />

      {/* Floating Utilities */}
      <BackToTop />
      <FloatingCartButton onClick={() => setCartOpen(true)} />
      <FloatingChat />

      {/* Overlays / Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default MainLayout;
