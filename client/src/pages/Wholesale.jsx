import React, { useState } from 'react';
import { submitWholesale } from '../services/api';
import ProductFaq from '../components/product/ProductFaq';
import styles from './Wholesale.module.css';

const Wholesale = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });
    try {
      const res = await submitWholesale(formData);
      setStatus({
        loading: false,
        success: true,
        message:
          res.message ||
          'Thank you! Your wholesale application has been submitted. Our team will review it within 1-2 business days.',
      });
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch {
      setStatus({
        loading: false,
        success: false,
        message: 'There was an issue submitting your inquiry. Please try again.',
      });
    }
  };

  const tickerItems = [
    { icon: '/assets/images/aussie.png', title: 'Aussie owned' },
    { icon: '/assets/images/smile.png', title: 'Ultra-Smooth Drizzle' },
    { icon: '/assets/images/zero-sugar.png', title: 'Zero added sugar' },
    { icon: '/assets/images/natural-fuel.png', title: 'Natural fuel' },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Hero with Box */}
      <div id="shopify-section-wholesale-hero" className="shopify-section">
        <section className={styles.heroSection}>
          <div className={styles.heroStage}>
            {/* Background image container */}
            <div className={styles.heroBg}>
              <img
                src="/assets/images/wholesale-hero.png"
                alt="Wholesale banner"
                className={styles.heroBgDesktop}
              />
              <img
                src="/assets/images/wholesale-hero-mobile.png"
                alt="Wholesale banner mobile"
                className={styles.heroBgMobile}
              />
            </div>

            {/* Overlapping Hero Card */}
            <div className={styles.heroCard}>
              <h1 className={styles.heroTitle}>
                Partner with Drizzy
              </h1>
              <p className={styles.heroDesc}>
                Partner with a brand that values quality and simplicity. Tell us about your store and let's grow together.
              </p>
              <div>
                <p style={{ fontSize: '12px', fontFamily: "var(--font-secondary, 'Azeret Mono')", color: 'rgba(43, 20, 8, 0.75)', margin: 0 }}>
                  Already a partner?{' '}
                  <a href="#contact_form" style={{ fontWeight: 700, color: 'var(--color-dark-brown, #2b1408)' }}>
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Logos Marquee */}
      <div id="shopify-section-wholesale-marquee" className="shopify-section">
        <section
          style={{
            color: 'var(--color-dark-brown, #2b1408)',
            backgroundColor: 'var(--color-cream, #fffbf2)',
            paddingTop: '3.5rem',
            paddingBottom: '2rem',
            overflow: 'hidden',
            borderBottom: '2px solid rgba(43, 20, 8, 0.15)',
          }}
        >
          <div style={{ display: 'flex', overflow: 'hidden', userSelect: 'none' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexShrink: 0,
                minWidth: '100%',
                animation: 'marquee 25s linear infinite',
              }}
            >
              {[...tickerItems, ...tickerItems].map((item, idx) => (
                <div
                  key={idx}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingRight: '60px' }}
                >
                  <img
                    src={item.icon}
                    alt=""
                    style={{ height: '3rem', width: '3rem', objectFit: 'contain' }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-primary, 'Champ Black')",
                      fontSize: '1.25rem',
                      textTransform: 'uppercase',
                      color: 'var(--color-dark-brown, #2b1408)',
                      margin: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 3. Customer Form (Be one of the first to stock Drizzy) */}
      <div id="shopify-section-wholesale-form" className="shopify-section">
        <section className={styles.formSection}>
          <div className={styles.formContainer}>
            {/* Left Image with Mascot */}
            <div className={styles.formImageCol}>
              <div className={styles.formImageFrame}>
                <img
                  src="/assets/images/wholesale-form.png"
                  alt="Wholesale Drizzy bottles"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.formMascot}>
                <img
                  src="/assets/images/peanut-man.png"
                  alt=""
                  aria-hidden="true"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* Right Form Card */}
            <div className={styles.formCard}>
              <h2 className={styles.formHeading}>
                Be one of the first to stock Drizzy.
              </h2>
              <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(43, 20, 8, 0.9)' }}>
                <p style={{ margin: 0 }}>
                  We're partnering with select stores who care about quality, natural products and seriously smooth peanut butter.
                </p>
                <p style={{ margin: '0.5rem 0 0 0' }}>
                  Tell us where you're from and we'll be in touch.
                </p>
              </div>

              {status.success ? (
                <div
                  style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: 'rgba(202, 154, 241, 0.3)',
                    border: '2px solid var(--color-dark-brown, #2b1408)',
                    borderRadius: '16px',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-primary, 'Champ Black')",
                      fontSize: '1.5rem',
                      textTransform: 'uppercase',
                      color: 'var(--color-dark-brown, #2b1408)',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    🎉 Application Sent!
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-secondary, 'Azeret Mono')",
                      fontSize: '0.875rem',
                      color: 'var(--color-dark-brown, #2b1408)',
                      margin: 0,
                    }}
                  >
                    {status.message}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact_form" style={{ marginTop: '1.75rem' }}>
                  {status.message && (
                    <div
                      style={{
                        padding: '1rem',
                        backgroundColor: '#fee2e2',
                        border: '2px solid #b91c1c',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontFamily: "var(--font-secondary, 'Azeret Mono')",
                        color: '#7f1d1d',
                        marginBottom: '1rem',
                      }}
                      role="alert"
                    >
                      {status.message}
                    </div>
                  )}

                  <div className={styles.formGrid}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={styles.inputControl}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@somemail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.inputControl}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="your company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={styles.inputControl}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="your contact"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={styles.inputControl}
                      />
                    </div>

                    <div className={`${styles.fieldGroup} ${styles.fullCol}`}>
                      <label className={styles.fieldLabel}>Message</label>
                      <textarea
                        rows={5}
                        placeholder="tell us about your business"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${styles.inputControl} ${styles.textareaControl}`}
                      />
                    </div>
                  </div>

                  <div className={styles.submitBtnWrapper}>
                    <button
                      type="submit"
                      disabled={status.loading}
                      className={styles.submitBtn}
                    >
                      {status.loading ? 'Submitting...' : 'Submit form'}
                    </button>
                    <p
                      style={{
                        fontSize: '12px',
                        fontFamily: "var(--font-secondary, 'Azeret Mono')",
                        color: 'rgba(43, 20, 8, 0.7)',
                        margin: 0,
                        textAlign: 'center',
                      }}
                    >
                      Applications are reviewed within 1-2 business days.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 4. Sprouts Nationwide Banner */}
      <section className={styles.sproutsSection}>
        <div className={styles.sproutsContainer}>
          <h2 className={styles.sproutsTitle}>
            Aug 24, stocked nation-wide at
          </h2>
          <div style={{ height: '68px' }}>
            <img
              src="/assets/images/sprouts-market.png"
              alt="Sprouts Farmers Market"
              style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      {/* 5. FAQ Component */}
      <ProductFaq />
    </div>
  );
};

export default Wholesale;
