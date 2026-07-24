import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import ProductCard from '../components/product/ProductCard';
import { 
  FiHeart, FiShoppingCart, FiTruck, FiRefreshCw, FiShield, 
  FiChevronLeft, FiChevronRight, FiCheckCircle, FiShare2, FiActivity 
} from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();

  // Find product
  const product = useMemo(() => {
    return products.find(p => p.id === id);
  }, [id]);

  // States
  const [activeImage, setActiveImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [zipCode, setZipCode] = useState('');
  const [shippingEstimate, setShippingEstimate] = useState('');

  // Reviews list state
  const [reviews, setReviews] = useState([
    { id: 1, author: "Jane Doe", rating: 5, date: "2026-05-14", text: "Absolutely incredible build quality! The sound resolution is crisp and clear.", verified: true },
    { id: 2, author: "John Smith", rating: 4, date: "2026-06-02", text: "Very good, solid performance. Extremely happy with the purchase.", verified: true }
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  // Sync state with product details
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
      
      // Track recently viewed products
      const recentlyViewed = JSON.parse(localStorage.getItem('aura_recently_viewed') || '[]');
      const filtered = recentlyViewed.filter(pId => pId !== product.id);
      localStorage.setItem('aura_recently_viewed', JSON.stringify([product.id, ...filtered].slice(0, 5)));
    }
  }, [product]);

  const favorited = product ? isInWishlist(product.id) : false;
  const compared = product ? isInCompare(product.id) : false;

  // Frequently Bought Together (Bundle products)
  const bundleProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 2);
  }, [product]);

  // Similar Products
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  // Recently Viewed Loader
  const recentlyViewedProducts = useMemo(() => {
    if (!product) return [];
    const list = JSON.parse(localStorage.getItem('aura_recently_viewed') || '[]');
    return products.filter(p => list.includes(p.id) && p.id !== product.id);
  }, [product]);

  if (!product) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <p className="text-xs text-gray-400">The product you are trying to view does not exist or has been removed.</p>
        <Link to="/shop" className="px-6 py-3 bg-accent text-white rounded-xl text-xs font-semibold inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Item is out of stock.');
      return;
    }
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success(`${product.name} added to cart!`, {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
  };

  const handleBuyNow = () => {
    if (product.stock === 0) {
      toast.error('Item is out of stock.');
      return;
    }
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
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

  const handleCompareToggle = () => {
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

  const handleAddBundle = () => {
    addToCart(product, 1, selectedColor, selectedSize);
    bundleProducts.forEach(p => addToCart(p, 1));
    toast.success('Successfully added bundle items to cart!', {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
  };

  const handleZipCheck = (e) => {
    e.preventDefault();
    if (!zipCode.trim() || zipCode.length < 5) {
      toast.error('Please enter a valid zip code.');
      return;
    }
    // Mock delivery dates
    setShippingEstimate(`Estimated Delivery by: Friday, ${new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString([], { month: 'short', day: 'numeric' })}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!', { icon: '🔗' });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) {
      toast.error('Please fill in your name and review message.');
      return;
    }
    const newRev = {
      id: Date.now(),
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      text: newReviewText,
      verified: true
    };
    setReviews(prev => [newRev, ...prev]);
    setNewReviewAuthor('');
    setNewReviewText('');
    toast.success('Thank you for your feedback! Review published.', {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
  };

  return (
    <div className="space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-gray-400 flex items-center space-x-1.5 uppercase font-bold tracking-wide">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white max-w-[150px] truncate">{product.name}</span>
      </nav>

      {/* Main Product Info section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left column: Image Gallery with thumbnail switcher & zoom container */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 dark:bg-gray-800/40 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 relative image-zoom-container">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-xs font-bold bg-danger text-white">
                -{product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails list */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-3.5">
              {product.images.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border transition-all ${
                    activeImage === imgUrl 
                      ? 'border-accent dark:border-accent-light ring-2 ring-accent/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Specs, pricing, color sizing select, CTAs */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{product.brand}</span>
              <button 
                onClick={handleShare}
                className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                aria-label="Share"
              >
                <FiShare2 className="h-4 w-4" />
              </button>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-primary dark:text-primary-dark">
              {product.name}
            </h2>

            {/* Ratings summary link */}
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex text-amber-400">
                <AiFillStar className="h-4 w-4" />
              </div>
              <span className="font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
              <span className="text-gray-400">({reviews.length} customer reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-black text-primary dark:text-primary-dark">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-xs text-gray-550 dark:text-gray-450 leading-relaxed">
              {product.description}
            </p>

            {/* Colors picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-400">Select Color</span>
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
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-400">Select Options</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-primary border-primary text-white dark:bg-white dark:border-white dark:text-primary'
                          : 'border-gray-250 hover:border-gray-400 text-gray-600 dark:border-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantities adjuster */}
            <div className="flex items-center space-x-4">
              <span className="text-xs font-semibold text-gray-400">Quantity</span>
              <div className="flex items-center border border-gray-250 dark:border-gray-700 rounded-xl">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3.5 py-2 text-gray-500 hover:text-primary dark:hover:text-white"
                >
                  -
                </button>
                <span className="px-3.5 text-xs font-bold text-primary dark:text-primary-dark">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3.5 py-2 text-gray-500 hover:text-primary dark:hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Availability */}
            <div className="text-xs">
              {product.stock > 0 ? (
                <span className="text-success font-medium flex items-center">
                  <CheckCircleIcon /> In stock ({product.stock} items left)
                </span>
              ) : (
                <span className="text-danger font-medium flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-danger mr-2" /> Out of stock
                </span>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex space-x-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-3.5 bg-accent hover:bg-accent-dark text-white rounded-2xl text-xs font-bold shadow-md transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-300 dark:disabled:bg-gray-850"
              >
                <FiShoppingCart className="h-4.5 w-4.5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 py-3.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-150 text-white dark:text-gray-900 rounded-2xl text-xs font-bold transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-850"
              >
                Buy Now
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`p-3.5 rounded-2xl border transition-colors ${
                  favorited
                    ? 'bg-danger/10 border-danger/25 text-danger'
                    : 'border-gray-200 hover:border-gray-400 text-gray-500 dark:border-gray-700'
                }`}
                aria-label="Wishlist"
              >
                <FiHeart className="h-5 w-5 fill-current" />
              </button>

              <button
                onClick={handleCompareToggle}
                className={`p-3.5 rounded-2xl border transition-colors ${
                  compared
                    ? 'bg-accent/10 border-accent/25 text-accent'
                    : 'border-gray-200 hover:border-gray-400 text-gray-500 dark:border-gray-700'
                }`}
                aria-label="Compare Specs"
              >
                <FiActivity className="h-5 w-5" />
              </button>
            </div>

            {/* Delivery Estimator widget */}
            <form onSubmit={handleZipCheck} className="pt-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-400 flex items-center"><FiTruck className="mr-1.5" /> Check Shipping Estimate</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter Zip Code (e.g. 90210)"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="bg-gray-55 dark:bg-gray-800 text-[11px] text-primary dark:text-primary-dark border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent w-full max-w-[200px]"
                  maxLength={5}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold rounded-xl"
                >
                  Verify
                </button>
              </div>
              {shippingEstimate && (
                <p className="text-xs text-accent font-medium mt-1.5">{shippingEstimate}</p>
              )}
            </form>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 text-[10px] text-gray-400">
              <div className="flex items-center space-x-2">
                <FiShield />
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiRefreshCw />
                <span>30-Day Refund Policy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FREQUENTLY BOUGHT TOGETHER BUNDLE */}
      {bundleProducts.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 shadow-premium">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Frequently Bought Together</h3>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4 text-gray-400 font-bold text-xl">
              {/* Main product */}
              <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/40 p-2.5 rounded-2xl border border-gray-100 dark:border-gray-750">
                <img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg" />
                <div className="text-xs text-left">
                  <p className="font-semibold text-primary dark:text-white truncate max-w-[120px]">{product.name}</p>
                  <p className="text-accent">${product.price}</p>
                </div>
              </div>
              
              <span>+</span>

              {/* Bundle 1 */}
              {bundleProducts.map((p, idx) => (
                <React.Fragment key={p.id}>
                  {idx > 0 && <span>+</span>}
                  <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/40 p-2.5 rounded-2xl border border-gray-100 dark:border-gray-750">
                    <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg" />
                    <div className="text-xs text-left">
                      <p className="font-semibold text-primary dark:text-white truncate max-w-[120px]">{p.name}</p>
                      <p className="text-accent">${p.price}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Pricing bundle checkout */}
            <div className="flex items-center space-x-4 border-l border-gray-100 dark:border-gray-800 pl-6">
              <div className="text-right">
                <p className="text-xs text-gray-400 font-semibold">Bundle Price</p>
                <p className="text-lg font-black text-primary dark:text-white">
                  ${product.price + bundleProducts.reduce((sum, p) => sum + p.price, 0)}
                </p>
                <p className="text-[10px] text-success">Bundle savings applied</p>
              </div>
              <button
                onClick={handleAddBundle}
                className="px-5 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-bold shadow-md"
              >
                Add All to Cart
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. TABS: SPECS / REVIEWS */}
      <section className="space-y-6">
        <div className="flex border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-6 text-xs font-bold uppercase tracking-wider border-b-2 transition-all focus:outline-none ${
              activeTab === 'specs' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-gray-400 hover:text-primary dark:hover:text-white'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-6 text-xs font-bold uppercase tracking-wider border-b-2 transition-all focus:outline-none ${
              activeTab === 'reviews' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-gray-400 hover:text-primary dark:hover:text-white'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab content */}
        <div>
          {activeTab === 'specs' ? (
            <div className="bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-850 p-6 overflow-hidden">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-50 dark:border-gray-850 last:border-0">
                      <td className="py-3 font-semibold text-gray-400 w-1/3">{key}</td>
                      <td className="py-3 text-primary dark:text-white font-medium">{value}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-gray-50 dark:border-gray-850">
                    <td className="py-3 font-semibold text-gray-400">Seller</td>
                    <td className="py-3 text-primary dark:text-white font-medium">{product.seller}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-gray-400">Warranty</td>
                    <td className="py-3 text-primary dark:text-white font-medium">{product.warranty}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-5 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-850 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-primary dark:text-white">{rev.author}</span>
                        {rev.verified && (
                          <span className="ml-2 text-[9px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full inline-flex items-center">
                            <FiCheckCircle className="mr-0.5" /> Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => <AiFillStar key={i} />)}
                    </div>

                    <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
                      {rev.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Write Review Form */}
              <div className="p-6 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-850 rounded-2xl space-y-4 h-fit">
                <h4 className="text-sm font-bold text-primary dark:text-white">Write a Customer Review</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Star Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                      <option value={2}>2 Stars (Poor)</option>
                      <option value={1}>1 Star (Awful)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Message</label>
                    <textarea
                      rows={3}
                      placeholder="Share your experience..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. SIMILAR PRODUCTS CAROUSEL */}
      {similarProducts.length > 0 && (
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-accent">Recommendations</span>
            <h2 className="text-2xl font-black text-primary dark:text-primary-dark tracking-tight mt-1">Similar Products</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 5. RECENTLY VIEWED PRODUCTS */}
      {recentlyViewedProducts.length > 0 && (
        <section className="space-y-6 border-t border-gray-100 dark:border-gray-800 pt-12">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-accent">History</span>
            <h2 className="text-xl font-bold text-primary dark:text-primary-dark mt-1">Recently Viewed</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recentlyViewedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Simple inline helper SVG component
const CheckCircleIcon = () => (
  <FiCheckCircle className="mr-1.5 h-4 w-4 stroke-[2.5]" />
);

export default ProductDetails;
