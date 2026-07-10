import React, { createContext, useState, useEffect, useContext } from 'react';
import { coupons } from '../data/coupons';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem('aura_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('aura_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('aura_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1, color = '', size = '') => {
    setCart(prevCart => {
      // Check if product with same options already exists
      const existingIndex = prevCart.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { 
          id: `${product.id}-${color}-${size}-${Date.now()}`,
          product, 
          quantity, 
          selectedColor: color || (product.colors && product.colors[0]) || '', 
          selectedSize: size || (product.sizes && product.sizes[0]) || '' 
        }];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => prevCart.map(item => 
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponError('');
  };

  const applyCoupon = (code) => {
    setCouponError('');
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    
    if (!coupon) {
      setCouponError('Invalid coupon code.');
      return false;
    }

    const sub = getSubtotal();
    if (sub < coupon.minSpend) {
      setCouponError(`This coupon requires a minimum purchase of $${coupon.minSpend}.`);
      return false;
    }

    setAppliedCoupon(coupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Calculations
  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const subtotal = getSubtotal();

  const discountAmount = (() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.discountType === 'fixed') {
      return appliedCoupon.value;
    }
    return 0; // for freeshipping
  })();

  const isFreeShipping = appliedCoupon?.discountType === 'freeshipping' || subtotal > 150;
  const shipping = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 15);

  const tax = Math.round((subtotal - discountAmount) * 0.08); // 8% tax

  const grandTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      couponError,
      subtotal,
      discountAmount,
      shipping,
      tax,
      grandTotal,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
