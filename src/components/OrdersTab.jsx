import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Truck, 
  Clock, 
  Download, 
  FileText, 
  Printer, 
  X,
  CreditCard,
  Building2,
  Phone,
  Mail,
  MapPin,
  Check
} from 'lucide-react';

export default function OrdersTab({ orders, onUpdateOrderStatus }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      (o.paymentId && o.paymentId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || o.status.toUpperCase() === statusFilter.toUpperCase();
    const matchesType = typeFilter === 'ALL' || o.orderType.toUpperCase() === typeFilter.toUpperCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  // Export orders to CSV function
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Type', 'Customer Name', 'Phone', 'Address', 'Items', 'Amount (INR)', 'Payment Method', 'Payment ID', 'Status'];
    const rows = filteredOrders.map(o => [
      o.id,
      new Date(o.date).toISOString().split('T')[0],
      o.orderType,
      `"${o.customerName}"`,
      o.customerPhone,
      `"${o.shippingAddress}"`,
      `"${o.itemsSummary}"`,
      o.amount,
      o.paymentMethod,
      o.paymentId,
      o.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aquaflow_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Order ID, Customer, Phone, Razorpay ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {['ALL', 'CONFIRMED', 'DISPATCHED', 'DELIVERED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st === 'ALL' ? 'All' : st}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Channels</option>
            <option value="RETAIL">Retail Customers</option>
            <option value="BULK_DEALER">Wholesale Dealers</option>
          </select>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
            title="Download formatted CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Channel</th>
                <th className="py-3.5 px-4">Customer Dossier</th>
                <th className="py-3.5 px-4">Order Items</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment Info</th>
                <th className="py-3.5 px-4">Fulfillment Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-400">
                    <p className="font-bold text-slate-600">No orders match your filter criteria.</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the search query or status filter.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="font-extrabold text-sky-600 hover:text-sky-800 flex items-center gap-1 group text-left"
                      >
                        <span>{order.id}</span>
                        <FileText className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {new Date(order.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] tracking-wide ${
                        order.orderType === 'bulk_dealer'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-sky-100 text-sky-800 border border-sky-200'
                      }`}>
                        {order.orderType === 'bulk_dealer' ? 'WHOLESALE' : 'RETAIL'}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-800">{order.customerName}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{order.customerPhone}</p>
                      <p className="text-[10px] text-slate-400 truncate max-w-[190px]">{order.shippingAddress}</p>
                    </td>

                    <td className="py-4 px-4">
                      <p className="text-slate-800 font-semibold">{order.itemsSummary}</p>
                      <p className="text-[10px] text-slate-400">{order.itemsCount} total unit(s)</p>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-black text-slate-900 text-sm">₹{order.amount.toLocaleString()}</span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-sky-600" />
                        <span className="font-semibold text-slate-700">{order.paymentMethod}</span>
                      </div>
                      <p className="text-[10px] font-mono text-slate-400">{order.paymentId}</p>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : (order.status === 'Dispatched'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200')
                      }`}>
                        {order.status === 'Delivered' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {order.status === 'Dispatched' && <Truck className="w-3 h-3 text-blue-600" />}
                        {order.status === 'Confirmed' && <Clock className="w-3 h-3 text-amber-600" />}
                        <span>{order.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          title="View Tax Invoice"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        {order.status === 'Confirmed' && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'Dispatched')}
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-xs"
                          >
                            Dispatch
                          </button>
                        )}
                        {order.status === 'Dispatched' && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'Delivered')}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-xs"
                          >
                            Mark Delivered
                          </button>
                        )}
                        {order.status === 'Delivered' && (
                          <span className="text-[11px] text-emerald-600 font-bold px-2 py-1 bg-emerald-50 rounded-lg">
                            Fulfilled
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black">
                  AF
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">Tax Invoice & Dispatch Note</h3>
                  <p className="text-xs text-slate-500 font-mono">Invoice Reference #{selectedInvoiceOrder.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Top Details */}
            <div className="grid grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Billed To / Delivery Recipient:</p>
                <p className="font-black text-sm text-slate-900">{selectedInvoiceOrder.customerName}</p>
                <p className="text-slate-600 font-medium">{selectedInvoiceOrder.customerPhone}</p>
                <p className="text-slate-500">{selectedInvoiceOrder.shippingAddress}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Payment & Fulfillment Meta:</p>
                <p className="text-slate-700"><span className="font-bold">Gateway:</span> {selectedInvoiceOrder.paymentMethod}</p>
                <p className="text-slate-700 font-mono text-[11px]"><span className="font-bold">TXN ID:</span> {selectedInvoiceOrder.paymentId}</p>
                <p className="text-slate-700"><span className="font-bold">Order Type:</span> {selectedInvoiceOrder.orderType === 'bulk_dealer' ? 'Wholesale Bulk Contract' : 'Retail Consumer Purchase'}</p>
                <p className="text-slate-700"><span className="font-bold">Status:</span> {selectedInvoiceOrder.status}</p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Product Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Taxable Value</th>
                    <th className="p-3 text-right">GST (18%)</th>
                    <th className="p-3 text-right">Total (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold text-slate-800">{selectedInvoiceOrder.itemsSummary}</td>
                    <td className="p-3 text-center font-bold">{selectedInvoiceOrder.itemsCount}</td>
                    <td className="p-3 text-right font-mono">₹{Math.round(selectedInvoiceOrder.amount / 1.18).toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-slate-500">₹{Math.round(selectedInvoiceOrder.amount - (selectedInvoiceOrder.amount / 1.18)).toLocaleString()}</td>
                    <td className="p-3 text-right font-black text-slate-900">₹{selectedInvoiceOrder.amount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total breakdown */}
            <div className="flex justify-end pt-2">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{Math.round(selectedInvoiceOrder.amount / 1.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>CGST (9%) + SGST (9%):</span>
                  <span className="font-mono">₹{Math.round(selectedInvoiceOrder.amount - (selectedInvoiceOrder.amount / 1.18)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping & Delivery:</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total Paid:</span>
                  <span className="text-sky-600">₹{selectedInvoiceOrder.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">AquaFlow Clean Water Technologies Pvt Ltd • GSTIN: 07AAAAA0000A1Z5</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
