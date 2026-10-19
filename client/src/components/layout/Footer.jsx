import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../../services/api';
import { validateEmail } from '../../utils/validation';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    try {
      setStatus({ state: 'loading', message: '' });
      const res = await subscribeNewsletter(email, 'homepage-footer');
      setStatus({
        state: 'success',
        message: res.message || 'Thanks for subscribing! Use code WELCOME10 for 10% off.'
      });
      setEmail('');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Subscription failed. Please check your network and try again.';
      setStatus({ state: 'error', message: errMsg });
    }
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <section className={styles.section}>
        {/* Pastel Colorful Gradient Background */}
        <div className={styles.bgWrapper}>
          <img
            src="/assets/images/footer-bg.png"
            alt=""
            className={styles.bgImage}
            loading="lazy"
          />
        </div>

        {/* Dripping Graphic at top of footer */}
        <div className={styles.dripWrapper}>
          <img
            src="/assets/images/footer-drip.svg"
            alt=""
            className={styles.dripDesktop}
            loading="lazy"
          />
          <img
            src="/assets/images/timeline-drip-mobile.svg"
            alt=""
            className={styles.dripMobile}
            loading="lazy"
          />
        </div>

        {/* Main Footer Cards Container */}
        <div className={styles.container}>
          <div className={styles.cardsRow}>
            {/* Card 1: Sign up & save 10% */}
            <div className={styles.newsletterCard}>
              <h2 className={styles.cardTitle}>
                Sign up & save 10%
              </h2>
              <p className={styles.cardSubtitle}>
                Subscribe to our newsletter and get first access to new releases & exclusive deals.
              </p>

              <form onSubmit={handleSubscribe} className={styles.form}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className={styles.input}
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  disabled={status.state === 'loading'}
                  className={`button-primary ${styles.submitBtn}`}
                >
                  {status.state === 'loading' ? 'Joining...' : 'GET MY 10% OFF'}
                </button>
              </form>

              {status.message && (
                <p className={`${styles.statusMessage} ${status.state === 'error' ? styles.statusError : styles.statusSuccess}`}>
                  {status.message}
                </p>
              )}
            </div>

            {/* Card 2: Get Drizzy with it */}
            <div className={styles.linksCard}>
              <h2 className={styles.linksTitle}>
                Get Drizzy with it
              </h2>
              <div className={styles.linksGrid}>
                <div className={styles.navCol}>
                  <ul className={styles.navList}>
                    <li>
                      <Link to="/products/drizzy-squeezy-peanut-butter-19-4-oz" className={styles.footerLink}>
                        Shop Drizzy
                      </Link>
                    </li>
                    <li>
                      <Link to="/pages/our-story" className={styles.footerLink}>
                        Our Story
                      </Link>
                    </li>
                    <li>
                      <Link to="/pages/wholesale" className={styles.footerLink}>
                        Wholesale
                      </Link>
                    </li>
                    <li>
                      <Link to="/pages/sproutslaunchwinflightstoaustralia" className={styles.footerLink}>
                        Win Flights to Australia
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className={styles.navCol}>
                  <ul className={styles.navList}>
                    <li>
                      <Link to="/policies/privacy-policy" className={styles.footerLink}>
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/policies/terms-of-service" className={styles.footerLink}>
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link to="/pages/rules" className={styles.footerLink}>
                        Sweepstakes Rules
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin" className={styles.footerLink}>
                        Admin Portal
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className={styles.navCol}>
                  <h3 className={styles.socialHeading}>
                    Follow Us On
                  </h3>
                  <ul className={styles.socialList}>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/getdrizzy/"
                        className={styles.socialIconLink}
                        aria-label="Instagram"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" fill="#2D0F28"/>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/company/drizzypeanuts/"
                        className={styles.socialIconLink}
                        aria-label="LinkedIn"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.5 0H1.5C0.67 0 0 0.67 0 1.5V22.5C0 23.33 0.67 24 1.5 24H22.5C23.33 24 24 23.33 24 22.5V1.5C24 0.67 23.33 0 22.5 0ZM7.73 20.39H4.61V9.37H7.73V20.39ZM6.17 8.01C5.17 8.01 4.36 7.2 4.36 6.2C4.36 5.2 5.17 4.39 6.17 4.39C7.17 4.39 7.98 5.2 7.98 6.2C7.98 7.2 7.17 8.01 6.17 8.01ZM20.39 20.39H17.28V14.25C17.28 12.75 16.74 11.73 15.39 11.73C14.36 11.73 13.75 12.42 13.48 13.09C13.38 13.33 13.36 13.67 13.36 14.01V20.39H10.25V9.37H13.24V10.74C13.64 10.12 14.36 9.24 15.96 9.24C17.98 9.24 19.5 10.56 19.5 13.4V20.39H20.39Z" fill="#2D0F28"/>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.tiktok.com/@getdrizzypeanuts"
                        className={styles.socialIconLink}
                        aria-label="TikTok"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.6785 9.57C7.73422 9.428 5.68755 10.4777 4.53855 12.719C2.81555 16.0815 4.23955 21.5835 9.98855 21.5835C15.7386 21.5835 15.9045 16.0275 15.9045 15.4455V8.9375C17.1345 9.71617 18.1712 10.185 19.0145 10.344C19.8589 10.5027 20.3955 10.573 20.6245 10.555V7.317C19.8439 7.223 19.1689 7.04367 18.5996 6.779C17.7451 6.382 16.0515 5.2805 16.0515 3.666C16.0525 3.674 16.0525 3.2575 16.0515 2.4165H12.4925C12.4822 10.3245 12.4822 14.6675 12.4925 15.4455C12.508 16.6125 11.6025 18.2455 9.76755 18.2455C7.93155 18.2455 7.02605 16.614 7.02605 15.562C7.02605 14.918 7.24755 13.9845 8.16205 13.293C8.70455 12.883 9.45705 12.719 10.6785 12.719V9.57Z"
                            fill="#2D0F28"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Giant Centered Logo & Copyright */}
          <div className={styles.bottomSection}>
            <div style={{ width: '100%', padding: '0 0.5rem' }}>
              <img
                src="/assets/images/drizzy-dark-logo.svg"
                alt="DRIZZY"
                className={styles.brandLogoImg}
                loading="lazy"
              />
            </div>
            <div className={styles.copyright}>
              © Drizzy Pty Limited, 2026. All Rights Reserved.
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
