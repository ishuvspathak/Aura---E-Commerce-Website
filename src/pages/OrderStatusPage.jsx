import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheck, FiDownload, FiPackage, FiShoppingBag, FiTruck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const OrderStatusPage = () => {
  const { orderId } = useParams();

  // Find order in local storage
  const order = useMemo(() => {
    const orders = JSON.parse(localStorage.getItem('aura_orders') || '[]');
    return orders.find(o => o.orderId === orderId);
  }, [orderId]);

  if (!order) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-xl font-bold">Order Not Found</h2>
        <p className="text-xs text-gray-400">The order ID "{orderId}" does not exist in our system.</p>
        <Link to="/" className="px-6 py-3 bg-accent text-white rounded-xl text-xs font-semibold inline-block">
          Return to Homepage
        </Link>
      </div>
    );
  }

  // Determine active step index
  // Steps: Placed -> Confirmed -> Packed -> Shipped -> Out for Delivery -> Delivered
  const statusSteps = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out For Delivery', 'Delivered'];
  const currentStepIndex = statusSteps.indexOf(order.status) !== -1 ? statusSteps.indexOf(order.status) : 0;

  const handleDownloadInvoice = () => {
    toast.success('Downloading invoice PDF simulation...', { icon: '📄' });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Order Tracking</h1>
          <p className="text-xs text-gray-450 mt-1">Receipt ID: <span className="font-semibold text-primary dark:text-white">{order.orderId}</span> • Placed on {order.date}</p>
        </div>
        <button
          onClick={handleDownloadInvoice}
          className="flex items-center space-x-1.5 px-4 py-2 border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold rounded-xl"
        >
          <FiDownload />
          <span>Download Invoice</span>
        </button>
      </div>

      {/* TIMELINE PROGRESS ANIMATION */}
      <section className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-premium space-y-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Shipment Progress</h3>
        
        {/* Horizontal Timeline on larger screens, vertical on mobile */}
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute left-8 right-8 top-5 h-0.5 bg-gray-200 dark:bg-gray-700 -z-0">
            <div 
              className="h-full bg-accent dark:bg-accent-light transition-all duration-500" 
              style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
            />
          </div>

          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <div 
                key={step} 
                className="flex md:flex-col items-center md:text-center w-full md:w-auto relative z-10 space-x-4 md:space-x-0"
              >
                {/* Node circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    isCompleted 
                      ? 'bg-accent border-accent text-white shadow-md' 
                      : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400'
                  } ${isActive ? 'ring-4 ring-accent/20 scale-110' : ''}`}
                >
                  {isCompleted ? <FiCheck className="h-5 w-5 stroke-[3]" /> : <span>{index + 1}</span>}
                </div>

                {/* Text Label */}
                <div className="md:mt-3 text-left md:text-center">
                  <p className={`text-xs font-bold ${isCompleted ? 'text-primary dark:text-white' : 'text-gray-400'}`}>
                    {step}
                  </p>
                  {isActive && (
                    <span className="inline-block text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full mt-0.5">
                      Active State
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ORDERED ITEMS & DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Items list */}
        <section className="md:col-span-2 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center">
            <FiShoppingBag className="mr-2" /> Ordered Items
          </h3>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex items-center space-x-4 text-xs">
                <img src={item.image} alt="" className="w-14 h-14 object-cover rounded-xl border border-gray-100 dark:border-gray-850 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary dark:text-white truncate">{item.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Qty: {item.quantity} {item.size && `• Size: ${item.size}`} {item.color && (
                      <span className="inline-flex items-center ml-1">
                        • Color: 
                        <span 
                          className="inline-block w-2.5 h-2.5 rounded-full ml-1 border border-gray-250"
                          style={{ backgroundColor: item.color }}
                        />
                      </span>
                    )}
                  </p>
                </div>
                <div className="text-right font-bold">
                  <span>${item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-primary dark:text-white">${order.financials.subtotal}</span>
            </div>
            {order.financials.discountAmount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-${order.financials.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-primary dark:text-white">{order.financials.shipping === 0 ? 'Free' : `$${order.financials.shipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (8%)</span>
              <span className="text-primary dark:text-white">${order.financials.tax}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-primary dark:text-white pt-2.5 border-t border-gray-50 dark:border-gray-800">
              <span>Total Paid</span>
              <span>${order.financials.grandTotal}</span>
            </div>
          </div>
        </section>

        {/* Shipping details info cards */}
        <section className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-6 h-fit">
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center">
              <FiTruck className="mr-2" /> Shipping Details
            </h3>
            <div className="text-xs text-gray-650 dark:text-gray-400 space-y-1">
              <p className="font-semibold text-primary dark:text-white">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              <p className="pt-1 text-gray-400">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="space-y-3.5 pt-4 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Payment Information</h3>
            <p className="text-xs text-gray-650 dark:text-gray-400 font-semibold uppercase">
              {order.paymentMethod === 'card' ? '💳 Credit Card / Debit Card' : order.paymentMethod === 'upi' ? 'UPI Wallet Transfer' : '💵 Cash on Delivery'}
            </p>
          </div>
        </section>
      </div>

      <div className="text-center pt-4">
        <Link to="/profile" className="text-xs text-accent hover:underline font-bold">
          View all Order History inside Profile
        </Link>
      </div>
    </div>
  );
};

export default OrderStatusPage;
