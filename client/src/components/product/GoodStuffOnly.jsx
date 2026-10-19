import React from 'react';
import styles from './GoodStuffOnly.module.css';

const GoodStuffOnly = () => {
  return (
    <section className={styles.section} aria-label="Good Stuff Only Ingredients">
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Good Stuff Only
        </h2>

        {/* Desktop Layout */}
        <div className={styles.desktopGrid}>
          {/* Left Column Perks */}
          <div className={styles.leftCol}>
            <div className={styles.perkItem} style={{ alignItems: 'flex-end' }}>
              <img src="/assets/images/smile.png" alt="" aria-hidden="true" className={styles.perkIcon} />
              <h3 className={styles.perkTitle}>GOOD SOURCE OF PROTEIN & FIBER</h3>
            </div>
            <div className={styles.perkItem} style={{ alignItems: 'flex-end' }}>
              <img src="/assets/images/peanut-man.png" alt="" aria-hidden="true" className={styles.perkIcon} />
              <h3 className={styles.perkTitle}>NO PALM OILS, NO NASTIES</h3>
            </div>
          </div>

          {/* Center Bottle Graphic */}
          <div className={styles.centerBottleBox}>
            <img
              src="/assets/images/features-bg-2.png"
              alt="Good Stuff Drizzy Bottle"
              className={styles.centerBottleImg}
            />
          </div>

          {/* Right Column Perks */}
          <div className={styles.rightCol}>
            <div className={styles.perkItem} style={{ alignItems: 'flex-start' }}>
              <img src="/assets/images/natural-fuel.png" alt="" aria-hidden="true" className={styles.perkIcon} />
              <h3 className={styles.perkTitle}>NATURAL FUEL FOR YOUR DAY</h3>
            </div>
            <div className={styles.perkItem} style={{ alignItems: 'flex-start' }}>
              <img src="/assets/images/zero-sugar.png" alt="" aria-hidden="true" className={styles.perkIcon} />
              <h3 className={styles.perkTitle}>NO ADDED SUGAR</h3>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className={styles.mobileLayout}>
          <div className={styles.mobileGrid}>
            <div className={styles.mobilePerkItem}>
              <img src="/assets/images/smile.png" alt="" aria-hidden="true" className={styles.mobilePerkIcon} />
              <h3 className={styles.mobilePerkTitle}>GOOD SOURCE OF PROTEIN & FIBER</h3>
            </div>
            <div className={styles.mobilePerkItem}>
              <img src="/assets/images/natural-fuel.png" alt="" aria-hidden="true" className={styles.mobilePerkIcon} />
              <h3 className={styles.mobilePerkTitle}>NATURAL FUEL FOR YOUR DAY</h3>
            </div>
            <div className={styles.mobilePerkItem}>
              <img src="/assets/images/peanut-man.png" alt="" aria-hidden="true" className={styles.mobilePerkIcon} />
              <h3 className={styles.mobilePerkTitle}>NO PALM OILS, NO NASTIES</h3>
            </div>
            <div className={styles.mobilePerkItem}>
              <img src="/assets/images/zero-sugar.png" alt="" aria-hidden="true" className={styles.mobilePerkIcon} />
              <h3 className={styles.mobilePerkTitle}>NO ADDED SUGAR</h3>
            </div>
          </div>

          <div className={styles.mobileBottleBox}>
            <img
              src="/assets/images/features-bg-mobile.png"
              alt="Good Stuff Drizzy Bottle"
              className={styles.mobileBottleImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoodStuffOnly;
