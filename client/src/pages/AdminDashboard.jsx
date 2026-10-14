import React, { useState, useEffect } from 'react';
import { getAdminStats, updateAdminProduct } from '../services/api';
import { ShieldCheck, DollarSign, Package, Users, Award, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem('drizzy_admin_key') || 'drizzy_admin_secret_key_2026');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'wholesale', 'contest', 'newsletter', 'products'

  // Edit product price state
  const [editingPrice, setEditingPrice] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState('');

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await getAdminStats(adminKey);
      setStats(data);
      setIsAuthenticated(true);
      localStorage.setItem('drizzy_admin_key', adminKey);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Admin Secret Key. Access Denied.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) {
      handleLogin();
    }
  }, []);

  const handlePriceUpdate = async (slug) => {
    const newPrice = editingPrice[slug];
    if (!newPrice) return;
    try {
      await updateAdminProduct(slug, { price: Math.round(Number(newPrice) * 100) }, adminKey);
      setUpdateSuccess(`Price updated for ${slug}!`);
      // Reload stats
      const data = await getAdminStats(adminKey);
      setStats(data);
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch {
      alert('Could not update product price.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="bg-white rounded-3xl border-4 border-foreground p-8 sm:p-12 max-w-md w-full shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-accent-purple border-2 border-foreground flex items-center justify-center mx-auto text-foreground">
            <Lock size={28} />
          </div>
          <div>
            <h1 className="font-champ text-3xl uppercase text-foreground">Admin Portal</h1>
            <p className="text-xs font-mono text-foreground/60 mt-1">
              Protected by server-side API Key validation
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter Admin API Key"
                className="w-full bg-background border-2 border-foreground rounded-xl px-4 py-3 text-sm focus:outline-none font-mono"
              />
              <span className="text-[10px] font-mono text-foreground/50 mt-1 block">
                Default: drizzy_admin_secret_key_2026
              </span>
            </div>

            {error && (
              <div className="text-xs font-mono text-red-600 flex items-center justify-center gap-1">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-drizzy-primary py-3.5 text-sm"
            >
              {loading ? 'Authenticating...' : 'Unlock Admin Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const metrics = stats?.metrics || {
    totalOrders: 0,
    totalRevenue: '0.00',
    wholesaleInquiries: 0,
    contestEntries: 0,
    subscribersCount: 0
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-foreground/15 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-green">
            Backend Management Console
          </span>
          <h1 className="font-champ text-3xl sm:text-5xl uppercase tracking-tight text-foreground mt-1">
            Drizzy Admin Portal
          </h1>
        </div>
        <button
          onClick={() => {
            setIsAuthenticated(false);
            localStorage.removeItem('drizzy_admin_key');
          }}
          className="btn-drizzy-secondary text-xs py-2 px-5"
        >
          Lock / Sign Out
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        <div className="bg-white rounded-2xl border-3 border-foreground p-5 shadow-sm">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Revenue</span>
            <DollarSign size={16} />
          </div>
          <span className="font-champ text-2xl text-foreground">${metrics.totalRevenue}</span>
        </div>

        <div className="bg-white rounded-2xl border-3 border-foreground p-5 shadow-sm">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Orders</span>
            <Package size={16} />
          </div>
          <span className="font-champ text-2xl text-foreground">{metrics.totalOrders}</span>
        </div>

        <div className="bg-white rounded-2xl border-3 border-foreground p-5 shadow-sm">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Wholesale</span>
            <Users size={16} />
          </div>
          <span className="font-champ text-2xl text-foreground">{metrics.wholesaleInquiries}</span>
        </div>

        <div className="bg-white rounded-2xl border-3 border-foreground p-5 shadow-sm">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Contest</span>
            <Award size={16} />
          </div>
          <span className="font-champ text-2xl text-foreground">{metrics.contestEntries}</span>
        </div>

        <div className="bg-white rounded-2xl border-3 border-foreground p-5 shadow-sm">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Subscribers</span>
            <Mail size={16} />
          </div>
          <span className="font-champ text-2xl text-foreground">{metrics.subscribersCount}</span>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-foreground/20 pb-2 overflow-x-auto">
        {[
          { id: 'orders', label: 'Orders' },
          { id: 'wholesale', label: 'Wholesale Inquiries' },
          { id: 'contest', label: 'Contest Entries' },
          { id: 'newsletter', label: 'Newsletter Subscribers' },
          { id: 'products', label: 'Products & Pricing' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full font-champ text-sm uppercase transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-foreground text-accent-purple shadow-sm'
                : 'bg-white/60 text-foreground hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-3xl border-4 border-foreground p-6 sm:p-8 shadow-xl min-h-[300px]">
        
        {/* Orders Panel */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="font-champ text-2xl uppercase text-foreground mb-4">Customer Orders</h2>
            {stats?.orders?.length === 0 ? (
              <p className="text-xs font-mono text-foreground/60 py-8 text-center">No orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b-2 border-foreground pb-2">
                      <th className="py-2">Order #</th>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {stats?.orders?.map((o, idx) => (
                      <tr key={idx} className="hover:bg-background/40">
                        <td className="py-3 font-bold">{o.orderNumber}</td>
                        <td>{o.customer?.firstName} {o.customer?.lastName}</td>
                        <td>{o.customer?.email}</td>
                        <td>{o.items?.map(i => `${i.quantity}x ${i.title}`).join(', ')}</td>
                        <td className="font-bold font-champ text-sm">${((o.total || 0) / 100).toFixed(2)}</td>
                        <td>
                          <span className="px-2 py-0.5 rounded-full bg-accent-green/20 text-accent-green font-bold">
                            {o.status || 'Paid'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Wholesale Panel */}
        {activeTab === 'wholesale' && (
          <div className="space-y-4">
            <h2 className="font-champ text-2xl uppercase text-foreground mb-4">Wholesale Inquiries</h2>
            {stats?.wholesale?.length === 0 ? (
              <p className="text-xs font-mono text-foreground/60 py-8 text-center">No wholesale submissions yet.</p>
            ) : (
              <div className="space-y-4">
                {stats?.wholesale?.map((w, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-background/50 border-2 border-foreground/20 flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h4 className="font-champ text-lg uppercase">{w.company}</h4>
                      <p className="text-xs font-mono text-foreground/80 mt-1">
                        Contact: {w.name} • Email: <a href={`mailto:${w.email}`} className="underline">{w.email}</a> {w.phone && `• Phone: ${w.phone}`}
                      </p>
                      <p className="text-xs font-mono text-foreground/70 mt-1">
                        Locations: <strong>{w.estimatedLocations}</strong>
                      </p>
                      {w.message && (
                        <p className="text-xs text-foreground/90 mt-2 bg-white p-2.5 rounded-xl border border-foreground/10">
                          "{w.message}"
                        </p>
                      )}
                    </div>
                    <div className="shrink-0">
                      <span className="px-3 py-1 rounded-full bg-accent-purple text-foreground text-xs font-champ uppercase border border-foreground">
                        {w.status || 'New'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contest Panel */}
        {activeTab === 'contest' && (
          <div className="space-y-4">
            <h2 className="font-champ text-2xl uppercase text-foreground mb-4">Sprouts Giveaway Entrants</h2>
            {stats?.contest?.length === 0 ? (
              <p className="text-xs font-mono text-foreground/60 py-8 text-center">No contest entries yet.</p>
            ) : (
              <div className="space-y-3">
                {stats?.contest?.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-background/50 border border-foreground/20 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-sm block">{c.firstName} {c.lastName}</span>
                      <span className="text-foreground/70">{c.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-foreground/60">Receipt: {c.receiptFile || 'Verified'}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-accent-green/20 text-accent-green font-bold">
                        Eligible
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Newsletter Panel */}
        {activeTab === 'newsletter' && (
          <div className="space-y-4">
            <h2 className="font-champ text-2xl uppercase text-foreground mb-4">Subscribers ({stats?.newsletter?.length || 0})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {stats?.newsletter?.map((n, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-background/50 border border-foreground/15 text-xs font-mono truncate">
                  <span className="font-bold">{n.email}</span>
                  <span className="text-[10px] text-foreground/50 block mt-0.5">Source: {n.source || 'Website'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Panel */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <h2 className="font-champ text-2xl uppercase text-foreground">Catalog & Price Management</h2>
            {updateSuccess && (
              <div className="p-3 rounded-xl bg-accent-green/20 text-accent-green text-xs font-mono font-bold flex items-center gap-2">
                <CheckCircle2 size={16} /> {updateSuccess}
              </div>
            )}

            <div className="space-y-4">
              {stats?.products?.map((prod) => (
                <div key={prod.slug} className="p-5 rounded-2xl bg-background/40 border-2 border-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={prod.images?.[0]} alt="" className="w-14 h-14 object-contain rounded-lg bg-white p-1 border border-foreground/15" />
                    <div>
                      <h4 className="font-champ text-base uppercase">{prod.name}</h4>
                      <span className="text-xs font-mono text-foreground/70">
                        Current Base Price: ${(prod.price / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder={(prod.price / 100).toFixed(2)}
                      onChange={(e) => setEditingPrice({ ...editingPrice, [prod.slug]: e.target.value })}
                      className="w-24 bg-white border-2 border-foreground rounded-lg px-2.5 py-1.5 text-xs font-mono"
                    />
                    <button
                      onClick={() => handlePriceUpdate(prod.slug)}
                      className="btn-drizzy-primary text-xs py-1.5 px-3"
                    >
                      Update Price
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;
