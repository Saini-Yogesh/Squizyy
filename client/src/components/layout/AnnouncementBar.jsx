import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AnnouncementBar.module.css';

const AnnouncementBar = () => {
  const items = [
    { icon: '/assets/images/Union.svg' },
    { icon: '/assets/images/peanut-tiny_edb0d5dd-b629-429d-a3b9-ec4c93589cbb.png' },
    { icon: '/assets/images/Union.svg' },
    { icon: '/assets/images/peanut-tiny_edb0d5dd-b629-429d-a3b9-ec4c93589cbb.png' },
    { icon: '/assets/images/Union.svg' },
    { icon: '/assets/images/peanut-tiny_edb0d5dd-b629-429d-a3b9-ec4c93589cbb.png' },
  ];

  return (
    <div className={styles.wrapper}>
      <section className={styles.section} aria-label="Announcement">
        <div className={styles.container}>
          {/* Mobile view marquee */}
          <div className={styles.mobileMarquee}>
            <div className={styles.trackWrapper}>
              <div className={styles.track}>
                {items.slice(0, 3).map((item, idx) => (
                  <Link
                    key={idx}
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className={styles.trackItem}
                  >
                    <span className={styles.itemIcon}>
                      <img
                        src={item.icon}
                        alt=""
                        width="80"
                        height="80"
                        loading="eager"
                      />
                    </span>
                    <div className={styles.itemText}>
                      <span>FREE SHIPPING ON ORDERS $49.99+</span>
                      <span className={styles.buyNow}>BUY NOW</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className={styles.track} aria-hidden="true">
                {items.slice(0, 3).map((item, idx) => (
                  <Link
                    key={`dup-${idx}`}
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className={styles.trackItem}
                  >
                    <span className={styles.itemIcon}>
                      <img
                        src={item.icon}
                        alt=""
                        width="80"
                        height="80"
                        loading="eager"
                      />
                    </span>
                    <div className={styles.itemText}>
                      <span>FREE SHIPPING ON ORDERS $49.99+</span>
                      <span className={styles.buyNow}>BUY NOW</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop view marquee */}
          <div className={styles.desktopMarquee}>
            <div className={styles.trackWrapper}>
              <div className={styles.track}>
                {items.map((item, idx) => (
                  <Link
                    key={idx}
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className={styles.trackItem}
                  >
                    <span className={styles.desktopIcon}>
                      <img
                        src={item.icon}
                        alt=""
                        width="200"
                        height="200"
                        loading="eager"
                      />
                    </span>
                    <div className={styles.itemText}>
                      <span>FREE SHIPPING ON ORDERS $49.99+</span>
                      <span className={styles.buyNow}>BUY NOW</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className={styles.track} aria-hidden="true">
                {items.map((item, idx) => (
                  <Link
                    key={`desktop-dup-${idx}`}
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className={styles.trackItem}
                  >
                    <span className={styles.desktopIcon}>
                      <img
                        src={item.icon}
                        alt=""
                        width="200"
                        height="200"
                        loading="eager"
                      />
                    </span>
                    <div className={styles.itemText}>
                      <span>FREE SHIPPING ON ORDERS $49.99+</span>
                      <span className={styles.buyNow}>BUY NOW</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnnouncementBar;
