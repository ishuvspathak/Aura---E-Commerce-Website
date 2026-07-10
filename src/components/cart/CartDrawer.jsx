import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiTag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    cart, removeFromCart, updateQuantity, subtotal, 
    shipping, tax, discountAmount, grandTotal, 
    appliedCoupon, applyCoupon, removeCoupon, couponError 
  } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) {
      toast.success(`Coupon "${couponCode.toUpperCase()}" applied!`, {
        style: { borderRadius: '12px', background: '#111827', color: '#fff' }
      });
      setCouponCode('');
    } else {
      toast.error(couponError || 'Failed to apply coupon.', {
        style: { borderRadius: '12px' }
      });
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
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

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card-light dark:bg-card-dark shadow-2xl z-50 flex flex-col border-l border-gray-100 dark:border-gray-800"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiShoppingBag className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-bold text-primary dark:text-primary-dark tracking-wide">
                  Your Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-850 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 bg-gray-55 dark:bg-gray-800 rounded-full text-gray-400">
                    <FiShoppingBag className="h-12 w-12" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-primary dark:text-primary-dark">Your cart is empty</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[200px] mx-auto">
                      Explore our collections and add items to your cart.
                    </p>
                  </div>
                  <button
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex space-x-4 border-b border-gray-50 dark:border-gray-850/50 pb-4">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-20 h-20 object-cover rounded-xl border border-gray-100 dark:border-gray-800 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-semibold truncate text-primary dark:text-primary-dark pr-2">
                            {item.product.name}
                          </h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-danger p-1"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {item.selectedColor && (
                            <span className="inline-flex items-center mr-2">
                              Color: 
                              <span 
                                className="inline-block w-2.5 h-2.5 rounded-full ml-1 border border-gray-250"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </span>
                          )}
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        </p>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        {/* Quantity adjust */}
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-gray-500 hover:text-primary dark:hover:text-white"
                          >
                            <FiMinus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-semibold px-2 text-primary dark:text-primary-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-gray-500 hover:text-primary dark:hover:text-white"
                          >
                            <FiPlus className="h-3 w-3" />
                          </button>
                        </div>
                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-bold text-primary dark:text-primary-dark">
                            ${item.product.price * item.quantity}
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <div className="text-[10px] text-gray-400 line-through">
                              ${item.product.originalPrice * item.quantity}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer calculations & checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                {/* Coupon input */}
                {!appliedCoupon ? (
                  <form onSubmit={handleCouponSubmit} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. AURA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-white dark:bg-gray-800 text-xs text-primary dark:text-primary-dark border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-150 dark:text-gray-900 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2.5 bg-success/10 text-success text-xs rounded-xl border border-success/20">
                    <div className="flex items-center space-x-1.5 font-medium">
                      <FiTag className="h-4 w-4" />
                      <span>{appliedCoupon.code} Applied ({appliedCoupon.description})</span>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="text-gray-500 hover:text-danger font-bold p-1"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-primary dark:text-primary-dark">${subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-primary dark:text-primary-dark">
                      {shipping === 0 ? 'Free' : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (8%)</span>
                    <span className="text-primary dark:text-primary-dark">${tax}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-primary dark:text-primary-dark border-t border-gray-150 dark:border-gray-800 pt-2.5">
                    <span>Total</span>
                    <span>${grandTotal}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white rounded-2xl text-xs font-bold shadow-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
