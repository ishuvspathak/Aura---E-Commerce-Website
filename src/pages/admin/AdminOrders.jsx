import React, { useState, useEffect } from 'react';
import { FiEye, FiTrash2, FiSearch, FiX, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('aura_orders') || '[]');
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  const filteredOrders = orders.filter(o => 
    o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.shippingAddress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => 
      o.orderId === orderId ? { ...o, status: newStatus } : o
    ));
    toast.success(`Order status updated to "${newStatus}"!`, {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel and delete this order?')) {
      setOrders(prev => prev.filter(o => o.orderId !== orderId));
      toast.success('Order deleted');
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Order Management</h2>
        <p className="text-xs text-gray-550 mt-1">Manage client orders, review details, and configure fulfillment shipment tracking.</p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-4 shadow-premium max-w-xs relative flex items-center">
        <FiSearch className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order ID or client name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-55 dark:bg-gray-800 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-accent text-primary dark:text-white"
        />
      </div>

      {/* Orders List Table */}
      <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl shadow-premium overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-55/50 dark:bg-gray-900/50 text-[10px] font-bold text-gray-450 uppercase tracking-wider">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Shipment Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  No orders found. Place orders in checkout to populate this table.
                </td>
              </tr>
            ) : (
              filteredOrders.map((ord) => (
                <tr key={ord.orderId} className="border-b border-gray-50 dark:border-gray-850 hover:bg-gray-50/20 last:border-0">
                  <td className="p-4 font-bold text-primary dark:text-white">{ord.orderId}</td>
                  <td className="p-4 text-gray-750 dark:text-gray-300 font-semibold">{ord.shippingAddress.name}</td>
                  <td className="p-4 text-gray-500">{ord.date}</td>
                  <td className="p-4 font-bold text-primary dark:text-white">${ord.financials.grandTotal}</td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.orderId, e.target.value)}
                      className="bg-gray-55 dark:bg-gray-800 border border-gray-250 dark:border-gray-700 rounded-xl px-2.5 py-1.5 font-semibold focus:outline-none text-primary dark:text-white"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleViewDetails(ord)}
                      className="p-2 rounded-lg border border-gray-100 hover:border-gray-300 dark:border-gray-850 dark:hover:border-gray-700 text-gray-500 hover:text-accent inline-flex items-center"
                      aria-label="View Details"
                    >
                      <FiEye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(ord.orderId)}
                      className="p-2 rounded-lg border border-gray-100 hover:border-gray-300 dark:border-gray-850 dark:hover:border-gray-700 text-gray-400 hover:text-danger inline-flex items-center"
                      aria-label="Delete order"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ORDER DETAILS DIALOG */}
      {isDetailsOpen && selectedOrder && (
        <>
          <div onClick={() => setIsDetailsOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer" />
          <div className="fixed inset-6 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl bg-card-light dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-2xl z-52 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
              <h3 className="text-sm font-bold text-primary dark:text-white">Order Details: {selectedOrder.orderId}</h3>
              <button onClick={() => setIsDetailsOpen(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-850"><FiX className="h-5 w-5" /></button>
            </div>
            
            <div className="space-y-6 text-xs text-gray-650 dark:text-gray-400">
              {/* Shipping address */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-primary dark:text-white uppercase tracking-wider text-[10px]">Shipping Address</h4>
                <p className="font-semibold text-primary dark:text-white">{selectedOrder.shippingAddress.name}</p>
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}</p>
                <p className="text-gray-400">Phone: {selectedOrder.shippingAddress.phone}</p>
              </div>

              {/* Items details */}
              <div className="space-y-2">
                <h4 className="font-bold text-primary dark:text-white uppercase tracking-wider text-[10px]">Ordered Items</h4>
                <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-150 dark:border-gray-850 rounded-2xl p-4 bg-gray-55/30 dark:bg-gray-900/30">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="py-2.5 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-primary dark:text-white">{item.name}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity} {item.size && `• Size: ${item.size}`}</p>
                      </div>
                      <span className="font-bold text-primary dark:text-white">${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-1.5 border-t border-gray-100 dark:border-gray-800 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${selectedOrder.financials.subtotal}</span>
                </div>
                {selectedOrder.financials.discountAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-${selectedOrder.financials.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{selectedOrder.financials.shipping === 0 ? 'Free' : `$${selectedOrder.financials.shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${selectedOrder.financials.tax}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-primary dark:text-white border-t border-gray-50 dark:border-gray-800 pt-2">
                  <span>Total Amount Paid</span>
                  <span>${selectedOrder.financials.grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;
