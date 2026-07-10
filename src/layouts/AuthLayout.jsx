import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-light dark:bg-bg-dark relative overflow-hidden transition-colors duration-300">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Main Card Container */}
      <div className="w-full max-w-md bg-card-light/75 dark:bg-card-dark/75 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-2xl rounded-3xl overflow-hidden p-8 z-10 transition-premium">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-black tracking-widest text-primary dark:text-primary-dark">AURA</span>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Minimalist Luxury E-Commerce</p>
        </div>

        {/* Form Content Outlet */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
