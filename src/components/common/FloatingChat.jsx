import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiCornerDownRight } from 'react-icons/fi';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I am Aura AI, your personal shopping assistant. Ask me to find products, recommend items, or check out deals!', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputText.toLowerCase();
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let matchedProducts = [];
      let replyText = "I couldn't find exactly what you're looking for, but here are some popular items you might like!";

      if (query.includes('phone') || query.includes('mobile') || query.includes('iphone') || query.includes('galaxy')) {
        matchedProducts = products.filter(p => p.category === 'Mobiles');
        replyText = "Here are the best premium smartphones available at AURA right now:";
      } else if (query.includes('laptop') || query.includes('macbook') || query.includes('computer')) {
        matchedProducts = products.filter(p => p.category === 'Laptops');
        replyText = "Check out these top-tier, high-performance laptops:";
      } else if (query.includes('headphone') || query.includes('audio') || query.includes('sound') || query.includes('airpods') || query.includes('earbuds')) {
        matchedProducts = products.filter(p => p.category === 'Audio');
        replyText = "Here are some elite audio devices to elevate your listening experience:";
      } else if (query.includes('watch') || query.includes('tissot') || query.includes('time')) {
        matchedProducts = products.filter(p => p.category === 'Watches' || p.category === 'Smart Devices');
        replyText = "Discover these masterfully crafted timepieces and smart wearables:";
      } else if (query.includes('shoe') || query.includes('sneaker') || query.includes('boot')) {
        matchedProducts = products.filter(p => p.category === 'Shoes');
        replyText = "Walk in style. Here are our top sneaker and boot recommendations:";
      } else if (query.includes('chair') || query.includes('furniture') || query.includes('lounge')) {
        matchedProducts = products.filter(p => p.category === 'Furniture');
        replyText = "Upgrade your space with these premium designer furniture pieces:";
      } else if (query.includes('dress') || query.includes('shirt') || query.includes('fashion') || query.includes('wear') || query.includes('coat')) {
        matchedProducts = products.filter(p => p.category === 'Fashion');
        replyText = "Explore our minimal, high-quality fashion wear collection:";
      } else if (query.includes('book') || query.includes('habit') || query.includes('read')) {
        matchedProducts = products.filter(p => p.category === 'Books');
        replyText = "Feed your mind. Here are some of our best-selling hardcovers:";
      } else if (query.includes('deal') || query.includes('discount') || query.includes('sale')) {
        matchedProducts = products.filter(p => p.discount > 15).slice(0, 3);
        replyText = "We found some amazing deals with over 15% OFF for you:";
      }

      // If no match, suggest top rated
      if (matchedProducts.length === 0) {
        matchedProducts = products.filter(p => p.rating >= 4.8).slice(0, 3);
      } else {
        matchedProducts = matchedProducts.slice(0, 3); // limit to 3 items
      }

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        recommendedProducts: matchedProducts,
        timestamp: new Date()
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Trigger Button - Placed at bottom-left to avoid overlaps */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 p-4 rounded-full shadow-2xl bg-primary dark:bg-white text-white dark:text-primary z-40 border border-gray-800 dark:border-gray-200 flex items-center justify-center"
        aria-label="Aura AI assistant"
      >
        <FiMessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat window drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50, x: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50, x: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-24 left-6 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] rounded-3xl shadow-2xl z-40 flex flex-col bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gray-950 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-accent flex items-center justify-center">
                  <FiCpu className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wide">Aura AI</h3>
                  <p className="text-[10px] text-gray-400">Shopping Assistant (Mock AI)</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-800 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-light/50 dark:bg-bg-dark/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-accent text-white rounded-br-none'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm border border-gray-50 dark:border-gray-700/50'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Recommended Products cards */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="mt-3 w-full space-y-2">
                      {msg.recommendedProducts.map((prod) => (
                        <div 
                          key={prod.id} 
                          className="flex items-center space-x-3 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-accent/40 transition-colors"
                        >
                          <img 
                            src={prod.images[0]} 
                            alt={prod.name} 
                            className="w-12 h-12 object-cover rounded-lg" 
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold truncate text-primary dark:text-primary-dark">{prod.name}</h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">{prod.brand} • ${prod.price}</p>
                          </div>
                          <Link 
                            to={`/product/${prod.id}`}
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-accent hover:text-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-center"
                          >
                            <FiCornerDownRight className="h-4 w-4" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-gray-400 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1.5 bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none w-16 shadow-sm border border-gray-50 dark:border-gray-700/50">
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-2 bg-white dark:bg-gray-900">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Aura AI... (e.g. 'shoes')"
                className="flex-1 bg-gray-50 dark:bg-gray-800 text-primary dark:text-primary-dark rounded-xl px-4 py-2.5 text-xs focus:outline-none border border-gray-200 dark:border-gray-700 focus:border-accent dark:focus:border-accent-light transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white transition-colors flex items-center justify-center"
                aria-label="Send Message"
              >
                <FiSend className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
