import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  FiShoppingBag, FiHeart, FiUser, FiSearch, FiSun, FiMoon, 
  FiMenu, FiX, FiActivity, FiLogOut, FiLayout, FiGrid 
} from 'react-icons/fi';

const Navbar = ({ onSearchClick, onCartToggle }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Categories', path: '/shop?focus=categories' },
    { label: 'Compare', path: '/compare' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-premium glass-effect border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-widest text-primary dark:text-primary-dark">
                AURA
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative flex items-center ${
                  isActive(link.path)
                    ? 'text-accent dark:text-accent-light'
                    : 'text-gray-650 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark'
                }`}
              >
                <span>{link.label}</span>
                {link.label === 'Compare' && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[8px] font-extrabold bg-danger text-white rounded-full uppercase tracking-wider leading-none">
                    Hot
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Live Search Trigger */}
            <button 
              onClick={onSearchClick}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <FiSearch className="h-5 w-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>

            {/* Wishlist Icon */}
            <Link 
              to="/wishlist" 
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Wishlist"
            >
              <FiHeart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button 
              onClick={onCartToggle}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Cart"
            >
              <FiShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.username} 
                      className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700 object-cover" 
                    />
                  </button>

                  {profileDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setProfileDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-52 rounded-2xl shadow-xl bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 py-2 z-20 transition-all transform origin-top-right">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                          <p className="text-sm font-semibold truncate text-primary dark:text-primary-dark">{user.username}</p>
                        </div>

                        {user.role === 'admin' && (
                          <Link 
                            to="/admin" 
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <FiLayout className="mr-2 h-4 w-4 text-accent" />
                            Admin Dashboard
                          </Link>
                        )}

                        <Link 
                          to="/profile" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <FiUser className="mr-2 h-4 w-4" />
                          My Profile
                        </Link>

                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-danger hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <FiLogOut className="mr-2 h-4 w-4" />
                          Log out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="flex items-center justify-center p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiUser className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={onSearchClick}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiSearch className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            <button 
              onClick={onCartToggle}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
            >
              <FiShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Main Menu"
            >
              {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-gray-100 dark:border-gray-800 py-4 px-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-accent"
          >
            <span>Wishlist</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs">{wishlistCount}</span>
          </Link>
          {isAuthenticated ? (
            <>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-accent"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-accent"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left block py-2 text-base font-medium text-danger"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-accent"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
