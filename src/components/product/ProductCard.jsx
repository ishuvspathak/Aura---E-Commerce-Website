import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { FiHeart, FiShoppingCart, FiEye, FiActivity } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import toast from 'react-hot-toast';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const favorited = isInWishlist(product.id);
  const compared = isInCompare(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.stock === 0) {
      toast.error('Item is currently out of stock.');
      return;
    }
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product);
    if (!favorited) {
      toast.success(`${product.name} saved to wishlist!`, {
        icon: '💖',
        style: { borderRadius: '12px', background: '#111827', color: '#fff' }
      });
    } else {
      toast.success(`${product.name} removed from wishlist!`, {
        style: { borderRadius: '12px' }
      });
    }
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (compared) {
      toast.error('Product already in compare list.');
      return;
    }
    addToCompare(product);
    toast.success(`${product.name} added to comparison!`, {
      icon: '🔄',
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
  };

  return (
    <>
      <div className="group relative bg-card-light dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 p-4 transition-premium hover-lift">
        {/* Badges and actions overlays */}
        <div className="relative aspect-square w-full rounded-2xl bg-gray-50 dark:bg-gray-800/40 overflow-hidden image-zoom-container mb-4">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
            {product.discount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-danger text-white">
                -{product.discount}%
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-warning text-white">
                Low Stock ({product.stock})
              </span>
            )}
            {product.stock === 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-500 text-white">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick Actions (Appear on hover) */}
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2.5 z-10">
            <button
              onClick={() => setQuickViewOpen(true)}
              className="p-3 rounded-full bg-white text-gray-900 shadow-md hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              aria-label="Quick View"
            >
              <FiEye className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-3 rounded-full bg-accent text-white shadow-md hover:bg-accent-dark transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 [transition-delay:50ms]"
              aria-label="Add to Cart"
              disabled={product.stock === 0}
            >
              <FiShoppingCart className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleCompareToggle}
              className={`p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 [transition-delay:100ms] ${
                compared ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-white text-gray-900'
              }`}
              aria-label="Add to Compare"
            >
              <FiActivity className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Wishlist Button (Always visible but styled differently) */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md z-10 transition-colors ${
              favorited 
                ? 'bg-danger text-white' 
                : 'bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-950'
            }`}
            aria-label="Wishlist Toggle"
          >
            <FiHeart className="h-4 w-4 fill-current" />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-1.5">
          <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">{product.brand}</p>
          
          <h3 className="text-sm font-semibold truncate text-primary dark:text-primary-dark group-hover:text-accent transition-colors duration-250">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex text-amber-400">
              <AiFillStar className="h-3.5 w-3.5" />
            </div>
            <span className="text-[11px] font-bold text-gray-600 dark:text-gray-350">{product.rating}</span>
            <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline space-x-2 pt-1">
            <span className="text-base font-bold text-primary dark:text-primary-dark">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal Drawer */}
      <QuickViewModal 
        isOpen={quickViewOpen} 
        onClose={() => setQuickViewOpen(false)} 
        product={product} 
      />
    </>
  );
};

export default ProductCard;
