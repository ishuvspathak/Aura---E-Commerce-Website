import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertOctagon } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
      <div className="p-5 bg-danger/10 text-danger rounded-full animate-bounce">
        <FiAlertOctagon className="h-14 w-14 stroke-[1.5]" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-primary dark:text-white tracking-tight">404</h1>
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Page Not Found</h2>
        <p className="text-xs text-gray-550 dark:text-gray-400 max-w-xs leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <Link
        to="/"
        className="px-6 py-3 bg-primary dark:bg-white text-white dark:text-primary hover:bg-black dark:hover:bg-gray-150 rounded-xl text-xs font-bold shadow-md transition-colors flex items-center space-x-2"
      >
        <FiHome className="h-4 w-4" />
        <span>Back to Homepage</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
