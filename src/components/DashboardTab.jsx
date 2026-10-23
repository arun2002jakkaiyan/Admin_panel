import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  UserCheck, 
  Wrench, 
  ArrowUpRight, 
  ArrowRight,
  ShieldAlert,
  Clock,
  CheckCircle,
  Calendar,
  Sparkles,
  Layers,
  Store,
  DollarSign,
  Package,
  Activity,
  Award
} from 'lucide-react';

export default function DashboardTab({ 
  orders, 
  dealers, 
  serviceRequests, 
  setActiveTab, 
  onApproveDealer,
  onOpenStorePreview
}) {
  const [chartRange, setChartRange] = useState('7D');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const wholesaleRevenue = orders
    .filter(o => o.orderType === 'bulk_dealer')
    .reduce((sum, o) => sum + (o.amount || 0), 0);
  const retailRevenue = totalRevenue - wholesaleRevenue;

  const pendingDealers = dealers.filter(d => d.status === 'pending');
  const approvedDealers = dealers.filter(d => d.status === 'approved');
  const activeServices = serviceRequests.filter(s => s.status !== 'Completed');
  const activeOrders = orders.filter(o => o.status !== 'Delivered');

  // Simulated 7-day revenue trend data for SVG area graph
  const trendData = [
    { day: 'Mon', retail: 8500, wholesale: 11500, total: 20000 },
    { day: 'Tue', retail: 14999, wholesale: 18500, total: 33499 },
    { day: 'Wed', retail: 6800, wholesale: 22000, total: 28800 },
    { day: 'Thu', retail: 19500, wholesale: 14500, total: 34000 },
    { day: 'Fri', retail: 15999, wholesale: 28500, total: 44499 },
    { day: 'Sat', retail: 22400, wholesale: 16000, total: 38400 },
    { day: 'Sun', retail: 18900, wholesale: 31000, total: 49900 },
  ];

  const maxVal = Math.max(...trendData.map(d => d.total));

  // Category sales breakdown
  const categoryBreakdown = [
    { name: 'Water Purifiers (RO+UV)', share: 48, revenue: '₹38,500', color: 'bg-sky-500' },
    { name: 'RO Booster Pumps & Motors', share: 24, revenue: '₹19,250', color: 'bg-indigo-500' },
    { name: 'Filters & RO Membranes', share: 18, revenue: '₹14,400', color: 'bg-emerald-500' },
    { name: 'Spares & Brass Valves', share: 10, revenue: '₹8,000', color: 'bg-amber-500' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 p-6 rounded-3xl text-white shadow-xl shadow-slate-900/10 border border-slate-800 relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-1 border border-sky-500/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>Water Purity E-Commerce OS</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Welcome to AquaFlow Command Center
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Real-time fulfillment tracking across residential retail buyers and certified wholesale dealer distribution networks.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={onOpenStorePreview}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-sky-500/25"
          >
            <Store className="w-4 h-4" />
            <span>Storefront Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <span>Fulfillment Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Pending Dealer Action Alert if any */}
      {pendingDealers.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <span>{pendingDealers.length} Dealer Partner Application(s) Awaiting Review</span>
                <span className="text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full font-extrabold uppercase">
                  Action Required
                </span>
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                New RO distributors have registered with GST details. Verify their business license to unlock wholesale tier pricing.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('dealers')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
          >
            <span>Review Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Sales */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</h3>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +24.8%
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-emerald-600">Wholesale: ₹{wholesaleRevenue.toLocaleString()}</span>
            <span>Retail: ₹{retailRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Orders Volume</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">{orders.length}</h3>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {orders.filter(o => o.orderType === 'bulk_dealer').length} Wholesale
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-medium">{activeOrders.length} In Delivery Pipeline</span>
          </div>
        </div>

        {/* Dealer Network */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Dealer Network</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">{approvedDealers.length}</h3>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Verified Partners
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="text-amber-600 font-bold">{pendingDealers.length} Pending Review</span>
            <span>Avg 35% Wholesale Margin</span>
          </div>
        </div>

        {/* Service Desk */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">RO Service SLA</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">98.4%</h3>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
              SLA Met
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="text-purple-600 font-semibold">{activeServices.length} Active Tickets</span>
            <span>OTP Security Active</span>
          </div>
        </div>
      </div>

      {/* Analytics Row: Visual SVG Area Chart + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Weekly Revenue & Order Trajectory</h3>
              <p className="text-xs text-slate-500">Retail customer vs wholesale bulk dealer cashflow</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {['7D', '30D', '90D'].map((range) => (
                <button
                  key={range}
                  onClick={() => setChartRange(range)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    chartRange === range ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart Visualization */}
          <div className="relative h-56 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
              <defs>
                <linearGradient id="wholesaleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="retailGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="190" x2="700" y2="190" stroke="#e2e8f0" strokeWidth="1" />

              {/* Wholesale Area Fill & Path */}
              <path
                d="M 50 140 Q 150 70, 250 110 T 450 60 T 650 30 L 650 190 L 50 190 Z"
                fill="url(#wholesaleGrad)"
              />
              <path
                d="M 50 140 Q 150 70, 250 110 T 450 60 T 650 30"
                fill="none"
                stroke="#0284c7"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Retail Area Fill & Path */}
              <path
                d="M 50 160 Q 150 130, 250 150 T 450 110 T 650 80 L 650 190 L 50 190 Z"
                fill="url(#retailGrad)"
              />
              <path
                d="M 50 160 Q 150 130, 250 150 T 450 110 T 650 80"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Interactive Data points */}
              {trendData.map((d, idx) => {
                const x = 50 + idx * 100;
                return (
                  <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(d)} onMouseLeave={() => setHoveredPoint(null)}>
                    <circle cx={x} cy={190 - (d.total / maxVal) * 150} r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                    <text x={x} y="208" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">{d.day}</text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Card */}
            {hoveredPoint && (
              <div className="absolute top-2 right-4 bg-slate-900 text-white p-3 rounded-xl shadow-lg border border-slate-700 text-xs space-y-1 z-10 pointer-events-none">
                <p className="font-bold text-sky-400">{hoveredPoint.day} Performance</p>
                <p className="text-[11px] text-slate-300">Total: <span className="font-bold text-white">₹{hoveredPoint.total.toLocaleString()}</span></p>
                <p className="text-[10px] text-emerald-400">Wholesale: ₹{hoveredPoint.wholesale.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">Retail: ₹{hoveredPoint.retail.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <span className="w-3 h-3 rounded-full bg-sky-600"></span>
                <span>Wholesale Dealer Bulk (Solid)</span>
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>Customer Retail (Dashed)</span>
              </span>
            </div>
            <span className="text-slate-400 text-[11px]">Updated live</span>
          </div>
        </div>

        {/* Category Share & Inventory Health */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Revenue by Category</h3>
            <p className="text-xs text-slate-500 mb-4">Distribution across 64 catalog products</p>

            <div className="space-y-4">
              {categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{cat.name}</span>
                    <span className="font-mono font-bold text-slate-600">{cat.share}% ({cat.revenue})</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.share}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 p-3 rounded-xl bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-sky-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">Total Catalog Items</p>
                <p className="text-[10px] text-slate-500">64 SKUs across 5 categories</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders + Pending Dealers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Recent Customer & Bulk Orders</h3>
              <p className="text-xs text-slate-500">Live order stream with payment IDs</p>
            </div>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-sky-50 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="py-3.5 flex items-center justify-between hover:bg-slate-50/60 rounded-xl px-2 transition-colors">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900">{order.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.orderType === 'bulk_dealer' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-sky-100 text-sky-800'
                    }`}>
                      {order.orderType === 'bulk_dealer' ? 'Wholesale Bulk' : 'Retail'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">{order.customerName}</p>
                  <p className="text-[11px] text-slate-400 truncate max-w-xs">{order.itemsSummary}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">₹{order.amount.toLocaleString()}</p>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-1 ${
                    order.status === 'Delivered' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : (order.status === 'Dispatched' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-amber-700 border border-amber-200')
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Dealer Applications Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Pending Dealer Approvals</h3>
              <p className="text-xs text-slate-500">GST verified document review workbench</p>
            </div>
            <button
              onClick={() => setActiveTab('dealers')}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-sky-50 transition-colors"
            >
              <span>Open Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {pendingDealers.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="font-bold text-slate-700">All dealer requests cleared!</p>
              <p className="text-[11px] text-slate-400 mt-0.5">New applications will appear here when submitted.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingDealers.map((d) => (
                <div key={d.id} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50/70 transition-colors flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-xs text-slate-900">{d.businessName}</h5>
                    <p className="text-xs text-slate-600 font-medium">{d.name} • {d.phone}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-amber-200 text-amber-900 rounded font-bold">
                        GST: {d.gstNumber}
                      </span>
                      <span className="text-[10px] text-slate-500">Turnover: {d.annualTurnoverEstimate || '₹15L+'}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onApproveDealer(d.id)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
                  >
                    Approve
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
