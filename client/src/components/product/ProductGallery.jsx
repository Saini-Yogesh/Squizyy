import React, { useState } from 'react';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images = [], mode = 'compact' }) => {
  const [activeImage, setActiveImage] = useState(0);

  const defaultImages = [
    '/assets/images/USASQUIZYYFRONTcopy.jpg',
    '/assets/images/SQUIZYY12302.jpg',
    '/assets/images/SQUIZYY13034.jpg',
    '/assets/images/SQUIZYY13132.jpg',
    '/assets/images/SQUIZYY12496.jpg',
    '/assets/images/SQUIZYY12791.jpg',
    '/assets/images/SQUIZYY12951.jpg',
    '/assets/images/SQUIZYY12237.jpg',
    '/assets/images/USASQUIZYYBACKcopy.jpg',
    '/assets/images/USASQUIZYYGOODcopy.jpg',
    '/assets/images/USASQUIZYYHOWTOcopy.jpg',
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
              alt="Squizyy Squeezy Peanut Butter"
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
                  alt={`Squizyy view ${idx + 2}`}
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
              alt="Squizyy Squeezy Peanut Butter"
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
              alt="Squizyy Squeezy Peanut Butter"
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
