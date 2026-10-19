import React, { useState } from 'react';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images = [], mode = 'compact' }) => {
  const [activeImage, setActiveImage] = useState(0);

  const defaultImages = [
    '/assets/images/USADRIZZYFRONTcopy.jpg',
    '/assets/images/DRIZZY12302.jpg',
    '/assets/images/DRIZZY13034.jpg',
    '/assets/images/DRIZZY13132.jpg',
    '/assets/images/DRIZZY12496.jpg',
    '/assets/images/DRIZZY12791.jpg',
    '/assets/images/DRIZZY12951.jpg',
    '/assets/images/DRIZZY12237.jpg',
    '/assets/images/USADRIZZYBACKcopy.jpg',
    '/assets/images/USADRIZZYGOODcopy.jpg',
    '/assets/images/USADRIZZYHOWTOcopy.jpg',
  ];

  const galleryImages = images && images.length > 0 ? images : defaultImages;

  // PDP 2-Column Grid Mode
  if (mode === 'pdp') {
    return (
      <div className={styles.pdpWrapper}>
        {/* Desktop Layout: Large Hero + 2-Column Grid */}
        <div className={styles.pdpDesktopGrid}>
          {/* Main Top Feature Card */}
          <div className={styles.pdpMainHero}>
            <img
              src={galleryImages[0]}
              alt="Drizzy Squeezy Peanut Butter"
              className={styles.pdpMainHeroImg}
              loading="eager"
            />
          </div>

          {/* 2-Column Square Grid for all subsequent photos */}
          <div className={styles.pdpSubGrid}>
            {galleryImages.slice(1).map((img, idx) => (
              <div
                key={idx}
                className={styles.pdpSubCard}
              >
                <img
                  src={img}
                  alt={`Drizzy view ${idx + 2}`}
                  className={styles.pdpSubCardImg}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout: Large Top Card + Horizontal Thumbnail Strip */}
        <div className={styles.pdpMobileView}>
          <div className={styles.pdpMobileHero}>
            <img
              src={galleryImages[activeImage] || galleryImages[0]}
              alt="Drizzy Squeezy Peanut Butter"
              className={styles.pdpMobileHeroImg}
              loading="eager"
            />
          </div>

          {/* Scrollable Thumbnails Strip */}
          <div className={styles.pdpMobileStrip}>
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`${styles.pdpThumbBtn} ${
                  activeImage === idx ? styles.pdpThumbActive : styles.pdpThumbInactive
                }`}
                aria-label={`Thumbnail ${idx + 1}`}
              >
                <img
                  src={img}
                  alt=""
                  className={styles.pdpThumbImg}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Compact Mode (Used on Home Page Feature Section)
  return (
    <div className={styles.compactWrapper}>
      <div className={styles.compactInner}>
        <div className={styles.compactContent}>
          {/* Thumbnails strip (left side on desktop, bottom on mobile) */}
          <div className={styles.compactStrip}>
            {galleryImages.slice(0, 5).map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`${styles.pdpThumbBtn} ${
                  activeImage === idx ? styles.pdpThumbActive : styles.pdpThumbInactive
                }`}
                aria-label={`Thumbnail ${idx + 1}`}
              >
                <img
                  src={img}
                  alt=""
                  className={styles.pdpThumbImg}
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Active Image Card */}
          <div className={styles.compactMainCard}>
            <img
              src={galleryImages[activeImage] || galleryImages[0]}
              alt="Drizzy Squeezy Peanut Butter"
              className={styles.compactMainImg}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
