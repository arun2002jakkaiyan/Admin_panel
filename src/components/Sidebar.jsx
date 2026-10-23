import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UserCheck, 
  Wrench, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Droplets,
  Store,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  pendingDealerCount, 
  pendingOrderCount, 
  activeServiceCount,
  onOpenStorePreview
}) {
  const navSections = [
    {
      title: 'OPERATIONS',
      items: [
        { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard, shortcut: '⌘1' },
        { id: 'orders', label: 'Orders Fulfillment', icon: ShoppingBag, badge: pendingOrderCount, shortcut: '⌘2' },
      ]
    },
    {
      title: 'DEALER ECOSYSTEM',
      items: [
        { 
          id: 'dealers', 
          label: 'Dealer Approvals', 
          icon: UserCheck, 
          badge: pendingDealerCount, 
          badgeColor: 'bg-amber-500 text-white animate-pulse',
          shortcut: '⌘3' 
        },
      ]
    },
    {
      title: 'SERVICES & INVENTORY',
      items: [
        { id: 'service', label: 'RO Service Desk', icon: Wrench, badge: activeServiceCount, shortcut: '⌘4' },
        { id: 'catalog', label: 'Catalog & Pricing', icon: Layers, shortcut: '⌘5' },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-950 text-white flex flex-col shrink-0 min-h-screen border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/25 ring-1 ring-white/20">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base tracking-tight text-white">AquaFlow</h1>
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Enterprise Admin Console</p>
          </div>
        </div>
      </div>

      {/* Nav List with Sections */}
      <nav className="p-3 flex-1 space-y-5 overflow-y-auto">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            <p className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-md shadow-sky-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge > 0 && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-sky-500/80 text-white'}`}>
                          {item.badge}
                        </span>
                      )}
                      <span className={`text-[9px] font-mono opacity-0 group-hover:opacity-60 transition-opacity ${isActive ? 'opacity-80' : ''}`}>
                        {item.shortcut}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Live Storefront Preview Button */}
        <div className="pt-2">
          <button
            onClick={onOpenStorePreview}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800/80 border border-sky-500/30 hover:border-sky-500/60 text-sky-400 hover:text-sky-300 transition-all text-xs font-semibold group shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <Store className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">Store Preview</p>
                <p className="text-[10px] text-slate-400">Retail vs Dealer View</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
          </button>
        </div>
      </nav>

      {/* Deployment & Environment Status */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Vercel Production</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold">
            LIVE
          </span>
        </div>
        <p className="text-slate-400 text-[10px] leading-relaxed">
          SPA Rewrites active via <code className="text-slate-300 font-mono">vercel.json</code>. Zero-cost Firebase Spark authorization rules.
        </p>
      </div>

      {/* Admin Profile Footer */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 text-white font-black flex items-center justify-center text-xs shadow-sm ring-1 ring-white/10 shrink-0">
            AD
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-slate-200 truncate leading-tight">AquaFlow Admin</p>
            <p className="text-[10px] text-slate-500 truncate">admin@aquaflow.com</p>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-950"></div>
      </div>
    </aside>
  );
}
