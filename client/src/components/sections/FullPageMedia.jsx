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
                <div className="bg-background rounded-3xl lg:rounded-[32px] px-5 py-8 lg:px-8 lg:py-10 border-4 border-b-8 border-foreground space-y-4 shadow-2xl">
                  <h3 className="text-heading5 lg:text-heading3 text-foreground">
                    Made by People Who Take Quality Very Seriously
                  </h3>

                  <div className="text-body4 lg:text-body3 text-foreground">
                    <p>
                      We source exclusively from Texas for a deeper roast and a smoother drizzle you won't find in supermarket jars.
                    </p>
                  </div>

                  <p className="text-[14px] lg:text-[16px] font-primary leading-[100%] uppercase text-foreground pt-2">
                    Using the 'Runner' Peanut
                  </p>

                  <div className="text-body4 lg:text-body3 text-foreground">
                    <p>
                      Known for its high oil content and rich flavor, it’s the secret to our ultra-smooth, no-clog drizzle.
                    </p>
                  </div>

                  <div className="border-t border-dashed border-foreground pt-4 lg:pt-5 text-caption lg:text-body4 uppercase !mt-6 text-foreground font-bold">
                    SOURCED from Texas
                  </div>

                  <div className="border-t border-dashed border-foreground pt-4 lg:pt-5 text-caption lg:text-body4 uppercase text-foreground font-bold">
                    NEXT HARVESTING SEASON Starting October 2026
                  </div>

                  <Link
                    to="/pages/our-story"
                    className="inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit focus-visible:outline-none text-[16px] lg:text-[20px] font-primary leading-[100%] py-4 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary !mt-6"
                  >
                    Learn more about Drizzy
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
