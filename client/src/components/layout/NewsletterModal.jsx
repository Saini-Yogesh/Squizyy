import React, { useState, useEffect } from 'react';
import { subscribeNewsletter } from '../../services/api';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  useEffect(() => {
    // Automatically open once per session after 3 seconds if not closed yet
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
    if (!email || !email.includes('@')) return;
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
      <div className="fixed bottom-0 left-4 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-white hover:bg-cream text-dark-brown border-2 border-b-0 border-dark-brown font-mono font-bold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-t-lg shadow-lg cursor-pointer transition-transform hover:-translate-y-0.5"
          style={{ letterSpacing: '0.02em' }}
          aria-label="Get 10% Off"
        >
          Get 10% Off
        </button>
      </div>

      {/* 2. Retro TV Popup Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop dismiss */}
          <div className="absolute inset-0" onClick={handleClose} />

          {/* Modal TV Stage */}
          <div className="relative z-10 w-full max-w-[580px] sm:max-w-[640px] flex flex-col items-center">
            
            {/* Top Bottle Peeking out behind TV */}
            <div className="w-28 sm:w-36 -mb-10 sm:-mb-14 relative z-0 pointer-events-none drop-shadow-2xl">
              <img
                src="/assets/images/USADRIZZYFRONTcopy.jpg"
                alt="Drizzy Bottle"
                className="w-full h-auto object-contain rounded-full"
              />
            </div>

            {/* TV Frame Container */}
            <div className="relative w-full aspect-[1167/829] rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Close Button on top-right */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-dark-brown border-2 border-dark-brown flex items-center justify-center font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                ✕
              </button>

              {/* TV Screen Cutout Area */}
              <div
                className="absolute top-[6.5%] bottom-[9.9%] left-[1.5%] right-[22.5%] z-10 overflow-hidden rounded-[20px] sm:rounded-[28px] flex flex-col justify-center items-center p-4 sm:p-6 text-center text-cream shadow-inner"
                style={{
                  background: 'radial-gradient(ellipse at center, #6b2e1f 0%, #38120b 60%, #200806 100%)',
                }}
              >
                {/* Vintage Scanline / Vignette subtle overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 3px)',
                  }}
                />

                {status.success ? (
                  <div className="relative z-10 space-y-2 py-4 animate-scaleIn">
                    <div className="text-3xl sm:text-4xl">🎉</div>
                    <h3 className="font-champ text-xl sm:text-2xl uppercase text-accent-purple">
                      You're In!
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-cream font-bold">
                      {status.message}
                    </p>
                    <p className="font-mono text-[10px] text-cream/70">
                      Copy code at checkout to save 10%.
                    </p>
                  </div>
                ) : (
                  <div className="relative z-10 w-full max-w-[340px] flex flex-col items-center">
                    <h2 className="font-champ text-base sm:text-xl md:text-2xl uppercase tracking-tight text-cream leading-tight drop-shadow">
                      GET 10% OFF YOUR FIRST SQUEEZE
                    </h2>
                    
                    <p className="font-body text-[10px] sm:text-xs text-cream/90 mt-1.5 sm:mt-2 leading-tight drop-shadow">
                      Join for new drops, exclusive deals and dangerously good peanut butter content.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full mt-3 sm:mt-4 space-y-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="w-full bg-white border-2 border-dark-brown text-dark-brown font-mono text-xs px-3.5 py-2 sm:py-2.5 rounded-full placeholder:text-dark-brown/50 focus:outline-none focus:ring-2 focus:ring-accent-purple shadow-sm text-center"
                      />
                      <button
                        type="submit"
                        disabled={status.loading}
                        className="w-full bg-accent-purple hover:bg-[#b885e3] text-dark-brown border-2 border-dark-brown font-champ uppercase text-xs sm:text-sm py-2 sm:py-2.5 rounded-full transition-colors button-primary shadow-md cursor-pointer disabled:opacity-75"
                      >
                        {status.loading ? 'Joining...' : 'Give me 10% off!'}
                      </button>
                    </form>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-cream/80 hover:text-cream underline cursor-pointer"
                    >
                      NOT RIGHT NOW
                    </button>

                    <p className="mt-2 text-[8px] sm:text-[9px] font-mono text-cream/60 leading-tight">
                      Get 10% off on your first order. By subscribing you agree to receive marketing communications.
                    </p>
                  </div>
                )}
              </div>

              {/* Vintage TV Graphic Frame Overlay */}
              <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                <img
                  src="/assets/images/story-tv.png"
                  alt="Vintage TV frame"
                  className="w-full h-full object-cover"
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
