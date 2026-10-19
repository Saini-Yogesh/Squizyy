import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { subscribeNewsletter } from '../../services/api';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ loading: true, success: false, message: '' });
    try {
      const res = await subscribeNewsletter(email, 'homepage_signup_10');
      setStatus({
        loading: false,
        success: true,
        message: res.message || 'Thanks for subscribing! Use code WELCOME10 at checkout.',
      });
      setEmail('');
    } catch {
      setStatus({
        loading: false,
        success: false,
        message: 'Something went wrong. Please check your email and try again.',
      });
    }
  };

  return (
    <section className={styles.section} aria-label="Newsletter Signup">
      <div className={styles.card}>
        {/* Floating Peanuts & Dripping Accents */}
        <div className={styles.decorTopLeft}>
          <img src="/assets/images/Union.svg" alt="" aria-hidden="true" width="80" height="80" />
        </div>
        <div className={styles.decorBottomRight}>
          <img src="/assets/images/peanut-small.png" alt="" aria-hidden="true" width="96" height="96" />
        </div>

        <div className={styles.contentWrapper}>
          <span className={styles.badge}>
            Exclusive Community Perks
          </span>
          <h2 className={styles.heading}>
            Sign up & save 10%
          </h2>
          <p className={styles.description}>
            Subscribe to our newsletter for first access to fresh roasted batches, secret flavor releases, and 10% off your first order.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className={styles.input}
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              disabled={status.loading}
              className={styles.submitButton}
            >
              <span>{status.loading ? 'Signing Up...' : 'Get my 10% off'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {status.message && (
            <div
              className={`${styles.messageStatus} ${
                status.success ? styles.messageSuccess : styles.messageError
              }`}
              role="alert"
            >
              {status.success && <CheckCircle2 size={16} />}
              <span>{status.message}</span>
            </div>
          )}

          <p className={styles.disclaimer}>
            By signing up, you agree to receive email updates. Unsubscribe anytime with 1 click.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
