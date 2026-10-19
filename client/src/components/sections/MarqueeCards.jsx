import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MarqueeCards.module.css';

const MarqueeCards = () => {
  return (
    <div id="shopify-section-marquee-cards" className="shopify-section">
      <section className={styles.section} aria-label="Brand Philosophy">
        <div className={styles.container}>
          {/* Header row with mascot & peanut icons */}
          <div className={styles.headerRow}>
            {/* Mobile icon left */}
            <div className={styles.iconMobile}>
              <img
                src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                alt=""
                aria-hidden="true"
                width="32"
                height="32"
                className={styles.iconImg}
              />
            </div>

            {/* Desktop alternating row left */}
            <div className={styles.iconGroupDesktop}>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
            </div>

            {/* Center Heading */}
            <h3 className={styles.title}>
              LIFE'S BETTER WITH DRIZZY
            </h3>

            {/* Desktop alternating row right */}
            <div className={styles.iconGroupDesktop}>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
              <div className={styles.iconItem}>
                <img
                  src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                  alt=""
                  aria-hidden="true"
                  width="36"
                  height="36"
                  className={styles.iconImg}
                />
              </div>
            </div>

            {/* Mobile icon right */}
            <div className={styles.iconMobile}>
              <img
                src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                alt=""
                aria-hidden="true"
                width="32"
                height="32"
                className={styles.iconImg}
              />
            </div>
          </div>

          <p className={styles.subtitle}>
            Adding joy to your day so that you actually get the most out of a healthy, age-old pantry staple loved by all.
          </p>

          <div className={styles.ctaWrapper}>
            <Link
              to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
              className={styles.ctaButton}
            >
              BUY DRIZZY PEANUT BUTTER NOW
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarqueeCards;
