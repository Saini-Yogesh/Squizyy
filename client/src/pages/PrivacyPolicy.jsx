import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Privacy Policy
        </h1>

        <div className={styles.card}>
          <div>
            <h2 className={styles.sectionTitle}>Welcome to Drizzy!</h2>
            <p style={{ margin: 0 }}>
              Your privacy is important to us. This Privacy Policy explains how <strong>Drizzy</strong> (“we”, “our”, or “us”) collects, uses, and protects the personal information you share when you interact with our website, online store, or any other digital service operated by Drizzy.
            </p>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
            <p style={{ margin: '0 0 0.5rem 0' }}>We may collect the following types of information when you interact with us:</p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Personal Information:</strong> such as your name, email address, shipping address, phone number, and payment details when you make a purchase or sign up for our newsletter.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> such as browser type, device information, IP address, and how you use our website (e.g., pages visited, time spent).
              </li>
              <li>
                <strong>Cookies & Tracking:</strong> We use cookies and similar technologies to enhance your browsing experience, personalize content, and analyze site performance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
            <p style={{ margin: '0 0 0.5rem 0' }}>We use your information to:</p>
            <ul className={styles.bulletList}>
              <li>Process and fulfill your orders.</li>
              <li>Communicate with you about your purchases, promotions, or updates.</li>
              <li>Improve our products, services, and website experience.</li>
              <li>Respond to your inquiries or feedback.</li>
              <li>Comply with legal obligations and prevent fraudulent activity.</li>
            </ul>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>3. How We Protect Your Information</h2>
            <p style={{ margin: 0 }}>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, please note that no online transmission or electronic storage method is 100% secure.
            </p>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>4. Sharing Your Information</h2>
            <p style={{ margin: 0 }}>
              We do <strong>not</strong> sell your personal data. We may share limited information with trusted third parties who help us operate our business, such as payment processors, delivery partners, and email service providers.
            </p>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>5. Contact Us</h2>
            <p style={{ margin: 0 }}>
              If you have any questions about this Privacy Policy, please reach out to us at{' '}
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

export default PrivacyPolicy;
