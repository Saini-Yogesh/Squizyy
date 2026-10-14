import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesGrid = () => {
  return (
    <div id="shopify-section-template--22221105463467__image_with_text_kAJNAP" className="shopify-section">
      <section
        className="grid items-center text-foreground bg-background color-scheme-1 py-10 lg:py-16"
        style={{
          '--spacing-top': '4.0rem',
          '--spacing-bottom': '4.0rem',
          '--spacing-top-mobile': '2.5rem',
          '--spacing-bottom-mobile': '2.5rem',
          '--height-sm': '28.125rem',
          '--height-lg': '51.25rem',
        }}
      >
        <div className="container px-4 lg:px-12 flex flex-col items-start justify-between w-full gap-10 lg:gap-[60px] lg:flex-row mx-auto max-w-[1408px]">
          {/* Left: Image with Overlaid Slogan Badge */}
          <div className="relative w-full lg:w-[48%] h-[28rem] sm:h-[34rem] lg:h-[48rem]">
            <div className="w-full h-full rounded-[32px] border-2 border-dark-brown overflow-hidden shadow-md">
              <img
                src="/assets/images/drizzy-1.jpg"
                alt="Drizzy USA"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Overlaid rotated slogan */}
            <div className="absolute w-[180px] sm:w-[210px] lg:w-[240px] rotate-[-14deg] bottom-6 -left-4 sm:-left-6 lg:-left-8 pointer-events-none drop-shadow-xl z-10">
              <img
                src="/assets/images/Slogan_60f4524c-8b90-43e6-aad4-c9bbd67f0367.png"
                alt="drizzy slogan"
                className="aspect-auto w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Feature Content */}
          <div className="w-full flex lg:w-[52%] min-h-full lg:min-h-[48rem] items-center">
            <div className="flex flex-col gap-6 lg:gap-8 items-start justify-center w-full">
              <h2 className="font-champ text-dark-brown text-[34px] sm:text-[44px] lg:text-[54px] leading-[105%] uppercase">
                Peanut Butter Needed This
              </h2>

              <div className="flex flex-col gap-6 w-full">
                {/* Feature 1 */}
                <div className="flex flex-row items-center gap-4 lg:gap-6">
                  <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14">
                    <img
                      src="/assets/images/image_11_Vectorized_-2.svg"
                      alt="DRIZZLE MORE, MESS LESS"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="text-[18px] sm:text-[22px] leading-[110%] font-champ uppercase text-dark-brown">
                      DRIZZLE MORE, MESS LESS
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-dark-brown/90 leading-relaxed">
                      <p>No sticky spoons, messy jars or peanut butter all over your kitchen.</p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-row items-center gap-4 lg:gap-6">
                  <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14">
                    <img
                      src="/assets/images/image_11_Vectorized_f4cc9344-3c26-419e-86a0-e598718196ff.svg"
                      alt="fuel for your day"
                      className="aspect-auto w-full object-cover h-full w-full !object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="text-[20px] lg:text-[26px] leading-[110%] font-champ uppercase text-dark-brown">
                      FUEL FOR YOUR DAY
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-dark-brown/80 leading-relaxed">
                      <p>7g protein per serving. Perfect for your oats, bowls, smoothies and snacks.</p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-row items-center gap-4 lg:gap-6">
                  <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14">
                    <img
                      src="/assets/images/Group_2.svg"
                      alt="100% natural, 0% Junk"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="text-[20px] lg:text-[26px] leading-[110%] font-champ uppercase text-dark-brown">
                      100% NATURAL, 0% JUNK
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-dark-brown/80 leading-relaxed">
                      <p>Just clean ingredients that taste better because they are better.</p>
                    </div>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-row items-center gap-4 lg:gap-6">
                  <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14">
                    <img
                      src="/assets/images/image_11_Vectorized.svg"
                      alt="no more snack regret"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="text-[20px] lg:text-[26px] leading-[110%] font-champ uppercase text-dark-brown">
                      NO MORE SNACK REGRET
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-dark-brown/80 leading-relaxed">
                      <p>Our American peanuts are a good source of protein, fiber and healthy fats.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full lg:w-fit flex flex-col items-center gap-2.5 pt-2">
                <Link
                  to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                  className="inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit focus-visible:outline-none text-[16px] lg:text-[20px] font-champ leading-[100%] py-4 px-8 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary shadow-md"
                >
                  BUY DRIZZY PEANUT BUTTER NOW
                </Link>
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-dark-brown font-bold text-center">
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

export default FeaturesGrid;
