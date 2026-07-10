import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';

// Pages
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import ComparePage from '../pages/ComparePage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderStatusPage from '../pages/OrderStatusPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

// Auth Page
import AuthPage from '../pages/AuthPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminOrders from '../pages/admin/AdminOrders';

// Static Pages
import AboutPage from '../pages/static/AboutPage';
import ContactPage from '../pages/static/ContactPage';
import FAQPage from '../pages/static/FAQPage';
import TermsPage from '../pages/static/TermsPage';
import PrivacyPage from '../pages/static/PrivacyPage';
import RefundPolicyPage from '../pages/static/RefundPolicyPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. MAIN E-COMMERCE CLIENT ROUTES */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="track-order/:orderId" element={<OrderStatusPage />} />
        <Route path="profile" element={<ProfilePage />} />
        
        {/* Static Pages */}
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="refund-policy" element={<RefundPolicyPage />} />
        
        {/* Fallback 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* 2. AUTHENTICATION ROUTES */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<AuthPage />} />
      </Route>

      {/* 3. STORE ADMINISTRATIVE CONTROL ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
