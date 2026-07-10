import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiShoppingCart, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    if (product.stock === 0) {
      toast.error('Product is out of stock.');
      return;
    }
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to cart!`, {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-primary dark:text-primary-dark tracking-tight">Your Wishlist</h1>
        <p className="text-xs text-gray-550 dark:text-gray-400 mt-1">Keep track of your favorite products and purchase them later.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-24 text-center bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-gray-55 dark:bg-gray-800 rounded-full text-gray-400">
            <FiHeart className="h-12 w-12" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Your wishlist is empty</h3>
            <p className="text-xs text-gray-450 mt-1 max-w-xs mx-auto">
              Save items you like to monitor stock, compare specifications, or purchase later.
            </p>
          </div>
          <Link
            to="/shop"
            className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-semibold shadow-md inline-block"
          >
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div 
              key={product.id}
              className="bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 p-4 flex flex-col justify-between hover-lift relative"
            >
              {/* Delete Trigger */}
              <button
                onClick={() => {
                  removeFromWishlist(product.id);
                  toast.success('Removed from wishlist');
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-danger z-10 shadow-sm"
                aria-label="Remove item"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className="aspect-square w-full rounded-2xl bg-gray-50 dark:bg-gray-900/50 overflow-hidden mb-2">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{product.brand}</span>
                  <Link 
                    to={`/product/${product.id}`}
                    className="text-sm font-semibold truncate text-primary dark:text-white hover:text-accent transition-colors block pr-6"
                  >
                    {product.name}
                  </Link>
                  <div className="flex items-center space-x-2 text-[11px] text-gray-500">
                    <span className="text-primary dark:text-white font-bold">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status & CTA */}
              <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800/60 space-y-3">
                <div className="text-[10px] font-semibold">
                  {product.stock > 0 ? (
                    <span className="text-success flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-success mr-1.5" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-danger flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-danger mr-1.5" />
                      Out of Stock
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleMoveToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-200 dark:disabled:bg-gray-800"
                >
                  <FiShoppingCart className="h-4 w-4" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
