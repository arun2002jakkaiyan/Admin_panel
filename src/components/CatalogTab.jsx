import React, { useState } from 'react';
import { 
  Search, 
  Edit3, 
  Check, 
  Filter, 
  Layers, 
  DollarSign, 
  Grid, 
  List, 
  Plus, 
  Sparkles, 
  X, 
  Package, 
  TrendingDown,
  Eye,
  Star
} from 'lucide-react';

export default function CatalogTab({ catalog, onUpdateProduct, onAddProduct }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editDealerPrice, setEditDealerPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('purifiers');
  const [newProdSubCategory, setNewProdSubCategory] = useState('RO Purifier');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDealerPrice, setNewProdDealerPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('25');
  const [newProdImageUrl, setNewProdImageUrl] = useState('https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80');

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditPrice(p.price);
    setEditDealerPrice(p.dealerPrice);
    setEditStock(p.stock);
  };

  const saveEdit = (id) => {
    onUpdateProduct(id, {
      price: Number(editPrice),
      dealerPrice: Number(editDealerPrice),
      stock: Number(editStock),
    });
    setEditingId(null);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const newProduct = {
      id: `pur-${Date.now() % 10000}`,
      name: newProdName,
      category: newProdCategory,
      subCategory: newProdSubCategory,
      price: Number(newProdPrice),
      dealerPrice: Number(newProdDealerPrice || Math.round(Number(newProdPrice) * 0.65)),
      rating: 4.8,
      reviewsCount: 1,
      stock: Number(newProdStock),
      imageUrl: newProdImageUrl,
      description: 'Newly added high performance water purification system.',
      specifications: {
        'Capacity': '10 Litres',
        'Warranty': '1 Year Comprehensive'
      },
      minBulkOrder: 5,
      isFeatured: true
    };

    if (onAddProduct) {
      onAddProduct(newProduct);
    }
    setShowAddModal(false);
  };

  const categories = [
    { id: 'ALL', label: 'All Products', count: catalog.length },
    { id: 'purifiers', label: 'Purifiers', count: catalog.filter(p => p.category === 'purifiers').length },
    { id: 'dispensers', label: 'Dispensers', count: catalog.filter(p => p.category === 'dispensers').length },
    { id: 'pumps', label: 'RO Pumps', count: catalog.filter(p => p.category === 'pumps').length },
    { id: 'filters', label: 'Membranes & Filters', count: catalog.filter(p => p.category === 'filters').length },
    { id: 'spares', label: 'Spare Parts', count: catalog.filter(p => p.category === 'spares').length },
  ];

  const filtered = catalog.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subCategory.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || p.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Search & Action Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 64+ water purifiers, pumps, membranes, valves..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid Visual View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Dense Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-sky-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New SKU</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              categoryFilter === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              categoryFilter === cat.id ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => {
            const isEditing = editingId === p.id;
            const savingsPercent = p.price > 0 ? Math.round(((p.price - p.dealerPrice) / p.price) * 100) : 0;

            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Zoom */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <button
                      onClick={() => setPreviewImage(p.imageUrl)}
                      className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
                      title="Inspect Image"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-black uppercase text-slate-800 shadow-2xs">
                      {p.subCategory || p.category}
                    </span>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black shadow-2xs">
                      -{savingsPercent}% WHOLESALE
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="font-bold text-slate-700">{p.rating}</span>
                      <span className="text-[10px] text-slate-400">({p.reviewsCount} reviews)</span>
                    </div>

                    <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">{p.name}</h4>

                    {/* Pricing Box */}
                    {isEditing ? (
                      <div className="space-y-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block">Retail Price (₹)</label>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-full p-1 border rounded text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-emerald-700 font-bold block">Wholesale Price (₹)</label>
                          <input
                            type="number"
                            value={editDealerPrice}
                            onChange={(e) => setEditDealerPrice(e.target.value)}
                            className="w-full p-1 border rounded text-xs font-bold text-emerald-700"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block">Stock Count</label>
                          <input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(e.target.value)}
                            className="w-full p-1 border rounded text-xs font-bold"
                          />
                        </div>
                        <button
                          onClick={() => saveEdit(p.id)}
                          className="w-full py-1 bg-emerald-600 text-white rounded font-bold text-xs mt-1"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[10px] text-slate-500 font-medium">Retail MRP:</span>
                          <span className="font-bold text-xs text-slate-800">₹{p.price.toLocaleString()}</span>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-[10px] text-emerald-700 font-bold">Dealer Wholesale:</span>
                          <span className="font-extrabold text-sm text-emerald-700">₹{p.dealerPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60 text-[10px]">
                          <span className="text-slate-400">Warehouse Stock:</span>
                          <span className={`font-bold ${p.stock < 15 ? 'text-amber-600' : 'text-slate-700'}`}>
                            {p.stock} units
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                {!isEditing && (
                  <div className="p-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => startEdit(p)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Adjust Pricing</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* DENSE TABLE VIEW */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Product Name & Category</th>
                  <th className="py-3.5 px-4">Retail Price (₹)</th>
                  <th className="py-3.5 px-4">Wholesale Dealer (₹)</th>
                  <th className="py-3.5 px-4">Wholesale Discount</th>
                  <th className="py-3.5 px-4">Stock Health</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => {
                  const isEditing = editingId === p.id;
                  const savingsPercent = p.price > 0 ? Math.round(((p.price - p.dealerPrice) / p.price) * 100) : 0;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div>
                            <p className="font-extrabold text-slate-900 leading-snug">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.id} • {p.subCategory || p.category}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-20 p-1 border rounded text-xs font-bold"
                          />
                        ) : (
                          `₹${p.price.toLocaleString()}`
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-black text-emerald-700">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editDealerPrice}
                            onChange={(e) => setEditDealerPrice(e.target.value)}
                            className="w-20 p-1 border rounded text-xs font-bold text-emerald-700"
                          />
                        ) : (
                          `₹${p.dealerPrice.toLocaleString()}`
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] border border-emerald-200">
                          {savingsPercent}% OFF
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(e.target.value)}
                            className="w-16 p-1 border rounded text-xs font-bold"
                          />
                        ) : (
                          <span className={`font-bold ${p.stock < 15 ? 'text-amber-600' : 'text-slate-700'}`}>
                            {p.stock} units
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {isEditing ? (
                          <button
                            onClick={() => saveEdit(p.id)}
                            className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => startEdit(p)}
                            className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Edit Pricing & Stock"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-extrabold text-base text-slate-900">Add Water Purifier SKU to Catalog</h4>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AquaFlow Copper Pro 10L RO+UV"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    <option value="purifiers">Water Purifiers</option>
                    <option value="dispensers">Dispensers</option>
                    <option value="pumps">Booster Pumps</option>
                    <option value="filters">Membranes & Filters</option>
                    <option value="spares">Spare Parts</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={newProdSubCategory}
                    onChange={(e) => setNewProdSubCategory(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Retail Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15999"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full p-2.5 border rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-emerald-700 block mb-1">Wholesale Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 10500"
                    value={newProdDealerPrice}
                    onChange={(e) => setNewProdDealerPrice(e.target.value)}
                    className="w-full p-2.5 border rounded-xl font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL (Unsplash or Cloudinary)</label>
                <input
                  type="url"
                  value={newProdImageUrl}
                  onChange={(e) => setNewProdImageUrl(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save & Publish SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Lightbox Preview Modal */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-2xl max-h-[85vh] bg-white p-3 rounded-3xl shadow-2xl overflow-hidden">
            <img src={previewImage} alt="Preview" className="w-full h-auto max-h-[75vh] object-contain rounded-2xl" />
            <p className="text-center text-xs text-slate-500 font-semibold mt-2">Click anywhere to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
