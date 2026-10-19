import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FullPageMedia.module.css';

const FullPageMedia = () => {
  return (
    <div id="shopify-section-full-page-media" className="shopify-section">
      <section className={styles.section} aria-label="Texas Sourcing Story">
        <div className={styles.mediaFrame}>
          {/* Background Media */}
          <video
            playsInline
            muted
            autoPlay
            loop
            className={styles.bgVideo}
            poster="/assets/images/f8c9f00eee0542fe9b97a3f8467190b6.thumbnail.0000000000_1.jpg"
          >
            <source
              src="https://getdrizzy.co/cdn/shop/videos/c/vp/f8c9f00eee0542fe9b97a3f8467190b6/f8c9f00eee0542fe9b97a3f8467190b6.HD-1080p-4.8Mbps-91858336.mp4"
              type="video/mp4"
            />
            <img
              src="/assets/images/f8c9f00eee0542fe9b97a3f8467190b6.thumbnail.0000000000_1.jpg"
              alt="Drizzy Texas Peanut Harvesting"
              className={styles.bgVideo}
            />
          </video>

          {/* Overlaid Quality Story Card */}
          <div className={styles.overlayContainer}>
            <div className={styles.storyCardWrapper}>
              <div className={styles.storyCard}>
                <h3 className={styles.heading}>
                  Made by People Who Take Quality Very Seriously
                </h3>

                <p className={styles.paragraph}>
                  We source exclusively from Texas for a deeper roast and a smoother drizzle you won't find in supermarket jars.
                </p>

                <h4 className={styles.subheading}>
                  Using the 'Runner' Peanut
                </h4>

                <p className={styles.paragraph}>
                  Known for its high oil content and rich flavor, it's the secret to our ultra-smooth, no-clog drizzle.
                </p>

                <div className={styles.dashedDivider}>
                  SOURCED FROM TEXAS
                </div>

                <div className={styles.dashedDivider}>
                  NEXT HARVESTING SEASON STARTING OCTOBER 2026
                </div>

                <Link
                  to="/pages/our-story"
                  className={styles.ctaLink}
                >
                  LEARN MORE ABOUT DRIZZY
                </Link>
              </div>

              {/* Floating peanut graphic */}
              <div className={styles.peanutSticker}>
                <img
                  src="/assets/images/drizzy-peanut-left.png"
                  alt="Drizzy Peanut"
                  className={styles.peanutImg}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullPageMedia;
