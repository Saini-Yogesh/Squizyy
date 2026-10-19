import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div id="shopify-section-hero" className="shopify-section">
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* Main hero frame */}
          <div className={styles.heroFrame}>
            {/* Desktop Hero Background Graphic */}
            <img
              src="/assets/images/hero-bg.png"
              alt="Drizzy squeezy peanut butter hero banner"
              className={styles.bgDesktop}
              loading="eager"
            />

            {/* Mobile Hero Background Graphic */}
            <img
              src="/assets/images/hero-bg-mobile.png"
              alt="Drizzy squeezy peanut butter hero mobile banner"
              className={styles.bgMobile}
              loading="eager"
            />

            {/* Floating Sticker Graphic */}
            <div className={styles.stickerWrapper}>
              <img
                src="/assets/images/sticker.png"
                alt="100% natural Aussie peanut butter badge"
                className={styles.stickerImg}
                loading="eager"
              />
            </div>

            {/* Bottom Gradient Overlay */}
            <div className={styles.bottomGradient} />

            {/* Top Heading + Star Ratings */}
            <div className={styles.topContent}>
              <div className={styles.ratingRow}>
                <div className={styles.starsList} aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.16089 13.5124C2.82276 13.6862 2.43989 13.3824 2.50796 12.9944L3.23397 8.8561L0.151933 5.91904C-0.1361 5.64456 0.0129997 5.14269 0.398865 5.08788L4.68503 4.47899L6.59614 0.693267C6.76829 0.352244 7.23464 0.352244 7.40679 0.693267L9.3179 4.47899L13.6041 5.08788C13.9899 5.14269 14.139 5.64456 13.851 5.91904L10.769 8.8561L11.495 12.9944C11.563 13.3824 11.1802 13.6862 10.842 13.5124L7.00146 11.5384L3.16089 13.5124Z"
                        fill="#CA9AF1"
                      />
                    </svg>
                  ))}
                </div>
                <p className={styles.ratingText}>Loved by Thousands of Aussies!</p>
              </div>

              <h1 className={styles.heading}>
                All-Natural Peanut Butter You Can Squeeze
              </h1>
            </div>

            {/* Bottom CTA & Subtitle */}
            <div className={styles.bottomContent}>
              <Link
                to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                className={styles.ctaLink}
              >
                BUY DRIZZY PEANUT BUTTER NOW
              </Link>
              <p className={styles.shippingBadge}>
                FREE SHIPPING ON ORDERS $49.99+
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
