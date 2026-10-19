import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { getReviews } from '../../services/api';
import styles from './ReviewCarousel.module.css';

const ReviewCarousel = ({ productSlug }) => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getReviews(productSlug)
      .then(data => {
        if (data && data.length > 0) setReviews(data);
      })
      .catch(err => console.warn('Could not load reviews:', err));
  }, [productSlug]);

  if (!reviews.length) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className={styles.section} aria-label="Customer Reviews">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.starsRow} aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} className={styles.starIcon} />
            ))}
          </div>
          <h2 className={styles.title}>
            Loved by 1,000+ Aussies & Americans
          </h2>
          <p className={styles.subtitle}>
            4.9 / 5.0 Average Customer Rating Across 1,000+ Verified Buyers
          </p>
        </div>

        {/* Carousel Container */}
        <div className={styles.carousel}>
          <div className={styles.viewport}>
            <div 
              className={styles.track}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((rev, idx) => (
                <div key={idx} className={styles.slide}>
                  <div className={styles.card}>
                    <div>
                      <div className={styles.cardStars}>
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={18} className={styles.starIcon} />
                        ))}
                      </div>
                      <h3 className={styles.reviewTitle}>
                        "{rev.title}"
                      </h3>
                      <p className={styles.reviewContent}>
                        "{rev.content}"
                      </p>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.authorArea}>
                        <span className={styles.authorName}>{rev.author}</span>
                        {rev.verified && (
                          <span className={styles.verifiedBadge}>
                            <CheckCircle size={12} /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className={styles.location}>{rev.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav Controls */}
          {reviews.length > 1 && (
            <div className={styles.controls}>
              <button
                type="button"
                onClick={prevSlide}
                className={styles.arrowBtn}
                aria-label="Previous review"
              >
                <ChevronLeft size={22} />
              </button>
              <div className={styles.counter}>
                <span className={styles.counterCurrent}>{currentIndex + 1}</span>
                <span className={styles.counterDivider}>/</span>
                <span>{reviews.length}</span>
              </div>
              <button
                type="button"
                onClick={nextSlide}
                className={styles.arrowBtn}
                aria-label="Next review"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
