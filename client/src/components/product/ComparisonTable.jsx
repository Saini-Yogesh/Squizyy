import React from 'react';
import styles from './ComparisonTable.module.css';

const ComparisonTable = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.section} aria-label="Product Comparison">
        {/* Floating peanut left */}
        <div className={styles.peanutLeft}>
          <img
            src="/assets/images/drizzy-peanut-left.png"
            alt=""
            loading="lazy"
          />
        </div>

        {/* Product bottle left */}
        <div className={styles.bottleLeft}>
          <img
            src="/assets/images/product-bottle-left.png"
            alt="Drizzy Bottle"
            loading="lazy"
          />
        </div>

        {/* Floating peanut right */}
        <div className={styles.peanutRight}>
          <img
            src="/assets/images/drizzy-peanut-left.png"
            alt=""
            loading="lazy"
          />
        </div>

        {/* Other product right (messy jars) */}
        <div className={styles.otherProductRight}>
          <img
            src="/assets/images/other-product-right.png"
            alt="Standard Peanut Butter Jars"
            loading="lazy"
          />
        </div>

        <div className={styles.mainWrapper}>
          {/* Top cream dripping graphic */}
          <div className={styles.dripTop}>
            <img
              src="/assets/images/cream-drip.svg"
              alt=""
              className={styles.dripImgDesktop}
              loading="lazy"
            />
            <img
              src="/assets/images/cream-drip-mobile.svg"
              alt=""
              className={styles.dripImgMobile}
              loading="lazy"
            />
          </div>

          {/* Headline and Comparison badges */}
          <div className={styles.container}>
            <h2 className={styles.headline}>
              Kiss Your Jar Goodbye, Mwa!
            </h2>

            <div className={styles.vsRow}>
              {/* Left (Drizzy) perks */}
              <div className={styles.leftPerks}>
                <div className={styles.pillBadge}>
                  PERFECTLY SMOOTH
                </div>
                <div className={styles.pillBadge}>
                  SQUEEZE AND DRIZZLE
                </div>
                <div className={styles.pillBadge}>
                  ZERO MESS
                </div>
              </div>

              {/* VS Badge */}
              <div className={styles.vsCircle} aria-hidden="true">
                VS
              </div>

              {/* Right (Standard Jars) pain points */}
              <div className={styles.rightPains}>
                <div className={styles.pillBadge}>
                  HARD TO STIR
                </div>
                <div className={styles.pillBadge}>
                  SCOOP AND SCRAPE
                </div>
                <div className={styles.pillBadge}>
                  SOMEHOW GET IT EVERYWHERE
                </div>
              </div>
            </div>
          </div>

          {/* Bottom purple drip graphic */}
          <div className={styles.dripBottom}>
            <img
              src="/assets/images/purple-drip.svg"
              alt=""
              className={styles.dripImgDesktop}
              loading="lazy"
            />
            <img
              src="/assets/images/purple-drip-mobile.svg"
              alt=""
              className={styles.dripImgMobile}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComparisonTable;
