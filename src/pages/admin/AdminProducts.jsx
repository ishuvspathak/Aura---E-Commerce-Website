import React, { useState, useEffect, useMemo } from 'react';
import { products as initialProducts } from '../../data/products';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiX, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  // Sync products with local storage for CRUD persistence
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('aura_admin_products');
    if (saved) return JSON.parse(saved);
    // On first load, seed with the 60 items
    localStorage.setItem('aura_admin_products', JSON.stringify(initialProducts));
    return initialProducts;
  });

  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states (Add)
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Mobiles');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop');

  useEffect(() => {
    localStorage.setItem('aura_admin_products', JSON.stringify(products));
    // Also update a global cache so that other pages (Shop, details) fetch the CRUD items!
    // We'll write the productService or state to read 'aura_admin_products' as well.
  }, [products]);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const q = searchTerm.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [products, searchTerm]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!name || !brand || !price || !stock) {
      toast.error('Please enter name, brand, price, and stock levels.');
      return;
    }

    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const newProduct = {
      id: `custom-prod-${Date.now()}`,
      name,
      brand,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice || price),
      discount,
      stock: Number(stock),
      description,
      features: ["Premium quality materials", "Durable build"],
      specifications: { "Manufacturer": brand },
      rating: 5.0,
      reviewCount: 0,
      images: [imageLink],
      colors: ["#111827", "#ffffff"],
      sizes: ["Standard"],
      deliveryTime: "Ships tomorrow",
      warranty: "1 Year Warranty",
      seller: "Aura Premium Store"
    };

    setProducts(prev => [newProduct, ...prev]);
    toast.success('Product added successfully!');
    
    // Reset forms
    setName('');
    setBrand('');
    setCategory('Mobiles');
    setPrice('');
    setOriginalPrice('');
    setStock('');
    setDescription('');
    setImageLink('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop');
    setIsAddModalOpen(false);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.brand || !editingProduct.price) {
      toast.error('Please complete name, brand, and pricing.');
      return;
    }

    setProducts(prev => prev.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    ));

    toast.success('Product updated successfully!');
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Products Management</h2>
          <p className="text-xs text-gray-550 mt-1">Manage, update details, or delete items inside the store catalogue.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-5 py-3 bg-accent hover:bg-accent-dark text-white text-xs font-bold rounded-2xl shadow-md transition-colors"
        >
          <FiPlus className="stroke-[2.5]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search filters */}
      <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-4 shadow-premium max-w-xs relative flex items-center">
        <FiSearch className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-400" />
        <input
          type="text"
          placeholder="Filter products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-800 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-accent text-primary dark:text-white"
        />
      </div>

      {/* Catalog items list */}
      <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl shadow-premium overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="p-4">Details</th>
              <th className="p-4">Category</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((prod) => (
              <tr key={prod.id} className="border-b border-gray-50 dark:border-gray-850 hover:bg-gray-50/20 last:border-0">
                <td className="p-4 flex items-center space-x-3">
                  <img src={prod.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg border border-gray-100 dark:border-gray-800" />
                  <div className="min-w-0">
                    <p className="font-semibold text-primary dark:text-white truncate max-w-[200px]">{prod.name}</p>
                    <p className="text-[10px] text-gray-400">ID: {prod.id}</p>
                  </div>
                </td>
                <td className="p-4 font-semibold text-gray-650 dark:text-gray-450">{prod.category}</td>
                <td className="p-4 font-semibold text-gray-650 dark:text-gray-450">{prod.brand}</td>
                <td className="p-4 font-bold text-primary dark:text-white">${prod.price}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    prod.stock > 5 ? 'bg-success/10 text-success' : prod.stock > 0 ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                  }`}>
                    {prod.stock > 0 ? `${prod.stock} Units` : 'Out of Stock'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => handleEditClick(prod)}
                    className="p-2 rounded-lg border border-gray-100 hover:border-gray-300 dark:border-gray-850 dark:hover:border-gray-700 text-gray-500 hover:text-accent inline-flex items-center"
                    aria-label="Edit product"
                  >
                    <FiEdit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(prod.id)}
                    className="p-2 rounded-lg border border-gray-100 hover:border-gray-300 dark:border-gray-850 dark:hover:border-gray-700 text-gray-400 hover:text-danger inline-flex items-center"
                    aria-label="Delete product"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD NEW PRODUCT MODAL */}
      {isAddModalOpen && (
        <>
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer" />
          <div className="fixed inset-6 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl bg-card-light dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-2xl z-52 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
              <h3 className="text-sm font-bold text-primary dark:text-white">Add New Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-850"><FiX className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Product Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Brand</label>
                  <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white">
                    <option value="Mobiles">Mobiles</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Audio">Audio</option>
                    <option value="Smart Devices">Smart Devices</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Kitchen">Kitchen</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Price ($)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Orig Price ($)</label>
                  <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Stock Units</label>
                  <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" required />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Image Link</label>
                <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Description</label>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" />
              </div>
              <div className="flex space-x-2 pt-2">
                <button type="submit" className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold shadow-md">Add Product</button>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* EDIT PRODUCT MODAL */}
      {isEditModalOpen && editingProduct && (
        <>
          <div onClick={() => setIsEditModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer" />
          <div className="fixed inset-6 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl bg-card-light dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-2xl z-52 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
              <h3 className="text-sm font-bold text-primary dark:text-white">Edit Product Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-855"><FiX className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleEditProductSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Product Name</label>
                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Brand</label>
                  <input type="text" value={editingProduct.brand} onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Category</label>
                  <input type="text" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Price ($)</label>
                  <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Stock levels</label>
                  <input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })} className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent text-primary dark:text-white" required />
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <button type="submit" className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold shadow-md">Save Changes</button>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProducts;
