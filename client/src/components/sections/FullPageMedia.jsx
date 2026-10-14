import React from 'react';
import { Link } from 'react-router-dom';

const FullPageMedia = () => {
  return (
    <div id="shopify-section-template--22221105463467__full_page_media_QVigQN" className="shopify-section">
      <section
        className="bg-background text-foreground color-scheme-1 pb-10 pt-10 lg:pb-6 lg:pt-6 px-4"
        style={{
          '--spacing-top': '1.5rem',
          '--spacing-bottom': '1.5rem',
          '--spacing-top-mobile': '2.5rem',
          '--spacing-bottom-mobile': '2.5rem',
          '--height-sm': '62.5rem',
          '--height-lg': '85svh',
        }}
      >
        <div className="w-full rounded-3xl lg:rounded-[40px] overflow-hidden">
          <div className="relative overflow-hidden w-full h-[62.5rem] lg:h-[85svh]">
            {/* Background Media */}
            <video
              playsInline
              muted
              autoPlay
              loop
              className="aspect-auto w-full object-cover h-full w-full !min-h-[62.5rem] lg:!min-h-[85svh]"
              poster="/assets/images/f8c9f00eee0542fe9b97a3f8467190b6.thumbnail.0000000000_1.jpg"
            >
              <source
                src="https://getdrizzy.co/cdn/shop/videos/c/vp/f8c9f00eee0542fe9b97a3f8467190b6/f8c9f00eee0542fe9b97a3f8467190b6.HD-1080p-4.8Mbps-91858336.mp4"
                type="video/mp4"
              />
              <img
                src="/assets/images/f8c9f00eee0542fe9b97a3f8467190b6.thumbnail.0000000000_1.jpg"
                alt="drizzy texas"
                className="aspect-auto w-full object-cover h-full w-full"
              />
            </video>

            {/* Overlaid Quality Story Card */}
            <div className="absolute inset-0 z-[2] flex items-end lg:items-center px-4 lg:px-[60px] py-6 lg:py-10">
              <div className="relative w-full max-w-md lg:max-w-xl">
                <div className="bg-cream rounded-[32px] px-6 py-8 lg:px-10 lg:py-10 border-2 border-dark-brown space-y-4 shadow-xl text-dark-brown">
                  <h3 className="font-champ text-dark-brown text-[28px] sm:text-[34px] lg:text-[40px] leading-[105%] uppercase">
                    Made by People Who Take Quality Very Seriously
                  </h3>

                  <div className="font-mono text-xs sm:text-sm text-dark-brown/90 leading-relaxed">
                    <p>
                      We source exclusively from Texas for a deeper roast and a smoother drizzle you won't find in supermarket jars.
                    </p>
                  </div>

                  <p className="text-[15px] sm:text-[17px] font-champ uppercase text-dark-brown pt-1">
                    Using the 'Runner' Peanut
                  </p>

                  <div className="font-mono text-xs sm:text-sm text-dark-brown/90 leading-relaxed">
                    <p>
                      Known for its high oil content and rich flavor, it’s the secret to our ultra-smooth, no-clog drizzle.
                    </p>
                  </div>

                  <div className="border-t border-dashed border-dark-brown/40 pt-4 text-xs font-mono uppercase !mt-5 text-dark-brown font-bold tracking-wider">
                    SOURCED FROM TEXAS
                  </div>

                  <div className="border-t border-dashed border-dark-brown/40 pt-4 text-xs font-mono uppercase text-dark-brown font-bold tracking-wider">
                    NEXT HARVESTING SEASON STARTING OCTOBER 2026
                  </div>

                  <Link
                    to="/pages/our-story"
                    className="inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit focus-visible:outline-none text-[15px] sm:text-[17px] font-champ leading-[100%] py-3.5 px-7 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary !mt-6 shadow-sm"
                  >
                    LEARN MORE ABOUT DRIZZY
                  </Link>
                </div>

                {/* Floating peanut graphic */}
                <div className="absolute aspect-square w-[100px] lg:w-[140px] top-[-90px] lg:top-auto lg:bottom-[20%] lg:right-[-15%] pointer-events-none drop-shadow-xl">
                  <img
                    src="/assets/images/drizzy-peanut-left.png"
                    alt="Sticker"
                    className="aspect-auto w-full object-cover w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullPageMedia;
