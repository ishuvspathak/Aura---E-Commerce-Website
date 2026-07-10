import React from 'react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiX, FiShoppingCart, FiChevronRight, FiGrid, FiActivity } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ComparePage = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    if (product.stock === 0) {
      toast.error('Item is out of stock.');
      return;
    }
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const allSpecsKeys = [
    'Processor', 'RAM', 'Storage', 'Display', 'Camera', 'Graphics', 
    'Weight', 'Battery', 'OS', 'Case Material', 'Water Resistance'
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-primary-dark tracking-tight">Compare Products</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Analyze and compare product specifications side-by-side.</p>
        </div>
        {compareList.length > 0 && (
          <button 
            onClick={clearCompare}
            className="text-xs font-bold text-danger hover:underline"
          >
            Clear Comparison List
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="py-24 text-center bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-gray-55 dark:bg-gray-800 rounded-full text-gray-400">
            <FiActivity className="h-12 w-12" />
          </div>
          <div>
            <h3 className="text-lg font-bold">No products to compare</h3>
            <p className="text-xs text-gray-450 mt-1 max-w-xs mx-auto">
              Add products from product cards or detail pages to build a comparison chart.
            </p>
          </div>
          <Link
            to="/shop"
            className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-semibold shadow-md inline-block"
          >
            Go to Catalog
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="p-6 font-bold text-gray-400 uppercase tracking-wider w-1/4">Features</th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-6 w-1/4 relative border-l border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-danger"
                      aria-label="Remove from compare"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                    
                    <div className="space-y-4 mt-2">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-24 h-24 object-cover rounded-xl border border-gray-100 dark:border-gray-700 mx-auto"
                      />
                      <div className="text-center space-y-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{product.brand}</p>
                        <Link 
                          to={`/product/${product.id}`}
                          className="font-bold text-primary dark:text-white hover:text-accent truncate block"
                        >
                          {product.name}
                        </Link>
                        <p className="font-black text-accent text-sm">${product.price}</p>
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="w-full py-2 bg-accent hover:bg-accent-dark text-white rounded-xl text-[10px] font-bold transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Category */}
              <tr className="border-b border-gray-50 dark:border-gray-850">
                <td className="p-4 font-bold text-gray-400">Category</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4 border-l border-gray-50 dark:border-gray-850 text-gray-700 dark:text-gray-300 font-medium">
                    {p.category}
                  </td>
                ))}
              </tr>
              {/* Rating */}
              <tr className="border-b border-gray-50 dark:border-gray-850">
                <td className="p-4 font-bold text-gray-400">Rating</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4 border-l border-gray-50 dark:border-gray-850 text-gray-700 dark:text-gray-300 font-medium">
                    {p.rating}★ ({p.reviewCount} Reviews)
                  </td>
                ))}
              </tr>
              {/* Dynamic specs rows */}
              {allSpecsKeys.map((key) => (
                <tr key={key} className="border-b border-gray-50 dark:border-gray-850 last:border-0">
                  <td className="p-4 font-bold text-gray-400">{key}</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-gray-50 dark:border-gray-850 text-gray-650 dark:text-gray-450">
                      {p.specifications?.[key] || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
              {/* Warranty */}
              <tr className="border-t border-b border-gray-50 dark:border-gray-850">
                <td className="p-4 font-bold text-gray-400">Warranty</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4 border-l border-gray-50 dark:border-gray-850 text-gray-700 dark:text-gray-300">
                    {p.warranty || '1 Year Warranty'}
                  </td>
                ))}
              </tr>
              {/* Delivery info */}
              <tr className="border-b border-gray-50 dark:border-gray-850">
                <td className="p-4 font-bold text-gray-400">Delivery Time</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4 border-l border-gray-50 dark:border-gray-850 text-gray-700 dark:text-gray-300">
                    {p.deliveryTime}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
