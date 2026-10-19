import React, { useState } from 'react';
import { submitContest } from '../services/api';
import styles from './SproutsContest.module.css';

const SproutsContest = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    agreedRules: false,
    newsletterOptIn: true,
    receiptFile: null,
  });

  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setForm((prev) => ({ ...prev, receiptFile: e.target.files[0].name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreedRules) {
      alert('You must accept the Official Rules & Eligibility Terms to enter.');
      return;
    }
    setStatus({ loading: true, success: false, message: '' });
    try {
      const res = await submitContest({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        agreedRules: true,
        newsletterOptIn: form.newsletterOptIn,
        receiptFile: fileName || 'receipt_sprouts.jpg',
      });
      setStatus({
        loading: false,
        success: true,
        message:
          res.message ||
          'Congratulations! You are officially entered into the draw to win flights to Australia.',
      });
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        agreedRules: false,
        newsletterOptIn: true,
        receiptFile: null,
      });
      setFileName('');
    } catch {
      setStatus({
        loading: false,
        success: false,
        message: 'Error submitting your entry. Please check your connection and try again.',
      });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Promotion Hero */}
      <div id="shopify-section-promotion-hero" className="shopify-section">
        <section className={styles.heroSection} id="promotion-hero">
          <div className={styles.heroContainer}>
            {/* Text & CTAs */}
            <div className={styles.heroTextCol}>
              <h1 className={styles.heroTitle}>
                Win a Trip to Australia
              </h1>
              <p className={styles.heroDesc}>
                Enter for a chance to win round-trip economy flights to Sydney, Australia for you and a guest + $2,000 USD spending money.
              </p>

              {/* Sprouts Logo Badge */}
              <div className={styles.sproutsBadge}>
                <img
                  src="/assets/images/Sprouts_Farmers_Market_Logo_4_Vectorized.svg"
                  alt="Sprouts Farmers Market"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <a
                href="#instructions"
                className={styles.enterCtaBtn}
              >
                ENTER
              </a>

              <div className={styles.heroLegalNote}>
                <p style={{ margin: 0 }}>
                  <strong>NO PURCHASE NECESSARY; </strong>void where prohibited. Open to U.S. residents, 18+. Ends 9/20/26.{' '}
                  <strong>Limit one (1) entry per person total. </strong>Two entry methods: (i) A qualifying purchase of Drizzy peanut butter at Sprouts Farmers Market, or (ii) mail-in entry. See Official Rules at{' '}
                  <a href="/pages/rules" style={{ textDecoration: 'underline', fontWeight: 700, color: 'var(--color-dark-brown, #2b1408)' }}>
                    https://getdrizzy.co/pages/rules
                  </a>{' '}
                  for details. Sponsor: Drizzy Holdings Inc., 90 Park Ave., NY, NY 10016.
                </p>
              </div>
            </div>

            {/* Media / Video side */}
            <div className={styles.heroMediaCol}>
              <div className={styles.australiaSticker}>
                <img
                  src="/assets/images/Australia_Icon_7cdf6797-9b9e-43cd-8855-bed45dbfad15.png"
                  alt="Australia Icon"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div className={styles.videoFrame}>
                <video
                  playsInline
                  muted
                  autoPlay
                  loop
                  className={styles.videoElement}
                  poster="/assets/images/Screenshot_2026-08-21_at_10.32.56_am.png"
                  aria-label="Drizzy USA"
                >
                  <source
                    src="https://getdrizzy.co/cdn/shop/videos/c/vp/3bf20797693b4279ad33d2af5e4962c2/3bf20797693b4279ad33d2af5e4962c2.HD-1080p-7.2Mbps-92269433.mp4"
                    type="video/mp4"
                  />
                  <img
                    src="/assets/images/Screenshot_2026-08-21_at_10.32.56_am.png"
                    alt="Drizzy USA"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </video>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Trip Details ("Here's What You're Playing For") */}
      <div id="shopify-section-trip-details" className="shopify-section">
        <section className={styles.tripSection} id="trip-details">
          <div className={styles.tripCard}>
            {/* Dripping Graphic Divider */}
            <div style={{ width: '100%' }}>
              <img
                src="/assets/images/cream-dripping-graphic.png"
                alt=""
                aria-hidden="true"
                style={{ width: '100%', display: 'block' }}
              />
            </div>

            <div className={styles.tripContent}>
              <h2 className={styles.tripTitle}>
                Here's What You're Playing For
              </h2>

              <div className={styles.prizesRow}>
                {/* Prize 1 */}
                <div className={styles.prizeItem}>
                  <img
                    src="/assets/images/flight-icon.png"
                    alt="Round-trip flights"
                    className={styles.prizeIcon}
                  />
                  <h3 className={styles.prizeHeading}>
                    Round-trip flights
                  </h3>
                  <p className={styles.prizeDesc}>
                    Round-trip economy flights to Sydney, Australia for you and a guest.
                  </p>
                </div>

                {/* Prize 2 */}
                <div className={styles.prizeItem}>
                  <img
                    src="/assets/images/cash-icon.png"
                    alt="$2,000 spending money"
                    className={styles.prizeIcon}
                  />
                  <h3 className={styles.prizeHeading}>
                    $2,000 spending money
                  </h3>
                  <p className={styles.prizeDesc}>
                    To spend on your hotel accommodations, food, and other expenses while in Australia.
                  </p>
                </div>

                {/* Prize 3 */}
                <div className={styles.prizeItem}>
                  <img
                    src="/assets/images/cam-icon.png"
                    alt="An unforgettable trip"
                    className={styles.prizeIcon}
                  />
                  <h3 className={styles.prizeHeading}>
                    An unforgettable trip
                  </h3>
                  <p className={styles.prizeDesc}>
                    One winner + one guest are heading Down Under.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
                <a
                  href="#instructions"
                  className={styles.enterCtaBtn}
                  style={{ backgroundColor: 'var(--color-cream, #fffbf2)' }}
                >
                  ENTER
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Instructions ("How to Enter") */}
      <div id="shopify-section-instructions" className="shopify-section">
        <section className={styles.instructionsSection} id="instructions">
          <div className={styles.instructionsContainer}>
            {/* Left Image */}
            <div className={styles.instructionsImgCol}>
              <div className={styles.instructionsFrame}>
                <img
                  src="/assets/images/shutterstock_2623398413.jpg"
                  alt="Drizzy Fan with peanut butter"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Right Card with Steps */}
            <div className={styles.instructionsCard}>
              <h2 className={styles.instructionsTitle}>
                How to Enter
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', fontFamily: "var(--font-secondary, 'Azeret Mono')", fontSize: '1rem' }}>
                <span>Buy Drizzy (In-store or via sprouts.com)</span>
                <img
                  src="/assets/images/Sprouts_Farmers_Market_Logo_4_Vectorized.svg"
                  alt="Sprouts logo"
                  style={{ height: '3rem', width: 'auto', objectFit: 'contain' }}
                />
              </div>

              {/* Step 1 */}
              <div className={styles.stepBlock}>
                <h3 className={styles.stepHeading}>
                  1. Sign up or sign in to Sprouts
                </h3>
                <p className={styles.stepBody}>
                  Before you shop, create a Sprouts account or sign in to your existing account. You'll need your purchase linked to your account so we can verify your entry.
                </p>
              </div>

              {/* Step 2 */}
              <div className={styles.stepBlock}>
                <h3 className={styles.stepHeading}>
                  2. Buy Drizzy at Sprouts
                </h3>
                <p className={styles.stepBody}>
                  Purchase at least one bottle of Drizzy at Sprouts between August 24 and September 20, 2026.
                </p>
              </div>

              {/* Step 3 */}
              <div className={styles.stepBlock}>
                <h3 className={styles.stepHeading}>
                  3. Keep your receipt
                </h3>
                <p className={styles.stepBody}>
                  Hold onto your receipt! You'll need it to enter. If you purchased online, your digital receipt will be in your email inbox showing your Drizzy purchase.
                </p>
              </div>

              {/* Step 4 */}
              <div className={styles.stepBlock}>
                <h3 className={styles.stepHeading}>
                  4. Upload & enter
                </h3>
                <p className={styles.stepBody}>
                  Enter your name and email address below and upload a clear photo or screenshot of your Sprouts receipt. Use the same email address linked to your Sprouts account so we can verify your purchase.
                </p>
              </div>

              {/* Step 5 */}
              <div className={styles.stepBlock}>
                <h3 className={styles.stepHeading}>
                  5. You're in!
                </h3>
                <p className={styles.stepBody}>
                  Once your qualifying purchase and submission are verified, you'll officially be entered into the draw.
                </p>
              </div>

              <a
                href="#draw-form"
                className={styles.enterCtaBtn}
              >
                ENTER
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* 4. Draw Form ("Enter the Draw") */}
      <div id="shopify-section-draw-form" className="shopify-section">
        <section className={styles.drawSection} id="draw-form">
          <div className={styles.drawContainer}>
            <div className={styles.drawRow}>
              {/* Mascot illustration */}
              <div className={styles.drawMascotCol}>
                <img
                  src="/assets/images/man.svg"
                  alt="Drizzy Man Mascot"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </div>

              {/* Form Card */}
              <div className={styles.drawFormCol}>
                <div className={styles.drawCard}>
                  <h2 className={styles.drawTitle}>
                    Enter the Draw
                  </h2>

                  {status.success ? (
                    <div
                      style={{
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
                        🎉 Entry Received!
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
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                          }}
                          role="alert"
                        >
                          {status.message}
                        </div>
                      )}

                      {/* Name Fields */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        <div>
                          <label className={styles.formFieldLabel}>
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            className={styles.inputField}
                          />
                        </div>
                        <div>
                          <label className={styles.formFieldLabel}>
                            Last Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            className={styles.inputField}
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className={styles.formFieldLabel}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Your Sprouts-linked email address"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={styles.inputField}
                        />
                      </div>

                      {/* Receipt File Upload */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <label className={styles.formFieldLabel} style={{ marginBottom: 0 }}>
                            Drop Your Receipt *
                          </label>
                          {fileName && (
                            <span style={{ fontSize: '12px', fontFamily: "var(--font-secondary, 'Azeret Mono')", fontWeight: 700, color: 'var(--color-accent-green, #176537)' }}>
                              ✓ {fileName}
                            </span>
                          )}
                        </div>

                        <label className={styles.uploadDropzone}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-dark-brown, #2b1408)', fontFamily: "var(--font-secondary, 'Azeret Mono')", fontSize: '13px' }}>
                            <svg style={{ width: '1.5rem', height: '1.5rem' }} viewBox="0 0 24 24" fill="none">
                              <path
                                d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                                fill="#2d0f28"
                              />
                            </svg>
                            <span style={{ fontWeight: 700 }}>click to upload receipt image or PDF</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>

                      {/* Checkboxes */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={form.agreedRules}
                            onChange={(e) => setForm({ ...form, agreedRules: e.target.checked })}
                            style={{ marginTop: '3px', width: '1rem', height: '1rem', accentColor: 'var(--color-dark-brown, #2b1408)' }}
                          />
                          <span style={{ fontSize: '12px', fontFamily: "var(--font-secondary, 'Azeret Mono')", color: 'var(--color-dark-brown, #2b1408)', lineHeight: 1.5 }}>
                            I certify that I am 18+ and agree to the{' '}
                            <a href="/pages/rules" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: 700 }}>
                              Official Rules
                            </a>{' '}
                            and{' '}
                            <a href="/policies/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: 700 }}>
                              Privacy Policy
                            </a>.
                          </span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={form.newsletterOptIn}
                            onChange={(e) => setForm({ ...form, newsletterOptIn: e.target.checked })}
                            style={{ marginTop: '3px', width: '1rem', height: '1rem', accentColor: 'var(--color-dark-brown, #2b1408)' }}
                          />
                          <span style={{ fontSize: '12px', fontFamily: "var(--font-secondary, 'Azeret Mono')", color: 'var(--color-dark-brown, #2b1408)', lineHeight: 1.5 }}>
                            Sign me up to receive updates and sweet deals from Drizzy!
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                        <button
                          type="submit"
                          disabled={status.loading}
                          className={styles.enterCtaBtn}
                          style={{ maxWidth: '440px', width: '100%' }}
                        >
                          {status.loading ? 'SUBMITTING...' : 'SUBMIT ENTRY'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Rules Banner Box */}
                <div className={styles.rulesBannerBox}>
                  <p style={{ fontFamily: "var(--font-primary, 'Champ Black')", fontSize: '14px', textTransform: 'uppercase', margin: '0 0 0.5rem 0' }}>
                    <a href="/pages/rules" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                      OFFICIAL RULES
                    </a>{' '}
                    |{' '}
                    <a href="/policies/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                      PRIVACY POLICY
                    </a>
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>NO PURCHASE NECESSARY; </strong>void where prohibited. Open to U.S. residents, 18+. Ends 9/20/26. <strong>Limit one (1) entry per person total. </strong>Two entry methods: (i) A qualifying purchase of Drizzy peanut butter at Sprouts Farmers Market, or (ii) mail-in entry. See Official Rules at{' '}
                    <a href="/pages/rules" style={{ textDecoration: 'underline', fontWeight: 700, color: 'var(--color-dark-brown, #2b1408)' }}>
                      https://getdrizzy.co/pages/rules
                    </a>{' '}
                    for details. Sponsor: Drizzy Holdings Inc., 90 Park Ave., NY, NY 10016.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SproutsContest;
