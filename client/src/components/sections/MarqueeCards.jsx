import React from 'react';
import { Link } from 'react-router-dom';

const MarqueeCards = () => {
  return (
    <div id="shopify-section-template--22221105463467__marquee_cards_mMYQLW" className="shopify-section">
      <section
        className="marquee-cards bg-background bg-gradient text-foreground color-scheme-1 py-12 lg:py-16 overflow-hidden"
        style={{
          '--spacing-top': '3.75rem',
          '--spacing-bottom': '3.75rem',
          '--spacing-top-mobile': '2.5rem',
          '--spacing-bottom-mobile': '2.5rem',
        }}
      >
        <div className="flex flex-col gap-8 lg:gap-[60px] max-w-7xl mx-auto px-4">
          <div className="container flex flex-col items-center gap-4 text-center mx-auto">
            {/* Mascot & Peanut Tiny Header Icons */}
            <div className="flex items-center justify-center gap-3 lg:gap-10">
              {/* Mobile icon */}
              <div className="h-8 w-8 flex-shrink-0 lg:hidden">
                <img
                  src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                  alt="drizzy mascot"
                  width="80"
                  height="111"
                  className="aspect-auto w-full object-contain h-full"
                />
              </div>

              {/* Desktop alternating row left */}
              <div className="hidden lg:flex items-center gap-10 flex-shrink-0">
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                    alt="drizzy mascot"
                    width="80"
                    height="111"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                    alt="drizzy peanut"
                    width="80"
                    height="73"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                    alt="drizzy mascot"
                    width="80"
                    height="111"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                    alt="drizzy peanut"
                    width="80"
                    height="73"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                    alt="drizzy mascot"
                    width="80"
                    height="111"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-heading4 lg:text-heading1 leading-[100%] text-foreground uppercase whitespace-nowrap">
                Life's Better With Drizzy
              </h3>

              {/* Desktop alternating row right */}
              <div className="hidden lg:flex items-center gap-10 flex-shrink-0">
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                    alt="drizzy mascot"
                    width="80"
                    height="111"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                    alt="drizzy peanut"
                    width="80"
                    height="73"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                    alt="drizzy mascot"
                    width="80"
                    height="111"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                    alt="drizzy peanut"
                    width="80"
                    height="73"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
                <div className="h-9 w-9 flex-shrink-0">
                  <img
                    src="/assets/images/mascot-tiny_aecd74eb-a0fc-47ff-bf37-7ce347d869a5.svg"
                    alt="drizzy mascot"
                    width="80"
                    height="111"
                    className="aspect-auto w-full object-contain h-full"
                  />
                </div>
              </div>

              {/* Mobile icon right */}
              <div className="h-8 w-8 flex-shrink-0 lg:hidden">
                <img
                  src="/assets/images/peanut-tiny_4d50f3b6-6cfe-4e9e-8328-52d5470a73a6.png"
                  alt="drizzy peanut"
                  width="80"
                  height="73"
                  className="aspect-auto w-full object-contain h-full"
                />
              </div>
            </div>

            <p className="text-body4 lg:text-body3 max-w-2xl text-foreground/80 mt-2">
              Adding joy to your day so that you actually get the most out of a healthy, age-old pantry staple loved by all.
            </p>
          </div>

          <div className="container flex justify-center mx-auto">
            <Link
              to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
              className="inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit focus-visible:outline-none text-[16px] lg:text-[20px] font-primary leading-[100%] py-4 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary shadow-md"
            >
              BUY DRIZZY PEANUT BUTTER NOW
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarqueeCards;
