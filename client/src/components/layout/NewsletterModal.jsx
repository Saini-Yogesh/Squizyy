import React, { useState, useEffect } from 'react';
import { subscribeNewsletter } from '../../services/api';
import { validateEmail } from '../../utils/validation';
import styles from './NewsletterModal.module.css';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  useEffect(() => {
    // Automatically open once per session after 2.5 seconds if not closed yet
    const hasSeen = sessionStorage.getItem('drizzy_popup_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('drizzy_popup_seen', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    setStatus({ loading: true, success: false, message: '' });
    try {
      await subscribeNewsletter(email, 'retro_tv_popup_10');
      setStatus({ loading: false, success: true, message: 'USE CODE: SQUEEZE10 FOR 10% OFF!' });
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch {
      setStatus({ loading: false, success: true, message: 'USE CODE: SQUEEZE10 FOR 10% OFF!' });
      setTimeout(() => {
        handleClose();
      }, 2500);
    }
  };

  return (
    <>
      {/* 1. Persistent Fixed Bottom-Left Badge */}
      <div className={styles.launcher}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={styles.launcherBtn}
          aria-label="Get 10% Off"
        >
          Get 10% Off
        </button>
      </div>

      {/* 2. Retro TV Popup Modal */}
      {isOpen && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="Get 10% Off Promotion"
        >
          {/* Backdrop dismiss */}
          <div className={styles.backdropDismiss} onClick={handleClose} />

          {/* Modal TV Stage */}
          <div className={styles.modalContent}>
            {/* Top Bottle Peeking out behind TV */}
            <div className={styles.peekingBottle}>
              <img
                src="/assets/images/USADRIZZYFRONTcopy.jpg"
                alt="Drizzy Bottle"
                className={styles.bottleImg}
              />
            </div>

            {/* TV Frame Container */}
            <div className={styles.tvFrame}>
              {/* Close Button on top-right */}
              <button
                type="button"
                onClick={handleClose}
                className={styles.closeButton}
                aria-label="Close dialog"
              >
                ✕
              </button>

              {/* TV Screen Cutout Area */}
              <div className={styles.screenCutout}>
                {/* Vintage Scanline overlay */}
                <div className={styles.scanlines} />

                {status.success ? (
                  <div className={styles.successBox}>
                    <div className={styles.successEmoji}>🎉</div>
                    <h3 className={styles.successTitle}>
                      You're In!
                    </h3>
                    <p className={styles.successMsg}>
                      {status.message}
                    </p>
                    <p className={styles.finePrint}>
                      Copy code at checkout to save 10%.
                    </p>
                  </div>
                ) : (
                  <div className={styles.formBox}>
                    <h2 className={styles.screenTitle}>
                      GET 10% OFF YOUR FIRST SQUEEZE
                    </h2>
                    
                    <p className={styles.screenSubtitle}>
                      Join for new drops, exclusive deals and dangerously good peanut butter content.
                    </p>

                    <form onSubmit={handleSubmit} className={styles.screenForm}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className={styles.screenInput}
                        aria-label="Email Address"
                      />
                      <button
                        type="submit"
                        disabled={status.loading}
                        className={styles.screenSubmit}
                      >
                        {status.loading ? 'Joining...' : 'Give me 10% off!'}
                      </button>
                    </form>

                    <button
                      type="button"
                      onClick={handleClose}
                      className={styles.dismissBtn}
                    >
                      NOT RIGHT NOW
                    </button>

                    <p className={styles.finePrint}>
                      Get 10% off on your first order. By subscribing you agree to receive marketing communications.
                    </p>
                  </div>
                )}
              </div>

              {/* Vintage TV Graphic Frame Overlay */}
              <div className={styles.tvGraphicOverlay}>
                <img
                  src="/assets/images/story-tv.png"
                  alt=""
                  className={styles.tvGraphicImg}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterModal;
