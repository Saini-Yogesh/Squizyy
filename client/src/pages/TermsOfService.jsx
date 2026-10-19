import React from 'react';
import styles from './TermsOfService.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Terms of Service
        </h1>

        <div className={styles.card}>
          <div>
            <h2 className={styles.sectionTitle}>Welcome to Drizzy!</h2>
            <p style={{ margin: 0 }}>
              These Terms of Service (“Terms”) govern your access to and use of our website, online store, and any related services operated by Drizzy (“we”, “our”, or “us”).
              By visiting our site or making a purchase, you agree to these Terms. Please read them carefully before using our services.
            </p>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>1. Using Our Website</h2>
            <p style={{ margin: '0 0 0.5rem 0' }}>You may use our website and services only for lawful purposes and in accordance with these Terms.</p>
            <ul className={styles.bulletList}>
              <li>Do not use our website for any illegal or unauthorized purpose.</li>
              <li>Do not interfere with or disrupt the security or functionality of the website.</li>
              <li>Do not attempt to collect or misuse other users' personal data.</li>
            </ul>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>2. Products and Orders</h2>
            <p style={{ margin: 0 }}>
              We do our best to display product details, images, and pricing as accurately as possible. When you place an order, you agree that all information provided is accurate and that you are authorized to use the payment method provided.
            </p>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>3. Shipping and Delivery</h2>
            <p style={{ margin: 0 }}>
              Delivery times are estimates and may vary based on your location. If your order arrives damaged or missing, please contact us within 7 days of delivery at{' '}
              <a href="mailto:hello@getdrizzy.co" style={{ textDecoration: 'underline', fontWeight: 700, color: 'var(--color-dark-brown, #2b1408)' }}>
                hello@getdrizzy.co
              </a>.
            </p>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>4. Returns and Refunds</h2>
            <p style={{ margin: 0 }}>
              Your satisfaction matters to us! Due to the perishable nature of peanut butter food products, returns are accepted within 7 days if defective or incorrect.
            </p>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>5. Contact Us</h2>
            <p style={{ margin: 0 }}>
              Questions about the Terms of Service should be sent to{' '}
              <a href="mailto:hello@getdrizzy.co" style={{ textDecoration: 'underline', fontWeight: 700, color: 'var(--color-dark-brown, #2b1408)' }}>
                hello@getdrizzy.co
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
