import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductGallery from './ProductGallery';
import { getProductBySlug } from '../../services/api';
import styles from './FeaturedProductSection.module.css';

const FeaturedProductSection = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductBySlug('drizzy-squeezy-peanut-butter-19-4-oz')
      .then((data) => {
        if (data) setProduct(data);
      })
      .catch((err) => console.warn('Could not load featured product data:', err));
  }, []);

  return (
    <div className={styles.wrapper}>
      <section className={styles.section} aria-label="Featured Product">
        {/* Floating Peanuts Background Elements */}
        <div className={styles.floatingPeanut1} aria-hidden="true">
          <img
            src="/assets/images/drizzy-peanut-left.png"
            alt=""
            loading="lazy"
          />
        </div>

        <div className={styles.floatingPeanut2} aria-hidden="true">
          <img
            src="/assets/images/drizzy-peanut-left.png"
            alt=""
            loading="lazy"
          />
        </div>

        <div className={styles.floatingPeanut3} aria-hidden="true">
          <img
            src="/assets/images/peanut-small.png"
            alt=""
            loading="lazy"
          />
        </div>

        <div className={styles.floatingPeanut4} aria-hidden="true">
          <img
            src="/assets/images/peanut-small.png"
            alt=""
            loading="lazy"
          />
        </div>

        {/* Main Product Container */}
        <div className={styles.productContent}>
          <div className={styles.container}>
            <div className={styles.layoutRow}>
              {/* Left Column: Authentic Media Gallery */}
              <div className={styles.galleryColumn}>
                <ProductGallery images={product?.images} mode="compact" />
              </div>

              {/* Right Column: Authentic Buy Box */}
              <div className={styles.buyBoxColumn}>
                {/* 5-Star Aussie Reviews */}
                <div className={styles.reviewsRating}>
                  <div className={styles.starsRow} aria-label="5 stars rating">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className={styles.ratingText}>
                    5.0 Based on 984 Aussie Reviews
                  </span>
                </div>

                {/* Product Title & Serving Size */}
                <div className={styles.productTitleArea}>
                  <h2 className={styles.title}>
                    The Ultimate<br />Breakfast Power-Up
                  </h2>
                  <div className={styles.servingSize}>
                    19.4 oz (550g)
                  </div>
                </div>

                {/* Dotted Divider */}
                <div className={styles.dashedDivider} />

                {/* Price Display */}
                <div className={styles.priceDisplay}>
                  <span>$9.99</span>
                </div>

                {/* Dotted Divider */}
                <div className={styles.dashedDivider} />

                {/* 3 Authentic Feature Bullet Items with Checkmarks */}
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <div className={styles.checkIcon}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.75 10.75C0.75 6.036 0.75 3.679 2.214 2.214C3.68 0.75 6.036 0.75 10.75 0.75C15.464 0.75 17.821 0.75 19.285 2.214C20.75 3.68 20.75 6.036 20.75 10.75C20.75 15.464 20.75 17.821 19.285 19.285C17.822 20.75 15.464 20.75 10.75 20.75C6.036 20.75 3.679 20.75 2.214 19.285C0.75 17.822 0.75 15.464 0.75 10.75Z"
                          stroke="#F8EBD7"
                          strokeWidth="1.5"
                        />
                        <path d="M7.25 11.25L9.25 13.25L14.25 8.25" stroke="#F8EBD7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.featureText}>
                      Simply shake, squeeze and drizzle.
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <div className={styles.checkIcon}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.75 10.75C0.75 6.036 0.75 3.679 2.214 2.214C3.68 0.75 6.036 0.75 10.75 0.75C15.464 0.75 17.821 0.75 19.285 2.214C20.75 3.68 20.75 6.036 20.75 10.75C20.75 15.464 20.75 17.821 19.285 19.285C17.822 20.75 15.464 20.75 10.75 20.75C6.036 20.75 3.679 20.75 2.214 19.285C0.75 17.822 0.75 15.464 0.75 10.75Z"
                          stroke="#F8EBD7"
                          strokeWidth="1.5"
                        />
                        <path d="M7.25 11.25L9.25 13.25L14.25 8.25" stroke="#F8EBD7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.featureText}>
                      100% Pure American roasted peanuts with a splash of peanut oil. No palm oil, no junk.
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <div className={styles.checkIcon}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.75 10.75C0.75 6.036 0.75 3.679 2.214 2.214C3.68 0.75 6.036 0.75 10.75 0.75C15.464 0.75 17.821 0.75 19.285 2.214C20.75 3.68 20.75 6.036 20.75 10.75C20.75 15.464 20.75 17.821 19.285 19.285C17.822 20.75 15.464 20.75 10.75 20.75C6.036 20.75 3.679 20.75 2.214 19.285C0.75 17.822 0.75 15.464 0.75 10.75Z"
                          stroke="#F8EBD7"
                          strokeWidth="1.5"
                        />
                        <path d="M7.25 11.25L9.25 13.25L14.25 8.25" stroke="#F8EBD7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.featureText}>
                      7g of protein per serve for everything you love and anything you crave.
                    </div>
                  </div>
                </div>

                {/* Add to Cart / Buy Now Action Button */}
                <Link
                  to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                  className={`button-primary ${styles.ctaLink}`}
                >
                  BUY DRIZZY PEANUT BUTTER NOW
                </Link>

                {/* Free Shipping Subtext */}
                <div className={styles.shippingNote}>
                  FREE SHIPPING ON ORDERS $49.99+
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProductSection;
