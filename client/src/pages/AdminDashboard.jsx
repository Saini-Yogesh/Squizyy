import React, { useState, useEffect } from 'react';
import { getAdminStats, updateAdminProduct } from '../services/api';
import { DollarSign, Package, Users, Award, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [adminKey, setAdminKey] = useState(
    () => localStorage.getItem('drizzy_admin_key') || 'drizzy_admin_secret_key_2026'
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('orders');

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
      const data = await getAdminStats(adminKey);
      setStats(data);
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch {
      alert('Could not update product price.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.lockIconCircle}>
            <Lock size={28} />
          </div>
          <div>
            <h1 className={styles.loginTitle}>Admin Portal</h1>
            <p className={styles.loginSubtitle}>
              Protected by server-side API Key validation
            </p>
          </div>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div>
              <input
                type="password"
                required
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter Admin API Key"
                className={styles.loginInput}
              />
              <span className={styles.hintText}>
                Default: drizzy_admin_secret_key_2026
              </span>
            </div>

            {error && (
              <div className={styles.errorMessage} role="alert">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={styles.unlockBtn}
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
    subscribersCount: 0,
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <div>
          <span className={styles.badgeConsole}>
            Backend Management Console
          </span>
          <h1 className={styles.dashboardHeading}>
            Drizzy Admin Portal
          </h1>
        </div>
        <button
          onClick={() => {
            setIsAuthenticated(false);
            localStorage.removeItem('drizzy_admin_key');
          }}
          className={styles.signOutBtn}
        >
          Lock / Sign Out
        </button>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Revenue</span>
            <DollarSign size={16} />
          </div>
          <span className={styles.kpiValue}>${metrics.totalRevenue}</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Orders</span>
            <Package size={16} />
          </div>
          <span className={styles.kpiValue}>{metrics.totalOrders}</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Wholesale</span>
            <Users size={16} />
          </div>
          <span className={styles.kpiValue}>{metrics.wholesaleInquiries}</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Contest</span>
            <Award size={16} />
          </div>
          <span className={styles.kpiValue}>{metrics.contestEntries}</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Subscribers</span>
            <Mail size={16} />
          </div>
          <span className={styles.kpiValue}>{metrics.subscribersCount}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsBar}>
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
            className={`${styles.tabBtn} ${
              activeTab === tab.id ? styles.tabBtnActive : styles.tabBtnInactive
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className={styles.panelCard}>
        {/* Orders Panel */}
        {activeTab === 'orders' && (
          <div>
            <h2 className={styles.panelTitle}>Customer Orders</h2>
            {stats?.orders?.length === 0 ? (
              <p className={styles.emptyText}>No orders yet.</p>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr className={styles.tableHeadRow}>
                      <th className={styles.tableHeadCell}>Order #</th>
                      <th className={styles.tableHeadCell}>Customer</th>
                      <th className={styles.tableHeadCell}>Email</th>
                      <th className={styles.tableHeadCell}>Items</th>
                      <th className={styles.tableHeadCell}>Total</th>
                      <th className={styles.tableHeadCell}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.orders?.map((o, idx) => (
                      <tr key={idx} className={styles.tableRow}>
                        <td className={styles.tableCell} style={{ fontWeight: 700 }}>
                          {o.orderNumber}
                        </td>
                        <td className={styles.tableCell}>
                          {o.customer?.firstName} {o.customer?.lastName}
                        </td>
                        <td className={styles.tableCell}>{o.customer?.email}</td>
                        <td className={styles.tableCell}>
                          {o.items?.map((i) => `${i.quantity}x ${i.title}`).join(', ')}
                        </td>
                        <td className={styles.tableCell} style={{ fontWeight: 700 }}>
                          ${((o.total || 0) / 100).toFixed(2)}
                        </td>
                        <td className={styles.tableCell}>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              backgroundColor: 'rgba(23, 101, 55, 0.15)',
                              color: '#176537',
                              fontWeight: 700,
                            }}
                          >
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 className={styles.panelTitle}>Wholesale Inquiries</h2>
            {stats?.wholesale?.length === 0 ? (
              <p className={styles.emptyText}>No wholesale submissions yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {stats?.wholesale?.map((w, idx) => (
                  <div key={idx} className={styles.wholesaleItem}>
                    <div>
                      <h3 className={styles.wholesaleCompany}>{w.company}</h3>
                      <p style={{ margin: '4px 0', fontSize: '12px' }}>
                        Contact: {w.name} • Email: <a href={`mailto:${w.email}`}>{w.email}</a>{' '}
                        {w.phone && `• Phone: ${w.phone}`}
                      </p>
                      <p style={{ margin: '4px 0', fontSize: '12px' }}>
                        Locations: <strong>{w.estimatedLocations}</strong>
                      </p>
                      {w.message && (
                        <p
                          style={{
                            marginTop: '8px',
                            padding: '8px 12px',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            border: '1px solid rgba(43, 20, 8, 0.1)',
                          }}
                        >
                          "{w.message}"
                        </p>
                      )}
                    </div>
                    <div>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          backgroundColor: '#ca9af1',
                          color: '#2b1408',
                          fontSize: '11px',
                          fontWeight: 700,
                          border: '1px solid #2b1408',
                        }}
                      >
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 className={styles.panelTitle}>Sprouts Giveaway Entrants</h2>
            {stats?.contest?.length === 0 ? (
              <p className={styles.emptyText}>No contest entries yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {stats?.contest?.map((c, idx) => (
                  <div key={idx} className={styles.contestItem}>
                    <div>
                      <span style={{ fontWeight: 700, display: 'block' }}>
                        {c.firstName} {c.lastName}
                      </span>
                      <span style={{ color: 'rgba(43, 20, 8, 0.7)' }}>{c.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span>Receipt: {c.receiptFile || 'Verified'}</span>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(23, 101, 55, 0.15)',
                          color: '#176537',
                          fontWeight: 700,
                        }}
                      >
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
          <div>
            <h2 className={styles.panelTitle}>
              Subscribers ({stats?.newsletter?.length || 0})
            </h2>
            <div className={styles.subscriberGrid}>
              {stats?.newsletter?.map((n, idx) => (
                <div key={idx} className={styles.subscriberCard}>
                  <span style={{ fontWeight: 700, display: 'block' }}>{n.email}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(43, 20, 8, 0.5)' }}>
                    Source: {n.source || 'Website'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Panel */}
        {activeTab === 'products' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className={styles.panelTitle}>Catalog & Price Management</h2>
            {updateSuccess && (
              <div
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(23, 101, 55, 0.15)',
                  color: '#176537',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={16} /> {updateSuccess}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {stats?.products?.map((prod) => (
                <div key={prod.slug} className={styles.productRow}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={prod.images?.[0] || '/assets/images/1_bottle.png'}
                      alt=""
                      className={styles.productThumb}
                    />
                    <div>
                      <h3 style={{ margin: 0, fontFamily: "var(--font-primary, 'Champ Black')", fontSize: '1rem' }}>
                        {prod.name}
                      </h3>
                      <span style={{ fontSize: '12px', color: 'rgba(43, 20, 8, 0.7)' }}>
                        Current Base Price: ${(prod.price / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700 }}>$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder={(prod.price / 100).toFixed(2)}
                      onChange={(e) =>
                        setEditingPrice({ ...editingPrice, [prod.slug]: e.target.value })
                      }
                      className={styles.priceInput}
                      aria-label="New price"
                    />
                    <button
                      onClick={() => handlePriceUpdate(prod.slug)}
                      className={styles.updatePriceBtn}
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
