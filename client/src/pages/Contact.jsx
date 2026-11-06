import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    orderNumber: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    // Simulate instantaneous responsive dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContainer}>
        {/* Header */}
        <div className={styles.contactHeader}>
          <div className={styles.pillBadge}>
            <span>💬</span>
            <span>WE'D LOVE TO HEAR FROM YOU</span>
          </div>
          <h1 className={styles.title}>SAY HELLO TO SQUIZYY</h1>
          <p className={styles.subtitle}>
            Have a question about your order, want to share product feedback, or interested in wholesale partnerships? Send us a message or reach out directly below.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {/* Left Column: Direct Support Cards */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoHeading}>Direct Support</h2>

              <div className={styles.channelsList}>
                {/* WhatsApp Support */}
                <a
                  href="https://wa.me/919876543210?text=Hi%20Squizyy%20Team!%20I%20have%20a%20question%20regarding%20my%20order..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelItem}
                >
                  <div className={styles.channelIconWrap} style={{ backgroundColor: '#25d366' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382C17.112 14.202 15.344 13.332 15.014 13.212C14.684 13.092 14.444 13.032 14.204 13.392C13.964 13.752 13.274 14.562 13.064 14.802C12.854 15.042 12.644 15.072 12.284 14.892C11.924 14.712 10.764 14.332 9.384 13.102C8.304 12.142 7.574 10.952 7.364 10.592C7.154 10.232 7.344 10.042 7.524 9.862C7.684 9.702 7.884 9.442 8.064 9.232C8.244 9.022 8.304 8.872 8.424 8.632C8.544 8.392 8.484 8.182 8.394 8.002C8.304 7.822 7.584 6.052 7.284 5.332C6.994 4.632 6.694 4.732 6.474 4.722C6.264 4.712 6.024 4.712 5.784 4.712C5.544 4.712 5.154 4.802 4.824 5.162C4.494 5.522 3.564 6.392 3.564 8.162C3.564 9.932 4.854 11.642 5.034 11.882C5.214 12.122 7.574 15.762 11.194 17.322C12.054 17.692 12.724 17.922 13.254 18.092C14.124 18.372 14.914 18.332 15.544 18.242C16.244 18.142 17.694 17.362 17.994 16.512C18.294 15.662 18.294 14.942 18.204 14.792C18.124 14.642 17.884 14.562 17.472 14.382ZM12.044 21.802C10.364 21.802 8.714 21.352 7.264 20.492L6.924 20.292L2.834 21.362L3.924 17.382L3.704 17.032C2.754 15.522 2.254 13.772 2.254 11.972C2.254 6.572 6.644 2.182 12.054 2.182C14.674 2.182 17.134 3.202 18.984 5.062C20.834 6.922 21.854 9.382 21.854 12.002C21.844 17.412 17.454 21.802 12.044 21.802Z" fill="#ffffff"/>
                    </svg>
                  </div>
                  <div className={styles.channelBody}>
                    <span className={styles.channelLabel}>WHATSAPP CHAT</span>
                    <span className={styles.channelValue}>+91 98765 43210</span>
                    <span className={styles.channelNote}>Click to chat instantly with support &rarr;</span>
                  </div>
                </a>

                {/* Email Support */}
                <a href="mailto:support@squizyy.in" className={styles.channelItem}>
                  <div className={styles.channelIconWrap} style={{ backgroundColor: 'var(--color-accent-purple, #ca9af1)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#2D0F28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="#2D0F28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.channelBody}>
                    <span className={styles.channelLabel}>EMAIL US</span>
                    <span className={styles.channelValue}>support@squizyy.in</span>
                    <span className={styles.channelNote}>We respond within 24 business hours</span>
                  </div>
                </a>
              </div>

              <hr className={styles.cardDivider} />

              <div className={styles.hoursBlock}>
                <span className={styles.hoursTitle}>🕒 Operating Hours</span>
                <p className={styles.hoursText}>Monday – Saturday: 9:30 AM – 6:30 PM IST</p>
                <p className={styles.hoursSub}>Pan-India customer service &amp; order fulfillment.</p>
              </div>
            </div>

            {/* Headquarters Card */}
            <div className={styles.infoCard}>
              <h2 className={styles.infoHeading}>Brand Office</h2>
              <div className={styles.officeBlock}>
                <strong className={styles.officeName}>Squizyy Foods India Private Limited</strong>
                <p className={styles.officeAddress}>
                  Saurashtra, Gujarat — 360001, India
                </p>
                <div className={styles.badgeBox}>
                  <span className={styles.originPill}>🇮🇳 100% Indian Peanuts</span>
                  <span className={styles.originPill}>FSSAI Certified</span>
                </div>
              </div>
            </div>

            {/* Quick FAQ Prompt */}
            <div className={styles.faqBanner}>
              <div className={styles.faqIcon}>💡</div>
              <div className={styles.faqText}>
                <strong>Have a quick question?</strong>
                <p>Check out our FAQ on storage, oil separation, and squeeze caps.</p>
                <Link to="/pages/faq" className={styles.faqLink}>View FAQ &rarr;</Link>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Feedback Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send a Message or Feedback</h2>
              <p className={styles.formDesc}>
                Whether you want to track an order, give feedback, or say hi, fill out the form below. We read and respond to every message!
              </p>

              {submitted ? (
                <div className={styles.successBox}>
                  <div className={styles.successEmoji}>🎉</div>
                  <h3 className={styles.successHeading}>Message Sent Successfully!</h3>
                  <p className={styles.successDesc}>
                    Thank you for getting in touch with Squizyy! Our team has received your message and will get back to you shortly.
                  </p>
                  <Link to="/collections/all" className={styles.submitBtn} style={{ marginTop: '1rem', textDecoration: 'none', display: 'inline-block' }}>
                    CONTINUE SHOPPING
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.formInner}>
                  {/* Name & Email Row */}
                  <div className={styles.formRow}>
                    <div className={styles.fieldWrap}>
                      <label className={styles.fieldLabel}>Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={styles.inputField}
                      />
                    </div>

                    <div className={styles.fieldWrap}>
                      <label className={styles.fieldLabel}>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.inputField}
                      />
                    </div>
                  </div>

                  {/* Phone & Topic Row */}
                  <div className={styles.formRow}>
                    <div className={styles.fieldWrap}>
                      <label className={styles.fieldLabel}>Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={styles.inputField}
                      />
                    </div>

                    <div className={styles.fieldWrap}>
                      <label className={styles.fieldLabel}>Topic / Department *</label>
                      <select
                        required
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className={styles.selectField}
                      >
                        <option value="" disabled>Select a topic...</option>
                        <option value="Order & Delivery Tracking">📦 Order &amp; Delivery Tracking</option>
                        <option value="Product Feedback & Review">🥜 Product Feedback &amp; Review</option>
                        <option value="Damage / Replacement Request">⚠️ Damaged Item / Replacement</option>
                        <option value="Wholesale & Retail Inquiry">🏪 Wholesale &amp; Retail Inquiry</option>
                        <option value="Press & Collaboration">✨ Press &amp; Collaboration</option>
                        <option value="General Inquiry">💬 General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Number Field */}
                  <div className={styles.fieldWrap}>
                    <label className={styles.fieldLabel}>Order Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. #1024 (if inquiring about an order)"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      className={styles.inputField}
                    />
                  </div>

                  {/* Message Field */}
                  <div className={styles.fieldWrap}>
                    <label className={styles.fieldLabel}>Your Message or Feedback *</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Share your question, feedback, or thoughts here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={styles.textareaField}
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button type="submit" disabled={loading} className={styles.submitBtn}>
                      {loading ? 'SENDING...' : 'SEND MESSAGE →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

