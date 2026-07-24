import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMapPin, FiCreditCard, FiShoppingBag, FiActivity, FiTrash2, FiPlus, FiSettings } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { 
    user, updateProfile, addAddress, deleteAddress, 
    addCard, deleteCard, isAuthenticated 
  } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth page if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Tab state: 'info', 'addresses', 'cards', 'orders'
  const [activeTab, setActiveTab] = useState('orders');

  // Info edit state
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Address add form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrType, setAddrType] = useState('Home');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrZip, setAddrZip] = useState('');
  const [addrPhone, setAddrPhone] = useState('');

  // Card add form state
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  // Fetch orders matching this user id
  const userOrders = useMemo(() => {
    if (!user) return [];
    const allOrders = JSON.parse(localStorage.getItem('aura_orders') || '[]');
    return allOrders.filter(o => o.userId === user.id);
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      toast.error('Name and Email cannot be empty.');
      return;
    }
    updateProfile({ username, email, avatar });
    toast.success('Profile details updated successfully!', {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!addrStreet || !addrCity || !addrState || !addrZip || !addrPhone) {
      toast.error('Please fill in all address fields.');
      return;
    }
    addAddress({
      type: addrType,
      street: addrStreet,
      city: addrCity,
      state: addrState,
      zip: addrZip,
      phone: addrPhone,
      isDefault: user.addresses?.length === 0 ? true : false
    });
    toast.success('Address saved successfully!');
    setAddrStreet('');
    setAddrCity('');
    setAddrState('');
    setAddrZip('');
    setAddrPhone('');
    setShowAddressForm(false);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry) {
      toast.error('Please fill in all card details.');
      return;
    }
    const maskedNumber = `**** **** **** ${cardNumber.slice(-4)}`;
    addCard({
      type: 'Visa', // mock
      number: maskedNumber,
      name: cardName.toUpperCase(),
      expiry: cardExpiry,
      isDefault: user.cards?.length === 0 ? true : false
    });
    toast.success('Card linked successfully!');
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setShowCardForm(false);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 1. LEFT SIDEBAR PROFILE TABS */}
      <aside className="w-full lg:w-64 flex-shrink-0 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium h-fit space-y-6">
        {/* Avatar and name */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <img 
              src={user.avatar} 
              alt={user.username} 
              className="w-20 h-20 rounded-full object-cover border border-gray-150 dark:border-gray-700 mx-auto" 
            />
            <span className="absolute bottom-0 right-1 h-3.5 w-3.5 bg-success rounded-full border-2 border-white dark:border-gray-900" />
          </div>
          <div>
            <h2 className="text-base font-bold text-primary dark:text-white truncate">{user.username}</h2>
            <p className="text-[10px] text-gray-400 font-semibold uppercase">{user.role} Account</p>
          </div>
        </div>

        {/* Tab buttons */}
        <nav className="flex flex-col space-y-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left ${
              activeTab === 'orders'
                ? 'bg-accent/10 text-accent dark:text-accent-light'
                : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
            }`}
          >
            <FiShoppingBag className="mr-2.5 h-4 w-4" />
            <span>Order History ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left ${
              activeTab === 'info'
                ? 'bg-accent/10 text-accent dark:text-accent-light'
                : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
            }`}
          >
            <FiUser className="mr-2.5 h-4 w-4" />
            <span>Account Details</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left ${
              activeTab === 'addresses'
                ? 'bg-accent/10 text-accent dark:text-accent-light'
                : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
            }`}
          >
            <FiMapPin className="mr-2.5 h-4 w-4" />
            <span>Saved Addresses ({user.addresses?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left ${
              activeTab === 'cards'
                ? 'bg-accent/10 text-accent dark:text-accent-light'
                : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
            }`}
          >
            <FiCreditCard className="mr-2.5 h-4 w-4" />
            <span>Linked Cards ({user.cards?.length || 0})</span>
          </button>
        </nav>
      </aside>

      {/* 2. RIGHT VIEW DETAILS */}
      <main className="flex-1">
        {/* Tab 1: Orders log */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="text-md font-bold text-primary dark:text-white">Order History</h3>
            
            {userOrders.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-card-dark rounded-3xl border border-gray-150 dark:border-gray-800 shadow-premium text-gray-500">
                <FiShoppingBag className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                <p className="text-xs font-semibold">No orders recorded yet.</p>
                <p className="text-[10px] text-gray-400 mt-1">Visit our shop catalog and place your first order!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((ord) => (
                  <div 
                    key={ord.orderId}
                    className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-5 shadow-premium space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-gray-50 dark:border-gray-850 pb-3 text-xs">
                      <div>
                        <span className="font-bold text-primary dark:text-white">{ord.orderId}</span>
                        <span className="text-gray-455 dark:text-gray-400 ml-2">Placed on {ord.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          ord.status === 'Delivered' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
                        }`}>
                          {ord.status}
                        </span>
                        <Link 
                          to={`/track-order/${ord.orderId}`}
                          className="text-[10px] font-bold text-accent hover:underline flex items-center"
                        >
                          Track <FiActivity className="ml-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Items previews */}
                    <div className="space-y-2">
                      {ord.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 text-xs">
                          <img src={item.image} alt="" className="w-8 h-8 object-cover rounded-lg border border-gray-100 dark:border-gray-800 flex-shrink-0" />
                          <span className="font-semibold text-primary dark:text-white truncate flex-1">{item.name}</span>
                          <span className="text-gray-400">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-50 dark:border-gray-850 pt-3 flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-400 font-semibold">Total Amount</span>
                      <span className="text-primary dark:text-white">${ord.financials.grandTotal}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Account details editor */}
        {activeTab === 'info' && (
          <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-6 max-w-xl">
            <h3 className="text-md font-bold text-primary dark:text-white">Account Details</h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Username / Full Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Profile Avatar URL</label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Save Details
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Saved Addresses list */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-primary dark:text-white">Saved Addresses</h3>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="flex items-center space-x-1.5 text-xs font-bold text-accent hover:underline"
              >
                <FiPlus />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Address Form */}
            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-5 shadow-premium space-y-4 max-w-xl">
                <h4 className="text-xs font-bold text-gray-400 uppercase">New Address Details</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Address Type</label>
                    <select
                      value={addrType}
                      onChange={(e) => setAddrType(e.target.value)}
                      className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-primary dark:text-white"
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office / Work</option>
                      <option value="Billing">Billing Address</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Contact Phone</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      value={addrPhone}
                      onChange={(e) => setAddrPhone(e.target.value)}
                      className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-primary dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Street Address</label>
                  <input
                    type="text"
                    value={addrStreet}
                    onChange={(e) => setAddrStreet(e.target.value)}
                    className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-primary dark:text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">City</label>
                    <input
                      type="text"
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-primary dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">State</label>
                    <input
                      type="text"
                      value={addrState}
                      onChange={(e) => setAddrState(e.target.value)}
                      className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-primary dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Zip</label>
                    <input
                      type="text"
                      value={addrZip}
                      onChange={(e) => setAddrZip(e.target.value)}
                      className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-primary dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-2.5 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-bold"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Addresses List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(user.addresses || []).map((addr) => (
                <div 
                  key={addr.id}
                  className="p-5 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl shadow-premium relative"
                >
                  <button
                    onClick={() => {
                      deleteAddress(addr.id);
                      toast.success('Address deleted');
                    }}
                    className="absolute top-4 right-4 text-gray-450 hover:text-danger p-1"
                    aria-label="Delete Address"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-primary dark:text-white">{addr.type}</span>
                      {addr.isDefault && (
                        <span className="text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <div className="text-gray-550 dark:text-gray-400 space-y-0.5">
                      <p>{addr.street}</p>
                      <p>{addr.city}, {addr.state} {addr.zip}</p>
                      <p className="pt-1 text-gray-400">Phone: {addr.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Linked Cards */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-primary dark:text-white">Linked Payment Cards</h3>
              <button
                onClick={() => setShowCardForm(!showCardForm)}
                className="flex items-center space-x-1.5 text-xs font-bold text-accent hover:underline"
              >
                <FiPlus />
                <span>Link Credit Card</span>
              </button>
            </div>

            {showCardForm && (
              <form onSubmit={handleAddCard} className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-5 shadow-premium space-y-4 max-w-md">
                <h4 className="text-xs font-bold text-gray-400 uppercase">Link New Card</h4>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="JOHN SMITH"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-primary dark:text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Card Number</label>
                    <input
                      type="text"
                      placeholder="Enter 16 digits"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-primary dark:text-white"
                      maxLength={16}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-primary dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-2.5 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-bold"
                  >
                    Link Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCardForm(false)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(user.cards || []).map((card) => (
                <div 
                  key={card.id}
                  className="p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl relative shadow-xl min-h-[140px] flex flex-col justify-between border border-gray-800"
                >
                  <button
                    onClick={() => {
                      deleteCard(card.id);
                      toast.success('Card removed');
                    }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
                    aria-label="Remove Card"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>

                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black tracking-widest text-accent-light uppercase">{card.type}</span>
                    {card.isDefault && (
                      <span className="text-[8px] font-bold bg-white/20 px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  
                  <p className="text-sm font-bold tracking-widest my-4">{card.number}</p>
                  
                  <div className="flex justify-between text-[9px] uppercase text-gray-400 font-bold">
                    <div>
                      <p className="scale-75 origin-left">Cardholder</p>
                      <p className="text-white mt-0.5">{card.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="scale-75 origin-right">Expires</p>
                      <p className="text-white mt-0.5">{card.expiry}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
