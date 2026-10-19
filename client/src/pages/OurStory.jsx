import React, { useState } from 'react';
import styles from './OurStory.module.css';

const OurStory = () => {
  const [activeLocation, setActiveLocation] = useState('queensland');
  const [openPopup, setOpenPopup] = useState(null);

  const handleLocationClick = (loc) => {
    setActiveLocation(loc);
    setOpenPopup(loc);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Story Hero (Map with Flight Path) */}
      <div id="shopify-section-story-hero" className="shopify-section">
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroHeading}>
              From the Heart of Australia to the Home of Peanut Butter
            </h1>

            {/* Map TV Stage */}
            <div className={styles.tvStage}>
              {/* Map Image */}
              <div className={styles.mapImgWrapper}>
                <img
                  src="/assets/images/map-v2.png"
                  alt="World map connecting Australia and America"
                  className={styles.mapImg}
                />
              </div>

              {/* Story TV Frame overlay */}
              <div className={styles.tvFrameWrapper}>
                <img
                  src="/assets/images/story-tv.png"
                  alt=""
                  aria-hidden="true"
                  className={styles.tvFrameImg}
                />
              </div>

              {/* Arc flight line */}
              <div className={styles.arcLineWrapper}>
                <svg
                  className={styles.arcSvg}
                  viewBox="0 0 552 274"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <circle cx="5.5114" cy="268.488" r="5.0114" fill="#2D0F28" stroke="#F8EBD7" />
                  <circle cx="546.183" cy="5.5114" r="5.0114" fill="#2D0F28" stroke="#F8EBD7" />
                  <path
                    d="M10.4883 264.277C163.441 92.9625 273.225 29.1044 535.954 4.85938"
                    stroke="#2D0F28"
                    strokeWidth="4"
                    strokeDasharray="16 16"
                  />
                </svg>
              </div>

              {/* Queensland AUS Button */}
              <button
                type="button"
                onClick={() => handleLocationClick('queensland')}
                className={`${styles.locationBtn} ${styles.btnQueensland} ${
                  activeLocation === 'queensland'
                    ? styles.locationBtnActive
                    : styles.locationBtnInactive
                }`}
              >
                Queensland, AUS
              </button>

              {/* Texas USA Button */}
              <button
                type="button"
                onClick={() => handleLocationClick('texas')}
                className={`${styles.locationBtn} ${styles.btnTexas} ${
                  activeLocation === 'texas'
                    ? styles.locationBtnActive
                    : styles.locationBtnInactive
                }`}
              >
                Texas, USA
              </button>

              {/* Decorative badge right */}
              <div className={styles.badgeRight}>
                <img
                  src="/assets/images/badge-right-story.png"
                  alt=""
                  aria-hidden="true"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Peanut mascot bottom right */}
              <div className={styles.mascotRight}>
                <img
                  src="/assets/images/peanut-man.png"
                  alt=""
                  aria-hidden="true"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>

          {/* Location Popups */}
          {openPopup && (
            <div
              className={styles.modalOverlay}
              role="dialog"
              aria-modal="true"
            >
              <div
                className={styles.modalBackdrop}
                onClick={() => setOpenPopup(null)}
              />
              <div className={styles.modalContent}>
                <button
                  type="button"
                  onClick={() => setOpenPopup(null)}
                  className={styles.modalCloseBtn}
                  aria-label="Close dialog"
                >
                  ✕
                </button>

                <div className={styles.modalBody}>
                  <div className={styles.modalTextCol}>
                    <h2 className={styles.modalTitle}>
                      {openPopup === 'queensland' ? 'Queensland, AUS' : 'Texas, USA'}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {openPopup === 'queensland' ? (
                        <p className={styles.modalParagraph}>
                          From a small peanut farm in Queensland to kitchens across Australia, this is where Drizzy was born—and where our story first took root.
                        </p>
                      ) : (
                        <p className={styles.modalParagraph}>
                          Home of the legendary Runner Peanuts. We spent months finding the perfect American counterpart to our Kingaroy roots, crafting 100% roasted perfection in the Lone Star State.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.modalImgCol}>
                    <img
                      src={
                        openPopup === 'queensland'
                          ? '/assets/images/timeline-1.jpg'
                          : '/assets/images/timeline-2.png'
                      }
                      alt="Location snapshot"
                      className={styles.modalImg}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* 2. Story Image with Text (Two Aussie Peanut Butter Obsessors) */}
      <div id="shopify-section-story-image-with-text" className="shopify-section">
        <section className={styles.foundersSection}>
          <div className={styles.foundersContainer}>
            {/* Left Image */}
            <div className={styles.foundersImgFrame}>
              <img
                src="/assets/images/our-story.png"
                alt="Our Founders & Story"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Right Story Card */}
            <div className={styles.foundersStoryCard}>
              <p className={styles.missionTag}>
                Two Aussie peanut butter obsessors, one mission:
              </p>
              <h2 className={styles.foundersHeading}>
                To bring the world's smoothest drizzle from the heart of Queensland to the home of peanut butter.
              </h2>
              <p className={styles.foundersBody}>
                After one too many mornings scraping peanut butter out of a jar, we reached for the honey and asked ourselves one simple question: "Why doesn't peanut butter squeeze too?". Turns out a lot of people agreed with us!
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Story Timeline (Same Soul, New Soil) */}
      <div id="shopify-section-story-timeline" className="shopify-section">
        <section className={styles.timelineSection}>
          <div className={styles.timelineParent}>
            {/* Drip Graphics */}
            <div style={{ width: '100%' }}>
              <img
                src="/assets/images/timeline-drip.svg"
                alt=""
                aria-hidden="true"
                style={{ width: '100%', display: 'block' }}
              />
            </div>

            <div className={styles.timelineContent}>
              <h2 className={styles.timelineHeading}>
                Same Soul, New Soil
              </h2>

              <div className={styles.timelineList}>
                {/* Step 1: The Australian Way */}
                <div className={styles.timelineRow}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src="/assets/images/timeline-1.jpg"
                      alt="The Australian Way"
                      className={styles.timelineImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.timelineText}>
                    <div className={styles.timelineTitleGroup}>
                      <img src="/assets/images/mascot-cream.svg" alt="" aria-hidden="true" style={{ width: '2rem', height: '2rem' }} />
                      <h3 className={styles.timelineTitle}>
                        THE AUSTRALIAN WAY
                      </h3>
                    </div>
                    <p className={styles.timelineParagraph}>
                      We brought the good stuff with us. Our Aussie know-how. Our ridiculously smooth drizzle. And our refusal to put weird stuff in peanut butter.
                    </p>
                    <p className={styles.timelineParagraph}>
                      Now made in America with American-grown peanuts. No palm oil. No stabilizers. No added sugar. Just peanuts doing peanut things.
                    </p>
                  </div>
                </div>

                {/* Step 2: The American Way */}
                <div className={styles.timelineRow}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src="/assets/images/timeline-2.png"
                      alt="The American Way"
                      className={styles.timelineImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.timelineText}>
                    <div className={styles.timelineTitleGroup}>
                      <h3 className={styles.timelineTitle}>
                        THE AMERICAN WAY
                      </h3>
                      <img src="/assets/images/peanut-tiny.png" alt="" aria-hidden="true" style={{ width: '1.5rem', height: '1.5rem' }} />
                    </div>
                    <p className={styles.timelineParagraph}>
                      You guys know peanuts. We know drizzle. So we took American-grown peanuts and gave them the Drizzy treatment.
                    </p>
                    <p className={styles.timelineParagraph}>
                      America is the home of peanut butter, after all. We spent months finding the perfect American counterpart to our Kingaroy roots.
                    </p>
                  </div>
                </div>

                {/* Step 3: Well, That Escalated Quickly */}
                <div className={styles.timelineRow}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src="/assets/images/timeline-3.jpg"
                      alt="Well, That Escalated Quickly"
                      className={styles.timelineImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.timelineText}>
                    <div className={styles.timelineTitleGroup}>
                      <img src="/assets/images/mascot-cream.svg" alt="" aria-hidden="true" style={{ width: '2rem', height: '2rem' }} />
                      <h3 className={styles.timelineTitle}>
                        WELL, THAT ESCALATED QUICKLY
                      </h3>
                    </div>
                    <p className={styles.timelineParagraph}>
                      A few months after launching in Australia, we packed our bags, packed the Drizzy and moved to America.
                    </p>
                    <p className={styles.timelineParagraph}>
                      Now our little Aussie peanut butter brand is hitting shelves in nearly 500 stores across the USA at Sprouts. Yeah. We're still processing it too.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurStory;
