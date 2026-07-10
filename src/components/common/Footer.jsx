import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiMail, 
  FiMapPin, FiPhone, FiArrowRight 
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Thank you for subscribing to our newsletter!', {
      style: {
        borderRadius: '16px',
        background: '#111827',
        color: '#fff',
      }
    });
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <span className="text-2xl font-black tracking-widest text-white">AURA</span>
            <p className="text-sm text-gray-400 leading-relaxed">
              Crafting premium minimalist lifestyle essentials, high-end electronics, and refined designs for the modern home and wardrobe.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
                <FiGithub className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Shop Collections</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop?category=Mobiles" className="hover:text-white transition-colors">Smartphones</Link>
              </li>
              <li>
                <Link to="/shop?category=Laptops" className="hover:text-white transition-colors">Laptops</Link>
              </li>
              <li>
                <Link to="/shop?category=Fashion" className="hover:text-white transition-colors">Premium Apparel</Link>
              </li>
              <li>
                <Link to="/shop?category=Watches" className="hover:text-white transition-colors">Fine Horology</Link>
              </li>
              <li>
                <Link to="/shop?category=Furniture" className="hover:text-white transition-colors">Designer Furniture</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">FAQ & Help</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">Returns & Refunds</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Subscribe</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Join the club. Get early access to product launches, seasonal sales, and curated lifestyle blogs.
            </p>
            <form onSubmit={handleSubscribe} className="flex relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none border border-gray-700 focus:border-gray-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-white hover:bg-gray-100 text-gray-900 px-3.5 rounded-lg transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <FiArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AURA Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300">Terms of Use</Link>
            <Link to="/refund-policy" className="hover:text-gray-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
