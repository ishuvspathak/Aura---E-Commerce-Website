import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiTrendingUp } from 'react-icons/fi';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('aura_recent_searches');
    return saved ? JSON.parse(saved) : [];
  });
  const inputRef = useRef(null);

  const popularSearches = ['iPhone', 'MacBook', 'Ultraboost', 'Headphones', 'Lounge Chair', 'Trench Coat'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('aura_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // limit to top 5 results

    setResults(filtered);
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== query);
      return [query, ...filtered].slice(0, 5); // keep max 5 items
    });
  };

  const handleSuggestionClick = (searchTerm) => {
    setQuery(searchTerm);
  };

  const clearRecent = (e, termToRemove) => {
    e.stopPropagation();
    e.preventDefault();
    setRecentSearches(prev => prev.filter(term => term !== termToRemove));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-card-light dark:bg-card-dark rounded-3xl shadow-2xl z-50 p-6 border border-gray-150 dark:border-gray-800 mx-4"
          >
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-gray-100 dark:border-gray-800 pb-4">
              <FiSearch className="absolute left-1 top-2.5 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, or brands..."
                className="w-full bg-transparent text-lg text-primary dark:text-primary-dark pl-9 pr-12 py-2 focus:outline-none placeholder-gray-400"
              />
              <button 
                type="button"
                onClick={onClose}
                className="absolute right-1 top-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                aria-label="Close search"
              >
                <FiX className="h-5 w-5" />
              </button>
            </form>

            {/* Suggestions & Results Panel */}
            <div className="mt-6 space-y-6 max-h-[350px] overflow-y-auto pr-1">
              {results.length > 0 ? (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Matching Products</h3>
                  <div className="space-y-3">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center space-x-4 p-2 rounded-2xl hover:bg-gray-55 dark:hover:bg-gray-800 transition-colors"
                      >
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-xl border border-gray-100 dark:border-gray-700/50" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold truncate text-primary dark:text-primary-dark">{product.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{product.brand} • {product.category}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-accent dark:text-accent-light">${product.price}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : query.trim() !== '' ? (
                <div className="py-12 text-center text-gray-500">
                  <p className="text-sm font-semibold">No results found for "{query}"</p>
                  <p className="text-xs text-gray-400 mt-1">Try searching for other terms like 'iPhone', 'boots', or 'chair'.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                        <FiClock className="mr-1.5 h-3.5 w-3.5" /> Recent Searches
                      </h3>
                      <div className="space-y-1">
                        {recentSearches.map((term, index) => (
                          <div
                            key={index}
                            onClick={() => handleSuggestionClick(term)}
                            className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                          >
                            <span>{term}</span>
                            <button 
                              onClick={(e) => clearRecent(e, term)}
                              className="text-gray-400 hover:text-danger p-0.5"
                            >
                              <FiX className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                      <FiTrendingUp className="mr-1.5 h-3.5 w-3.5" /> Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleSuggestionClick(term)}
                          className="px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-medium text-gray-650 dark:text-gray-300 rounded-xl transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
