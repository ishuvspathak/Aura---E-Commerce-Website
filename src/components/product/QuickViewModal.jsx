import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const QuickViewModal = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const favorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Item is out of stock.');
      return;
    }
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success(`${product.name} added to cart!`, {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
    onClose();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    if (!favorited) {
      toast.success(`${product.name} saved to wishlist!`, {
        icon: '💖',
        style: { borderRadius: '12px', background: '#111827', color: '#fff' }
      });
    } else {
      toast.success(`${product.name} removed from wishlist!`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:h-auto bg-card-light dark:bg-card-dark rounded-3xl shadow-2xl z-53 overflow-hidden flex flex-col md:flex-row border border-gray-150 dark:border-gray-800"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 text-gray-500 hover:text-primary dark:hover:text-white hover:bg-white dark:hover:bg-gray-850 z-10 transition-colors shadow-sm"
              aria-label="Close modal"
            >
              <FiX className="h-5 w-5" />
            </button>

            {/* Left: Product Image */}
            <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-900/50 relative aspect-square md:aspect-auto md:min-h-[450px]">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-xs font-bold bg-danger text-white">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            {/* Right: Info and Actions */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-8rem)] md:max-h-none">
              <div className="space-y-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.brand}</p>
                <h3 className="text-xl font-bold text-primary dark:text-primary-dark pr-6">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <div className="flex text-amber-400">
                    <AiFillStar className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviewCount} verified reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-2.5">
                  <span className="text-2xl font-black text-primary dark:text-primary-dark">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>

                <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>

                {/* Color dots selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Select Color</span>
                    <div className="flex space-x-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-6 h-6 rounded-full border transition-all ${
                            selectedColor === color 
                              ? 'ring-2 ring-accent dark:ring-accent-light scale-110 border-white' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          style={{ backgroundColor: color }}
                          aria-label={`Color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size select buttons */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Select Options</span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all ${
                            selectedSize === size
                              ? 'bg-primary border-primary text-white dark:bg-white dark:border-white dark:text-primary'
                              : 'border-gray-200 hover:border-gray-400 text-gray-600 dark:border-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock status indicator */}
                <div className="text-xs">
                  {product.stock > 0 ? (
                    <span className="text-success font-medium flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-success mr-2" />
                      In stock ({product.stock} items left)
                    </span>
                  ) : (
                    <span className="text-danger font-medium flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-danger mr-2" />
                      Out of stock
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6 border-t border-gray-100 dark:border-gray-800 mt-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 py-3 bg-accent hover:bg-accent-dark text-white rounded-2xl text-xs font-bold transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                >
                  <FiShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-2xl border transition-colors ${
                    favorited
                      ? 'bg-danger/10 border-danger/25 text-danger'
                      : 'border-gray-200 hover:border-gray-400 text-gray-500 dark:border-gray-700'
                  }`}
                  aria-label="Wishlist Toggle"
                >
                  <FiHeart className="h-5 w-5 fill-current" />
                </button>
              </div>

              <div className="text-center mt-3">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-[11px] text-gray-400 hover:text-accent font-medium underline"
                >
                  View Full Product Details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
