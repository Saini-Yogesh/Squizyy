import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturesGrid.module.css';

const FeaturesGrid = () => {
  const features = [
    {
      icon: '/assets/images/image_11_Vectorized_-2.svg',
      title: 'DRIZZLE MORE, MESS LESS',
      desc: 'No sticky spoons, messy jars or peanut butter all over your kitchen.',
    },
    {
      icon: '/assets/images/image_11_Vectorized_f4cc9344-3c26-419e-86a0-e598718196ff.svg',
      title: 'FUEL FOR YOUR DAY',
      desc: '7g protein per serving. Perfect for your oats, bowls, smoothies and snacks.',
    },
    {
      icon: '/assets/images/Group_2.svg',
      title: '100% NATURAL, 0% JUNK',
      desc: 'Just clean ingredients that taste better because they are better.',
    },
    {
      icon: '/assets/images/image_11_Vectorized.svg',
      title: 'NO MORE SNACK REGRET',
      desc: 'Our American peanuts are a good source of protein, fiber and healthy fats.',
    },
  ];

  return (
    <div id="shopify-section-image-with-text" className="shopify-section">
      <section className={styles.section} aria-label="Why Squizyy">
        <div className={styles.container}>
          {/* Left: Image with Overlaid Slogan Badge */}
          <div className={styles.imageCol}>
            <div className={styles.imageFrame}>
              <img
                src="/assets/images/drizzy-1.jpg"
                alt="Drizzy squeezy bottle in action"
                className={styles.mainImage}
                loading="lazy"
              />
            </div>

            {/* Overlaid rotated slogan */}
            <div className={styles.sloganBadge}>
              <img
                src="/assets/images/Slogan_60f4524c-8b90-43e6-aad4-c9bbd67f0367.png"
                alt="Drizzy Slogan Badge"
                className={styles.sloganImg}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Feature Content */}
          <div className={styles.contentCol}>
            <div className={styles.contentWrapper}>
              <h2 className={styles.heading}>
                Peanut Butter Needed This
              </h2>

              <div className={styles.featuresList}>
                {features.map((feature, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <div className={styles.featureIconBox}>
                      <img
                        src={feature.icon}
                        alt=""
                        aria-hidden="true"
                        className={styles.featureIcon}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.featureTextCol}>
                      <h3 className={styles.featureTitle}>
                        {feature.title}
                      </h3>
                      <p className={styles.featureDesc}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className={styles.ctaBox}>
                <Link
                  to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                  className={styles.ctaButton}
                >
                  BUY DRIZZY PEANUT BUTTER NOW
                </Link>
                <p className={styles.shippingNote}>
                  FREE SHIPPING ON ORDERS $49.99+
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesGrid;
