import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  FiGrid, FiPackage, FiShoppingBag, FiArrowLeft, FiLogOut, 
  FiSun, FiMoon, FiMenu, FiX, FiUser, FiBell 
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const menuItems = [
    { label: 'Overview', path: '/admin', icon: FiGrid },
    { label: 'Products CRUD', path: '/admin/products', icon: FiPackage },
    { label: 'Orders List', path: '/admin/orders', icon: FiShoppingBag },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-bg-light dark:bg-bg-dark text-primary dark:text-primary-dark">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card-light dark:bg-card-dark border-r border-gray-150 dark:border-gray-800">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-gray-150 dark:border-gray-800">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-black tracking-widest text-primary dark:text-primary-dark">AURA ADMIN</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-150 dark:border-gray-800 flex items-center space-x-3">
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"} 
            alt="Admin" 
            className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-700"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{user?.username || 'Administrator'}</p>
            <p className="text-xs text-accent font-medium">Store Owner</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-accent/10 text-accent dark:text-accent-light'
                    : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-150 dark:border-gray-800 space-y-1.5">
          <Link 
            to="/" 
            className="flex items-center px-4 py-3 rounded-2xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <FiArrowLeft className="mr-3 h-5 w-5" />
            Back to Store
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-2xl text-sm font-medium text-danger hover:bg-gray-55 dark:hover:bg-gray-800/50"
          >
            <FiLogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar Drawer for Mobile */}
      {sidebarOpen && (
        <>
          <div 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer"
          />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-card-light dark:bg-card-dark border-r border-gray-150 dark:border-gray-800 z-50 flex flex-col transition-all duration-300">
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-150 dark:border-gray-800">
              <span className="text-lg font-black tracking-widest text-primary dark:text-primary-dark">AURA ADMIN</span>
              <button onClick={() => setSidebarOpen(false)}>
                <FiX className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex-1 p-4 space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-accent/10 text-accent'
                        : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-150 dark:border-gray-800 space-y-1.5">
              <Link 
                to="/" 
                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850"
              >
                <FiArrowLeft className="mr-3 h-5 w-5" />
                Back to Store
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-gray-50 dark:hover:bg-gray-850"
              >
                <FiLogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Administrative Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 bg-card-light dark:bg-card-dark border-b border-gray-150 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-45">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-550 dark:text-gray-400 hover:bg-gray-105 dark:hover:bg-gray-800 mr-2"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <h1 className="text-md font-semibold text-primary dark:text-primary-dark hidden sm:block">Dashboard Control Panel</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>

            <button 
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              onClick={() => toast('No new notifications', { icon: '🔔' })}
            >
              <FiBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-accent" />
            </button>

            <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{user?.username || 'Admin'}</span>
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"} 
                alt="Admin Profile" 
                className="w-8 h-8 rounded-full object-cover border border-gray-150 dark:border-gray-700" 
              />
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
