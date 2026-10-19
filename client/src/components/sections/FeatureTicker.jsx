import React from 'react';
import styles from './FeatureTicker.module.css';

const FeatureTicker = () => {
  const tickerItems = [
    { icon: '/assets/images/image_10_Vectorized.svg', title: 'AUSSIE-OWNED' },
    { icon: '/assets/images/image_11_Vectorized_-2.svg', title: 'ULTRA-SMOOTH' },
    { icon: '/assets/images/image_11_Vectorized.svg', title: 'ZERO ADDED SUGAR' },
    { icon: '/assets/images/image_11_Vectorized_-1.svg', title: 'NATURAL FUEL' },
    { icon: '/assets/images/image_10_Vectorized.svg', title: 'AUSSIE-OWNED' },
    { icon: '/assets/images/image_11_Vectorized_-2.svg', title: 'ULTRA-SMOOTH' },
    { icon: '/assets/images/image_11_Vectorized.svg', title: 'ZERO ADDED SUGAR' },
    { icon: '/assets/images/image_11_Vectorized_-1.svg', title: 'NATURAL FUEL' },
  ];

  return (
    <div id="shopify-section-logos-marquee" className="shopify-section">
      <section className={styles.tickerSection} aria-label="Brand Highlights">
        <div className={styles.tickerWrapper}>
          {/* Track 1 */}
          <div className={styles.tickerTrack}>
            {tickerItems.map((item, idx) => (
              <div key={`track1-${idx}`} className={styles.tickerItem}>
                <div className={styles.iconWrapper}>
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    width="56"
                    height="56"
                    className={styles.iconImg}
                    loading="lazy"
                  />
                </div>
                <p className={styles.itemTitle}>{item.title}</p>
              </div>
            ))}
          </div>

          {/* Track 2 for seamless loop */}
          <div className={styles.tickerTrack} aria-hidden="true">
            {tickerItems.map((item, idx) => (
              <div key={`track2-${idx}`} className={styles.tickerItem}>
                <div className={styles.iconWrapper}>
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    width="56"
                    height="56"
                    className={styles.iconImg}
                    loading="lazy"
                  />
                </div>
                <p className={styles.itemTitle}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureTicker;
