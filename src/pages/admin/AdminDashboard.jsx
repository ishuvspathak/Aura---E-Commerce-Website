import React, { useMemo } from 'react';
import { products } from '../../data/products';
import { 
  FiDollarSign, FiShoppingBag, FiUsers, FiAlertTriangle, 
  FiTrendingUp, FiActivity, FiArrowUpRight, FiCornerDownRight 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

const AdminDashboard = () => {
  // Read orders from local storage
  const orders = useMemo(() => {
    return JSON.parse(localStorage.getItem('aura_orders') || '[]');
  }, []);

  // Compute stats
  const totalRevenue = useMemo(() => {
    // defaults to $45230 + local orders
    const base = 45230;
    const local = orders.reduce((sum, o) => sum + o.financials.grandTotal, 0);
    return base + local;
  }, [orders]);

  const totalOrdersCount = useMemo(() => {
    return 312 + orders.length;
  }, [orders]);

  const outOfStockItems = useMemo(() => {
    return products.filter(p => p.stock === 0).length;
  }, []);

  // Mock charts data
  const revenueChartData = [
    { name: 'Jan', Sales: 4000 },
    { name: 'Feb', Sales: 5500 },
    { name: 'Mar', Sales: 8000 },
    { name: 'Apr', Sales: 12000 },
    { name: 'May', Sales: 18000 },
    { name: 'Jun', Sales: 24000 },
    { name: 'Jul', Sales: 31000 },
  ];

  const categoryDistributionData = [
    { name: 'Mobiles', Value: 12500 },
    { name: 'Laptops', Value: 18900 },
    { name: 'Audio', Value: 6200 },
    { name: 'Fashion', Value: 8400 },
    { name: 'Furniture', Value: 9500 },
    { name: 'Shoes', Value: 5300 },
  ];

  const topProducts = products.filter(p => p.rating >= 4.8).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Overview Dashboard</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Real-time indicators of sales, catalogue items, and inventory.</p>
      </div>

      {/* KPI Stats cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Gross Revenue</p>
            <p className="text-2xl font-black text-primary dark:text-white">${totalRevenue.toLocaleString()}</p>
            <span className="text-[10px] text-success font-semibold flex items-center"><FiArrowUpRight className="mr-0.5" /> +12.4% vs last month</span>
          </div>
          <div className="p-3.5 bg-accent/10 text-accent rounded-2xl">
            <FiDollarSign className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Orders</p>
            <p className="text-2xl font-black text-primary dark:text-white">{totalOrdersCount}</p>
            <span className="text-[10px] text-success font-semibold flex items-center"><FiArrowUpRight className="mr-0.5" /> +8.1% vs last week</span>
          </div>
          <div className="p-3.5 bg-accent/10 text-accent rounded-2xl">
            <FiShoppingBag className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Customers</p>
            <p className="text-2xl font-black text-primary dark:text-white">198</p>
            <span className="text-[10px] text-success font-semibold flex items-center"><FiArrowUpRight className="mr-0.5" /> +15.2% vs last month</span>
          </div>
          <div className="p-3.5 bg-accent/10 text-accent rounded-2xl">
            <FiUsers className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Out of Stock</p>
            <p className="text-2xl font-black text-primary dark:text-white">{outOfStockItems}</p>
            <span className="text-[10px] text-warning font-semibold flex items-center"><FiAlertTriangle className="mr-0.5" /> Attention needed</span>
          </div>
          <div className="p-3.5 bg-warning/10 text-warning rounded-2xl">
            <FiAlertTriangle className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* ANALYTICS CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center">
            <FiTrendingUp className="mr-2" /> Sales Analytics (Revenue)
          </h3>
          <div className="h-[250px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} />
                <YAxis stroke="#9ca3af" tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="Sales" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown bar chart */}
        <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center">
            <FiActivity className="mr-2" /> Category Distribution
          </h3>
          <div className="h-[250px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} />
                <YAxis stroke="#9ca3af" tickLine={false} />
                <Tooltip />
                <Bar dataKey="Value" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* TOP SELLING PRODUCTS & RECENT ORDERS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Top-Rated Products</h3>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {topProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3 min-w-0">
                  <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg border border-gray-100 dark:border-gray-800" />
                  <div className="min-w-0">
                    <p className="font-semibold text-primary dark:text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-400">{p.brand} • {p.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary dark:text-white">${p.price}</p>
                  <p className="text-[10px] text-amber-500 font-semibold">{p.rating} ★</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent local storage orders */}
        <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Recent Checkout Orders</h3>
            <Link to="/admin/orders" className="text-[10px] font-bold text-accent hover:underline flex items-center">View All Orders <FiCornerDownRight className="ml-1" /></Link>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs">
                No orders placed through this session yet.
              </div>
            ) : (
              orders.slice(0, 5).map((ord) => (
                <div key={ord.orderId} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-primary dark:text-white">{ord.orderId}</p>
                    <p className="text-[10px] text-gray-450">Customer: {ord.shippingAddress.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-primary dark:text-white">${ord.financials.grandTotal}</p>
                    <span className="text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">{ord.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
