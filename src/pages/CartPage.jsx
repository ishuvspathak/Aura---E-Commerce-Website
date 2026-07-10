import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiHeart, FiPlus, FiMinus, FiShoppingBag, FiTag, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { 
    cart, removeFromCart, updateQuantity, subtotal, 
    shipping, tax, discountAmount, grandTotal, 
    appliedCoupon, applyCoupon, removeCoupon, couponError 
  } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) {
      toast.success(`Coupon "${couponCode.toUpperCase()}" applied!`);
      setCouponCode('');
    } else {
      toast.error(couponError || 'Invalid coupon.');
    }
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.product.id)) {
      toggleWishlist(item.product);
      toast.success('Moved to wishlist!', { icon: '💖' });
    } else {
      toast.error('Item is already in your wishlist.');
    }
    removeFromCart(item.id);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-primary dark:text-primary-dark tracking-tight">Shopping Bag</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Review your selected items before checking out.</p>
      </div>

      {cart.length === 0 ? (
        <div className="py-24 text-center bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-gray-55 dark:bg-gray-800 rounded-full text-gray-400">
            <FiShoppingBag className="h-12 w-12" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Your cart is empty</h3>
            <p className="text-xs text-gray-450 mt-1 max-w-xs mx-auto">
              You haven't added any items to your shopping bag yet.
            </p>
          </div>
          <Link
            to="/shop"
            className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-semibold shadow-md inline-block"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cart items table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span className="col-span-6">Product Details</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Price</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {cart.map((item) => (
                  <div key={item.id} className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Details */}
                    <div className="col-span-1 md:col-span-6 flex space-x-4">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-20 h-20 object-cover rounded-xl border border-gray-100 dark:border-gray-800 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="text-sm font-semibold truncate text-primary dark:text-white hover:text-accent transition-colors block"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5">{item.product.brand}</p>
                        
                        {/* Options */}
                        <div className="flex flex-wrap gap-2 mt-2 text-[10px] text-gray-500">
                          {item.selectedColor && (
                            <span className="inline-flex items-center bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-lg border border-gray-100 dark:border-gray-700">
                              Color: 
                              <span 
                                className="inline-block w-2 h-2 rounded-full ml-1 border border-gray-250"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-lg border border-gray-100 dark:border-gray-700">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="col-span-1 md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 px-3 text-gray-500 hover:text-primary dark:hover:text-white"
                        >
                          <FiMinus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold px-2 text-primary dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 px-3 text-gray-500 hover:text-primary dark:hover:text-white"
                        >
                          <FiPlus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 text-left md:text-right text-xs text-gray-500 dark:text-gray-400">
                      <span className="md:hidden font-semibold mr-1">Unit Price:</span>
                      <span>${item.product.price}</span>
                    </div>

                    {/* Total & Action */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                      <span className="md:hidden text-xs font-semibold">Total Price:</span>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary dark:text-white">${item.product.price * item.quantity}</p>
                        {item.product.originalPrice > item.product.price && (
                          <p className="text-[10px] text-gray-400 line-through">${item.product.originalPrice * item.quantity}</p>
                        )}
                      </div>
                    </div>

                    {/* Utility actions buttons */}
                    <div className="col-span-1 md:col-span-12 flex space-x-4 justify-end pt-2 border-t border-gray-50 dark:border-gray-800/40 text-[10px] font-semibold text-gray-400">
                      <button 
                        onClick={() => handleMoveToWishlist(item)}
                        className="flex items-center hover:text-danger"
                      >
                        <FiHeart className="mr-1" /> Move to Wishlist
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center hover:text-danger"
                      >
                        <FiTrash2 className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary side pane */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium p-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Order Summary</h3>

              {/* Coupon inputs */}
              {!appliedCoupon ? (
                <form onSubmit={handleCouponSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-gray-55 dark:bg-gray-800 text-xs text-primary dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-150 dark:text-gray-900 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-3 bg-success/10 text-success text-xs rounded-xl border border-success/20">
                  <div className="flex items-center space-x-1.5 font-medium">
                    <FiTag className="h-4 w-4" />
                    <span>{appliedCoupon.code} Applied</span>
                  </div>
                  <button onClick={removeCoupon} className="p-1 hover:text-danger">
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Finance list details */}
              <div className="space-y-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-primary dark:text-white font-medium">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-primary dark:text-white font-medium">
                    {shipping === 0 ? 'Free Shipping' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (8%)</span>
                  <span className="text-primary dark:text-white font-medium">${tax}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-primary dark:text-white border-t border-gray-100 dark:border-gray-800 pt-4">
                  <span>Grand Total</span>
                  <span>${grandTotal}</span>
                </div>
              </div>

              {/* Checkout link button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white rounded-2xl text-xs font-bold shadow-lg transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="text-center">
              <Link to="/shop" className="text-xs text-gray-400 hover:text-accent font-semibold">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
