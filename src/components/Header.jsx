import React, { useState } from 'react';
import { 
  Bell, 
  RefreshCw, 
  CheckCircle2, 
  Search, 
  Store, 
  ChevronRight, 
  ShieldCheck,
  Command,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  onResetDemoData, 
  onOpenStorePreview,
  notificationsCount = 3 
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const tabLabels = {
    dashboard: 'Executive Dashboard',
    orders: 'Orders Fulfillment',
    dealers: 'Dealer Approvals & GST Desk',
    service: 'RO Service Desk',
    catalog: 'Product Inventory & Pricing',
  };

  const sampleNotifications = [
    { id: 1, title: 'New Dealer Application', desc: 'Patel RO Solutions (GST: 24BBBBB0000A1Z9) submitted.', time: '10m ago', unread: true },
    { id: 2, title: 'Wholesale Order Placed', desc: 'Sharma AquaTech placed ₹11,500 bulk pump order.', time: '1h ago', unread: true },
    { id: 3, title: 'RO Service Assigned', desc: 'Technician Manoj Kumar assigned to Ticket #SRV-8102.', time: '3h ago', unread: false },
  ];

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30 transition-all">
      {/* Breadcrumbs Path */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium">AquaFlow Console</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-bold text-slate-800 text-sm tracking-tight">
          {tabLabels[activeTab] || 'Dashboard'}
        </span>
      </div>

      {/* Center / Right Control Panel */}
      <div className="flex items-center gap-3">
        {/* Storefront Preview Action */}
        <button
          onClick={onOpenStorePreview}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sky-200 bg-sky-50/60 hover:bg-sky-100/80 text-sky-700 text-xs font-bold transition-all shadow-xs"
          title="Preview Customer vs Dealer pricing live"
        >
          <Store className="w-3.5 h-3.5 text-sky-600" />
          <span>Live Store View</span>
          <span className="px-1 py-0.2 rounded bg-sky-200 text-sky-800 text-[9px] font-extrabold uppercase">
            Preview
          </span>
        </button>

        {/* Reset Demo Data Button */}
        <button
          onClick={onResetDemoData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          title="Reset sample orders, dealer requests and services"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] text-sky-600 font-bold cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="space-y-2.5">
                {sampleNotifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Firebase Spark Status */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Spark Cloud Sync</span>
        </div>

        {/* Admin Avatar Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-500 text-white font-bold flex items-center justify-center text-xs shadow-sm ring-2 ring-sky-500/20">
            AD
          </div>
          <div className="text-left hidden xl:block">
            <p className="text-xs font-bold text-slate-800 leading-tight">Admin Desk</p>
            <p className="text-[10px] text-slate-400">admin@aquaflow.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
