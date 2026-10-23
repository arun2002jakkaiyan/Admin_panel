import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardTab from './components/DashboardTab';
import OrdersTab from './components/OrdersTab';
import DealersTab from './components/DealersTab';
import ServiceDeskTab from './components/ServiceDeskTab';
import CatalogTab from './components/CatalogTab';
import StorePreviewModal from './components/StorePreviewModal';
import { initialCatalog } from './catalogData';
import { initialOrders, initialDealers, initialServiceRequests } from './mockData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showStorePreview, setShowStorePreview] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Persistent / State Stores
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('aquaflow_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [dealers, setDealers] = useState(() => {
    const saved = localStorage.getItem('aquaflow_dealers');
    return saved ? JSON.parse(saved) : initialDealers;
  });

  const [serviceRequests, setServiceRequests] = useState(() => {
    const saved = localStorage.getItem('aquaflow_services');
    return saved ? JSON.parse(saved) : initialServiceRequests;
  });

  const [catalog, setCatalog] = useState(() => {
    const saved = localStorage.getItem('aquaflow_catalog');
    return saved ? JSON.parse(saved) : initialCatalog;
  });

  useEffect(() => {
    localStorage.setItem('aquaflow_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aquaflow_dealers', JSON.stringify(dealers));
  }, [dealers]);

  useEffect(() => {
    localStorage.setItem('aquaflow_services', JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  useEffect(() => {
    localStorage.setItem('aquaflow_catalog', JSON.stringify(catalog));
  }, [catalog]);

  // Actions
  const handleApproveDealer = (dealerId) => {
    setDealers(prev => prev.map(d => {
      if (d.id === dealerId) {
        showToast(`Dealer "${d.businessName}" approved! Wholesale pricing unlocked.`);
        return {
          ...d,
          status: 'approved',
          approvedAt: new Date().toISOString(),
        };
      }
      return d;
    }));
  };

  const handleRejectDealer = (dealerId, reason) => {
    setDealers(prev => prev.map(d => {
      if (d.id === dealerId) {
        showToast(`Dealer application for "${d.businessName}" rejected.`);
        return {
          ...d,
          status: 'rejected',
          rejectionReason: reason,
        };
      }
      return d;
    }));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        showToast(`Order #${orderId} marked as ${newStatus}.`);
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  const handleUpdateServiceStatus = (serviceId, newStatus, extraData = {}) => {
    setServiceRequests(prev => prev.map(s => {
      if (s.id === serviceId) {
        showToast(`Service Request #${serviceId} updated to ${newStatus}.`);
        return { ...s, status: newStatus, ...extraData };
      }
      return s;
    }));
  };

  const handleUpdateProduct = (productId, updates) => {
    setCatalog(prev => prev.map(p => {
      if (p.id === productId) {
        showToast(`Updated "${p.name}" pricing & stock.`);
        return { ...p, ...updates };
      }
      return p;
    }));
  };

  const handleAddProduct = (newProduct) => {
    setCatalog(prev => [newProduct, ...prev]);
    showToast(`Added new product "${newProduct.name}" to catalog!`);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all demo orders, dealer applications, and services to factory state?')) {
      setOrders(initialOrders);
      setDealers(initialDealers);
      setServiceRequests(initialServiceRequests);
      setCatalog(initialCatalog);
      localStorage.clear();
      showToast('All demo datasets reset to initial factory states.');
    }
  };

  const pendingDealerCount = dealers.filter(d => d.status === 'pending').length;
  const pendingOrderCount = orders.filter(o => o.status === 'Confirmed').length;
  const activeServiceCount = serviceRequests.filter(s => s.status !== 'Completed').length;

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-2.5 border border-slate-700 text-xs font-bold animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingDealerCount={pendingDealerCount}
        pendingOrderCount={pendingOrderCount}
        activeServiceCount={activeServiceCount}
        onOpenStorePreview={() => setShowStorePreview(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          activeTab={activeTab} 
          onResetDemoData={handleResetDemoData}
          onOpenStorePreview={() => setShowStorePreview(true)}
          notificationsCount={pendingDealerCount + pendingOrderCount}
        />

        <main className="flex-1 overflow-y-auto pb-12">
          {activeTab === 'dashboard' && (
            <DashboardTab
              orders={orders}
              dealers={dealers}
              serviceRequests={serviceRequests}
              setActiveTab={setActiveTab}
              onApproveDealer={handleApproveDealer}
              onOpenStorePreview={() => setShowStorePreview(true)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {activeTab === 'dealers' && (
            <DealersTab
              dealers={dealers}
              onApproveDealer={handleApproveDealer}
              onRejectDealer={handleRejectDealer}
            />
          )}

          {activeTab === 'service' && (
            <ServiceDeskTab
              serviceRequests={serviceRequests}
              onUpdateServiceStatus={handleUpdateServiceStatus}
            />
          )}

          {activeTab === 'catalog' && (
            <CatalogTab
              catalog={catalog}
              onUpdateProduct={handleUpdateProduct}
              onAddProduct={handleAddProduct}
            />
          )}
        </main>
      </div>

      {/* Live Storefront Perspective Modal */}
      {showStorePreview && (
        <StorePreviewModal
          catalog={catalog}
          onClose={() => setShowStorePreview(false)}
        />
      )}
    </div>
  );
}
