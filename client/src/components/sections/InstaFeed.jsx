import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './InstaFeed.module.css';

const reels = [
  {
    id: '1',
    img: '/assets/images/timeline-3.jpg',
    badge: null,
    caption: 'ME! 🇦🇺 Five m...',
    link: 'https://instagram.com/getdrizzy',
  },
  {
    id: '2',
    img: '/assets/images/7197cdc3c5194c39804a834f7b97aebd.thumbnail.0000000000.jpg',
    badge: null,
    caption: '"Go where the wind takes you"\nMe:',
    link: 'https://instagram.com/getdrizzy',
  },
  {
    id: '3',
    img: '/assets/images/DRIZZY13132.jpg',
    badge: null,
    caption: null,
    link: 'https://instagram.com/getdrizzy',
  },
  {
    id: '4',
    img: '/assets/images/insta-post-1.png',
    badge: null,
    caption: 'Come with us to watch Drizzy launch',
    link: 'https://instagram.com/getdrizzy',
  },
  {
    id: '5',
    img: '/assets/images/insta-post-2.png',
    badge: 'Yo-Chi Frozen Yogurt',
    caption: null,
    link: 'https://instagram.com/getdrizzy',
  },
  {
    id: '6',
    img: '/assets/images/insta-post-3.png',
    badge: null,
    caption: null,
    link: 'https://instagram.com/getdrizzy',
  },
  {
    id: '7',
    img: '/assets/images/insta-post-4.png',
    badge: null,
    caption: null,
    link: 'https://instagram.com/getdrizzy',
  },
];

const InstaFeed = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div id="shopify-section-instagram-feed" className="shopify-section">
      <section className={styles.feedSection} aria-label="Instagram Community Feed">
        <div className={styles.container}>
          {/* Section Header */}
          <div className={styles.header}>
            <h2 className={styles.heading}>
              Follow @getdrizzy
            </h2>
          </div>

          {/* Carousel Slider Container */}
          <div className={styles.carouselContainer}>
            {/* Left Scroll Button */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scroll('left')}
                className={`${styles.navButton} ${styles.navButtonLeft}`}
                aria-label="Scroll left in Instagram feed"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
            )}

            {/* Right Scroll Button */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scroll('right')}
                className={`${styles.navButton} ${styles.navButtonRight}`}
                aria-label="Scroll right in Instagram feed"
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </button>
            )}

            {/* Scrollable Reel Cards */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className={styles.track}
            >
              {reels.map((reel) => (
                <a
                  key={reel.id}
                  href={reel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.reelCard}
                  aria-label={reel.caption || 'Drizzy Instagram reel'}
                >
                  <img
                    src={reel.img}
                    alt={reel.caption || 'Drizzy Instagram post'}
                    className={styles.reelImage}
                    loading="lazy"
                  />

                  {reel.caption && (
                    <div className={styles.gradientOverlay} />
                  )}

                  {reel.badge && (
                    <div className={styles.badge}>
                      <span aria-hidden="true">📍</span>
                      <span>{reel.badge}</span>
                    </div>
                  )}

                  {reel.caption && (
                    <p className={styles.caption}>
                      {reel.caption}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstaFeed;
