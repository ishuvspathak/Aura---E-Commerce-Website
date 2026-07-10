import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { 
  FiGrid, FiList, FiSliders, FiX, FiSearch, 
  FiChevronLeft, FiChevronRight, FiRefreshCw 
} from 'react-icons/fi';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Layout states
  const [isGridView, setIsGridView] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState(1500);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync category query parameter if it changes via navbar
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Extract all categories and brands dynamically for the filters
  const categories = useMemo(() => {
    const list = new Set(products.map(p => p.category));
    return ['All', ...Array.from(list)];
  }, []);

  const brands = useMemo(() => {
    const list = new Set(products.map(p => p.brand));
    return ['All', ...Array.from(list)];
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search term match
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }

    // 2. Category match
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 3. Brand match
    if (selectedBrand !== 'All') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // 4. Price slider match
    result = result.filter(p => p.price <= priceRange);

    // 5. Rating match
    if (selectedRating > 0) {
      result = result.filter(p => p.rating >= selectedRating);
    }

    // 6. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      // simulate newest by ID prefix or index
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      // popularity based on review count
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, selectedRating, sortBy]);

  // Reset Filters helper
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setPriceRange(2000);
    setSelectedRating(0);
    setSortBy('popularity');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Trigger search from input field
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 1. SIDEBAR FILTERS (DESKTOP) */}
      <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-150 dark:border-gray-800">
          <h2 className="text-md font-bold flex items-center">
            <FiSliders className="mr-2 h-4 w-4" /> Filters
          </h2>
          <button 
            onClick={handleResetFilters}
            className="text-xs text-gray-500 hover:text-accent font-semibold flex items-center"
          >
            <FiRefreshCw className="mr-1 h-3 w-3" /> Reset
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Categories</h3>
          <div className="flex flex-col space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`text-left text-xs py-1.5 px-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-accent/10 text-accent font-bold'
                    : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Brands</h3>
          <div className="flex flex-col space-y-1">
            {brands.slice(0, 10).map((brnd) => (
              <button
                key={brnd}
                onClick={() => { setSelectedBrand(brnd); setCurrentPage(1); }}
                className={`text-left text-xs py-1.5 px-3 rounded-lg font-medium transition-colors ${
                  selectedBrand === brnd
                    ? 'bg-accent/10 text-accent font-bold'
                    : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
                }`}
              >
                {brnd}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
            <span className="uppercase tracking-wider">Max Price</span>
            <span className="text-primary dark:text-primary-dark">${priceRange}</span>
          </div>
          <input
            type="range"
            min="10"
            max="2000"
            step="10"
            value={priceRange}
            onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
            className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>$10</span>
            <span>$2000</span>
          </div>
        </div>

        {/* Ratings */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Min Rating</h3>
          <div className="flex flex-col space-y-1.5">
            {[4, 3, 2].map((stars) => (
              <button
                key={stars}
                onClick={() => { setSelectedRating(stars); setCurrentPage(1); }}
                className={`text-left text-xs py-1 px-3 rounded-lg transition-colors flex items-center ${
                  selectedRating === stars
                    ? 'bg-accent/10 text-accent font-bold'
                    : 'text-gray-600 dark:text-gray-450 hover:bg-gray-50'
                }`}
              >
                <span className="font-semibold">{stars}★ & Above</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MOBILE FILTERS MODAL DRAWER */}
      {mobileFiltersOpen && (
        <>
          <div 
            onClick={() => setMobileFiltersOpen(false)} 
            className="fixed inset-0 bg-black/40 z-50 lg:hidden cursor-pointer"
          />
          <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card-light dark:bg-card-dark border-r border-gray-150 dark:border-gray-800 z-50 flex flex-col p-6 space-y-6 lg:hidden overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-155">
              <h2 className="text-sm font-bold flex items-center">
                <FiSliders className="mr-2 h-4 w-4" /> Filters
              </h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <FiX className="h-5 w-5" />
              </button>
            </div>
            
            {/* Mobile Categories */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Categories</h3>
              <div className="flex flex-col space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setMobileFiltersOpen(false); setCurrentPage(1); }}
                    className={`text-left text-xs py-1.5 px-3 rounded-lg font-semibold ${
                      selectedCategory === cat ? 'bg-accent/10 text-accent' : 'text-gray-650'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Reset */}
            <button
              onClick={() => { handleResetFilters(); setMobileFiltersOpen(false); }}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold text-center"
            >
              Reset All Filters
            </button>
          </aside>
        </>
      )}

      {/* 2. MAIN CATALOG AREA */}
      <div className="flex-1 space-y-6">
        {/* Top Control Bar (Search, Layout view, Sort) */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-4 shadow-premium">
          {/* Search bar input */}
          <div className="relative w-full sm:max-w-xs">
            <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-gray-50 dark:bg-gray-800/60 text-xs text-primary dark:text-primary-dark pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold rounded-xl"
            >
              <FiSliders className="mr-2 h-4 w-4" /> Filters
            </button>

            {/* Grid / List View Toggle */}
            <div className="hidden sm:flex items-center space-x-1 border border-gray-250 dark:border-gray-750 rounded-xl p-1">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-lg ${isGridView ? 'bg-accent text-white shadow-sm' : 'text-gray-400 hover:text-primary dark:hover:text-white'}`}
                aria-label="Grid View"
              >
                <FiGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-lg ${!isGridView ? 'bg-accent text-white shadow-sm' : 'text-gray-400 hover:text-primary dark:hover:text-white'}`}
                aria-label="List View"
              >
                <FiList className="h-4 w-4" />
              </button>
            </div>

            {/* Sort by dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase hidden md:inline">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none text-primary dark:text-primary-dark"
              >
                <option value="popularity">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedCategory !== 'All' || selectedBrand !== 'All' || selectedRating > 0 || searchTerm !== '') && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-gray-400">Active Filters:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="ml-1.5 text-gray-400 hover:text-danger"><FiX className="h-3 w-3" /></button>
              </span>
            )}
            {selectedBrand !== 'All' && (
              <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {selectedBrand}
                <button onClick={() => setSelectedBrand('All')} className="ml-1.5 text-gray-400 hover:text-danger"><FiX className="h-3 w-3" /></button>
              </span>
            )}
            {selectedRating > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {selectedRating}★ & Above
                <button onClick={() => setSelectedRating(0)} className="ml-1.5 text-gray-400 hover:text-danger"><FiX className="h-3 w-3" /></button>
              </span>
            )}
            {searchTerm !== '' && (
              <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="ml-1.5 text-gray-400 hover:text-danger"><FiX className="h-3 w-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Product Cards Container */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <h3 className="text-lg font-bold">No Products Found</h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              We couldn't find any products matching your filter selections. Try resetting filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : isGridView ? (
          /* Grid Layout */
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* List Layout */
          <div className="space-y-6">
            {paginatedProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 p-5 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 hover-lift"
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full md:w-44 h-44 object-cover rounded-2xl flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{product.brand}</p>
                        <h3 className="text-base font-bold text-primary dark:text-primary-dark">{product.name}</h3>
                      </div>
                      <span className="text-lg font-black text-accent">${product.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed max-w-xl">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-850 mt-4">
                    <span className="text-xs text-gray-450">
                      Rating: <span className="font-bold text-amber-500">{product.rating}★</span> ({product.reviewCount} Reviews)
                    </span>
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="px-5 py-2 border border-gray-200 dark:border-gray-700 hover:border-accent text-xs font-semibold rounded-xl transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 pt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Previous Page"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-colors ${
                    currentPage === pageNum
                      ? 'bg-accent text-white shadow-sm'
                      : 'border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Next Page"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
