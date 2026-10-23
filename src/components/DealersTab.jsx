import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ShieldAlert, 
  CheckCircle, 
  Store, 
  BadgeCheck, 
  FileText, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  Search,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function DealersTab({ dealers, onApproveDealer, onRejectDealer }) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [rejectingDealerId, setRejectingDealerId] = useState(null);
  const [rejectReason, setRejectReason] = useState('GST credentials could not be verified with govt portal.');
  const [verifiedGstIds, setVerifiedGstIds] = useState({});

  const handleSimulateGstVerify = (id) => {
    setVerifiedGstIds(prev => ({ ...prev, [id]: 'VERIFIED_ACTIVE' }));
  };

  const filteredDealers = dealers.filter((d) => {
    const matchesFilter = 
      filter === 'ALL' ||
      (filter === 'PENDING' && d.status === 'pending') ||
      (filter === 'APPROVED' && d.status === 'approved') ||
      (filter === 'REJECTED' && d.status === 'rejected');

    const matchesSearch = 
      d.businessName.toLowerCase().includes(search.toLowerCase()) ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.gstNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search);

    return matchesFilter && matchesSearch;
  });

  const handleConfirmReject = () => {
    if (rejectingDealerId) {
      onRejectDealer(rejectingDealerId, rejectReason);
      setRejectingDealerId(null);
    }
  };

  const pendingCount = dealers.filter(d => d.status === 'pending').length;
  const approvedCount = dealers.filter(d => d.status === 'approved').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Security Policy */}
      <div className="p-6 rounded-3xl bg-slate-950 text-white shadow-xl border border-slate-800/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30">
            <BadgeCheck className="w-4 h-4 text-sky-400" />
            <span>Role-Based Dealer Gate</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Wholesale Dealer Verification & Document Desk
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Strict backend policy: Dealer accounts cannot self-approve. Only verified business entities with authenticated GST numbers receive 30%–40% wholesale catalog pricing and bulk carton ordering permissions.
          </p>
        </div>

        {/* Counter Stats in Banner */}
        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-28">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Pending Review</span>
            <p className="text-2xl font-black text-amber-400 mt-0.5">{pendingCount}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-28">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Active Dealers</span>
            <p className="text-2xl font-black text-emerald-400 mt-0.5">{approvedCount}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Firm Name, GSTIN, Owner, Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Dealers Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredDealers.map((d) => {
          const isPending = d.status === 'pending';
          const isApproved = d.status === 'approved';
          const isRejected = d.status === 'rejected';
          const isGstVerified = verifiedGstIds[d.id] === 'VERIFIED_ACTIVE' || isApproved;

          return (
            <div
              key={d.id}
              className={`p-6 rounded-3xl border transition-all relative ${
                isPending
                  ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-100/80'
                  : (isApproved ? 'bg-white border-emerald-200/80 shadow-xs hover:shadow-md' : 'bg-slate-50 border-slate-200 opacity-80')
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    isPending 
                      ? 'bg-amber-100 text-amber-700' 
                      : (isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600')
                  }`}>
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 leading-tight">{d.businessName}</h4>
                    <p className="text-xs text-slate-600 font-semibold mt-0.5">{d.name} • {d.phone}</p>
                    <p className="text-[11px] text-slate-400">{d.email}</p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  isPending
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : (isApproved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300')
                }`}>
                  {d.status}
                </span>
              </div>

              {/* Dossier Body */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                {/* GST Number row with Live verification status */}
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">GSTIN / Tax ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-xs bg-white px-2 py-0.5 rounded border border-slate-200">
                      {d.gstNumber}
                    </span>
                    {isGstVerified ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3 text-emerald-600" /> Active Taxpayer
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSimulateGstVerify(d.id)}
                        className="text-[10px] font-bold text-sky-600 hover:text-sky-800 underline"
                      >
                        Verify with GST Portal
                      </button>
                    )}
                  </div>
                </div>

                {/* Shop Address */}
                <div className="flex items-start justify-between pt-1">
                  <span className="text-slate-500 font-medium shrink-0">Storefront Address:</span>
                  <span className="font-semibold text-slate-700 text-right truncate max-w-xs">{d.shopAddress}</span>
                </div>

                {/* Turnover Estimate */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Annual Turnover Est:</span>
                  <span className="font-extrabold text-emerald-700">{d.annualTurnoverEstimate || '₹20,00,000+'}</span>
                </div>

                {/* Requirements / Notes */}
                {d.notes && (
                  <div className="pt-2 text-[11px] text-slate-600 border-t border-slate-200/60 mt-1">
                    <span className="font-bold text-slate-700">Stock Requirement: </span>
                    {d.notes}
                  </div>
                )}

                {/* Rejection Note */}
                {d.rejectionReason && (
                  <div className="pt-2 text-[11px] text-rose-700 font-bold border-t border-rose-100 mt-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Rejection Reason: {d.rejectionReason}</span>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">
                  Applied: {new Date(d.appliedAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  {isPending && (
                    <>
                      <button
                        onClick={() => setRejectingDealerId(d.id)}
                        className="px-3.5 py-2 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => onApproveDealer(d.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Partner</span>
                      </button>
                    </>
                  )}

                  {isApproved && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      <span>Wholesale Catalog Unlocked (35% OFF)</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reject Modal */}
      {rejectingDealerId && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <h4 className="font-extrabold text-base text-slate-900">Decline Dealer Application</h4>
            <p className="text-xs text-slate-500">
              Provide a verified reason why this business application is being rejected. The applicant will be notified inside the app.
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingDealerId(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
