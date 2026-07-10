import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const FloatingCartButton = ({ onClick }) => {
  const { cartCount } = useCart();

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 50 }}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="fixed bottom-24 right-6 p-4 rounded-full shadow-2xl bg-accent hover:bg-accent-dark text-white z-40 flex items-center justify-center border border-accent/20"
          aria-label="Toggle Cart Drawer"
        >
          <div className="relative">
            <FiShoppingBag className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-white text-accent text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-md">
              {cartCount}
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingCartButton;
