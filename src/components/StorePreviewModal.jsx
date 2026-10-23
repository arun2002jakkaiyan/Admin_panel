import React, { useState } from 'react';
import { 
  X, 
  Store, 
  User, 
  BadgeCheck, 
  ShoppingBag, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function StorePreviewModal({ catalog, onClose }) {
  const [previewRole, setPreviewRole] = useState('dealer'); // 'customer' or 'dealer'
  const isDealer = previewRole === 'dealer';

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-50 rounded-3xl max-w-5xl w-full h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Top Bar */}
        <div className="bg-slate-950 text-white p-4 px-6 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-slate-950 font-black">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Live Storefront Perspective Simulator</h3>
              <p className="text-[11px] text-slate-400">Preview catalog pricing dynamically as seen by Customers vs Dealers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Perspective Switcher */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setPreviewRole('customer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  previewRole === 'customer' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Customer (Retail)</span>
              </button>
              <button
                onClick={() => setPreviewRole('dealer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  previewRole === 'dealer' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>Approved Dealer (Wholesale)</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Perspective Alert Banner */}
        <div className={`p-3 px-6 text-xs flex items-center justify-between border-b ${
          isDealer ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 font-medium' : 'bg-sky-500/10 border-sky-500/20 text-sky-900 font-medium'
        }`}>
          <span>
            {isDealer 
              ? '✨ Wholesale Mode Active: Displaying Sharma AquaTech (GST Verified Dealer) contract pricing with minimum bulk cartons.' 
              : '🛒 Customer Mode Active: Displaying consumer retail prices with complimentary home installation.'}
          </span>
          <span className="font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white shadow-2xs">
            {isDealer ? '35% Wholesale Margin' : 'Standard Retail'}
          </span>
        </div>

        {/* Catalog Grid */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {catalog.slice(0, 6).map((item) => {
              const savings = item.price > 0 ? Math.round(((item.price - item.dealerPrice) / item.price) * 100) : 0;
              return (
                <div key={item.id} className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      {isDealer && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black shadow-xs">
                          WHOLESALE -{savings}%
                        </span>
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 text-slate-800 text-[10px] font-bold shadow-2xs uppercase">
                        {item.subCategory || item.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span className="font-bold text-slate-700">{item.rating}</span>
                        <span className="text-[10px] text-slate-400">({item.reviewsCount} reviews)</span>
                      </div>

                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.name}</h4>

                      {/* Pricing block */}
                      <div className="pt-1">
                        {isDealer ? (
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-lg font-black text-emerald-700">₹{item.dealerPrice.toLocaleString()}</span>
                              <span className="text-xs text-slate-400 line-through">₹{item.price.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                              Wholesale Minimum Bulk Order: {item.minBulkOrder || 5} units
                            </p>
                          </div>
                        ) : (
                          <div>
                            <span className="text-lg font-black text-sky-600">₹{item.price.toLocaleString()}</span>
                            <p className="text-[10px] text-slate-400 mt-0.5">Free delivery + 1 Year Onsite Warranty</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button className={`w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                      isDealer ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-sky-600 hover:bg-sky-700'
                    }`}>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isDealer ? `Bulk Order (${item.minBulkOrder || 5} Pcs)` : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white p-4 px-6 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>Connected to AquaFlow Mobile App API & Firebase Firestore backend</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
