import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { FiArrowRight, FiShield, FiTruck, FiRefreshCw, FiGrid, FiClock, FiTag, FiCopy } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 24, seconds: 56 });

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset daily
          return { hours: 8, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  // Filter 4 flash sale products (high discount)
  const flashSaleProducts = products.filter(p => p.discount >= 15).slice(0, 4);

  // Filter 8 popular products
  const trendingProducts = products.filter(p => p.rating >= 4.7).slice(0, 8);

  const categories = [
    { name: 'Mobiles', count: 4, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&auto=format&fit=crop' },
    { name: 'Laptops', count: 4, img: 'https://images.unsplash.com/photo-1496181130204-7552cc14ac42?q=80&w=300&auto=format&fit=crop' },
    { name: 'Audio', count: 3, img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=300&auto=format&fit=crop' },
    { name: 'Fashion', count: 6, img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300&auto=format&fit=crop' },
    { name: 'Furniture', count: 2, img: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=300&auto=format&fit=crop' },
    { name: 'Shoes', count: 3, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300&auto=format&fit=crop' },
  ];

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon "${code}" copied to clipboard!`, {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
  };

  const faqs = [
    { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy. Items must be in their original packaging and unused condition." },
    { q: "Is shipping free?", a: "Shipping is free for all orders above $150 or when using the coupon code FREESHIP. Standard shipping is $15." },
    { q: "Do you offer warranty?", a: "Yes, all products come with their manufacturer's warranty. Aura Atelier brand items come with a lifetime stitching or structure warranty." }
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center bg-gray-950 text-white px-6 sm:px-12 py-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-35 object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider text-accent-light uppercase"
          >
            Summer Edit 2026
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black leading-tight tracking-tight"
          >
            Refined Living. <br />
            Minimalist Design.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-md"
          >
            Experience our curated collections of premium tech, organic apparel, and architect-inspired home goods. Handcrafted details for daily life.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4 pt-4"
          >
            <Link 
              to="/shop" 
              className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-2xl text-xs font-bold shadow-md transition-colors flex items-center space-x-2"
            >
              <span>Shop Now</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <button 
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold border border-white/20 transition-colors"
            >
              Explore
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. VALUES / TRUST BADGES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="flex items-start space-x-4 p-6 bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-premium">
          <div className="p-3 bg-accent/10 rounded-xl text-accent">
            <FiTruck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-primary dark:text-primary-dark">Ultra Fast Delivery</h3>
            <p className="text-xs text-gray-550 dark:text-gray-400 mt-1">Free shipping on orders above $150. Tracked shipping worldwide.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-6 bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-premium">
          <div className="p-3 bg-accent/10 rounded-xl text-accent">
            <FiShield className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-primary dark:text-primary-dark">Secure Checkouts</h3>
            <p className="text-xs text-gray-550 dark:text-gray-400 mt-1">Encrypting connections to process credit cards, wallets, and bank transfers safely.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-6 bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-premium">
          <div className="p-3 bg-accent/10 rounded-xl text-accent">
            <FiRefreshCw className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-primary dark:text-primary-dark">30-Day Easy Returns</h3>
            <p className="text-xs text-gray-550 dark:text-gray-400 mt-1">Dissatisfied with your order? Send it back in 30 days for a full refund.</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES */}
      <section id="categories" className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-accent">Curated Styles</span>
            <h2 className="text-2xl font-black text-primary dark:text-primary-dark tracking-tight mt-1">Browse Categories</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-accent hover:underline flex items-center space-x-1">
            <span>View All Shop</span>
            <FiArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={`/shop?category=${cat.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800/40 block hover-lift"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white" />
              <div className="absolute bottom-4 left-4 z-10 text-white">
                <h4 className="text-sm font-bold tracking-wide">{cat.name}</h4>
                <p className="text-[10px] text-gray-300">{cat.count}+ Products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FLASH SALE SECTION */}
      <section className="p-8 rounded-3xl bg-accent/5 dark:bg-accent/10 border border-accent/10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Countdown details */}
        <div className="flex flex-col justify-between space-y-6 lg:border-r border-accent/10 lg:pr-8">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-danger text-white">
              FLASH SALE
            </span>
            <h3 className="text-xl font-black text-primary dark:text-primary-dark mt-3 tracking-tight">Today's Hot Deals</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              Premium quality products on exclusive discounts. The clock is ticking, act fast before stock runs out!
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-400 flex items-center">
              <FiClock className="mr-1.5 h-3.5 w-3.5" /> Time remaining:
            </span>
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-center">
                <span className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl px-3.5 py-2 font-black text-sm">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="text-[9px] text-gray-400 uppercase font-semibold mt-1">Hrs</span>
              </div>
              <span className="text-lg font-black text-primary dark:text-primary-dark pb-6">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl px-3.5 py-2 font-black text-sm">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="text-[9px] text-gray-400 uppercase font-semibold mt-1">Min</span>
              </div>
              <span className="text-lg font-black text-primary dark:text-primary-dark pb-6">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl px-3.5 py-2 font-black text-sm">
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="text-[9px] text-gray-400 uppercase font-semibold mt-1">Sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 items on flash sale */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {flashSaleProducts.slice(0, 3).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. TRENDING / POPULAR PRODUCTS */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-accent">Top Rated Selection</span>
          <h2 className="text-2xl font-black text-primary dark:text-primary-dark tracking-tight mt-1">Trending Products</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trendingProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. PROMOTIONAL OFFER BOX */}
      <section className="p-8 rounded-3xl bg-gray-950 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="space-y-2.5 relative z-10 max-w-xl text-center md:text-left">
          <h3 className="text-xl font-bold tracking-tight">Become an Aura VIP & Claim 20% OFF</h3>
          <p className="text-xs text-gray-300 leading-relaxed max-w-md">
            Unlock additional discount offers and coupon credits by using our welcome voucher. Enter it during checkout.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
            <FiTag className="h-4.5 w-4.5 text-accent-light" />
            <span className="text-sm font-black text-white uppercase tracking-wider">WELCOME20</span>
            <button 
              onClick={() => handleCopyCoupon('WELCOME20')}
              className="p-1 rounded hover:bg-white/10 text-gray-300 hover:text-white"
              aria-label="Copy Coupon code"
            >
              <FiCopy className="h-4 w-4" />
            </button>
          </div>
          <Link 
            to="/shop" 
            className="px-5 py-3 bg-white text-gray-950 hover:bg-gray-100 rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            Claim Discount
          </Link>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="space-y-6">
        <div className="text-center max-w-md mx-auto">
          <span className="text-xs font-bold tracking-wider uppercase text-accent">Reviews</span>
          <h2 className="text-2xl font-black text-primary dark:text-primary-dark tracking-tight mt-1">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col justify-between">
            <p className="text-xs text-gray-550 dark:text-gray-400 italic leading-relaxed">
              "The MacBook Pro and the Mid-Century Lounge chair arrived in perfect shape. Their minimalist aesthetic fits my work office workspace beautifully. Customer service was super quick with help on my shipping tracking!"
            </p>
            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-50 dark:border-gray-850">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
                alt="Client" 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <div>
                <h4 className="text-xs font-bold text-primary dark:text-primary-dark">Elena Rostova</h4>
                <p className="text-[10px] text-gray-400">Designer, San Francisco</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col justify-between">
            <p className="text-xs text-gray-550 dark:text-gray-400 italic leading-relaxed">
              "AURA has completely changed where I buy my everyday basics and home goods. The leather wallet is high quality and aging to a gorgeous patina. Everything is packed with premium, plastic-free boxes."
            </p>
            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-50 dark:border-gray-850">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop" 
                alt="Client" 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <div>
                <h4 className="text-xs font-bold text-primary dark:text-primary-dark">Marcus Thorne</h4>
                <p className="text-[10px] text-gray-400">Creative Lead, Stockholm</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col justify-between">
            <p className="text-xs text-gray-550 dark:text-gray-400 italic leading-relaxed">
              "Outstanding build quality on the Sony headphones! The active noise cancel is industry-grade, and the design is so light on the head. Shipping took only 1 day. I will absolutely buy from Aura again."
            </p>
            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-50 dark:border-gray-850">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
                alt="Client" 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <div>
                <h4 className="text-xs font-bold text-primary dark:text-primary-dark">David Vance</h4>
                <p className="text-[10px] text-gray-400">Tech Reviewer, Seattle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center">
          <span className="text-xs font-bold tracking-wider uppercase text-accent">Got Questions?</span>
          <h2 className="text-2xl font-black text-primary dark:text-primary-dark tracking-tight mt-1">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-card-dark"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left font-semibold text-xs sm:text-sm text-primary dark:text-primary-dark focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-850 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-lg font-bold text-gray-400">{activeFaq === index ? '-' : '+'}</span>
              </button>
              {activeFaq === index && (
                <div className="p-5 pt-0 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-50 dark:border-gray-850 leading-relaxed bg-gray-50/50 dark:bg-gray-850/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. NEWSLETTER BOX */}
      <section className="rounded-3xl border border-gray-100 dark:border-gray-800 p-8 sm:p-12 text-center bg-white dark:bg-card-dark shadow-premium max-w-4xl mx-auto">
        <div className="max-w-md mx-auto space-y-4">
          <span className="text-xs font-bold tracking-wider uppercase text-accent">Stay Updated</span>
          <h2 className="text-2xl font-black text-primary dark:text-primary-dark tracking-tight">Join the AURA Journal</h2>
          <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
            Subscribe to receive premium product launches, design inspiration, and special credits direct to your inbox.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Successfully subscribed to AURA newsletter!', {
                style: { borderRadius: '12px', background: '#111827', color: '#fff' }
              });
              e.target.reset();
            }}
            className="flex flex-col sm:flex-row gap-2 pt-2"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-gray-50 dark:bg-gray-800 text-xs text-primary dark:text-primary-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary dark:bg-white text-white dark:text-primary hover:bg-black dark:hover:bg-gray-150 rounded-xl text-xs font-bold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
