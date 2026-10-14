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
        <div className="container px-4 lg:px-20 flex flex-col items-start justify-between w-full gap-10 lg:gap-[60px] lg:flex-row mx-auto">
          {/* Left: Image with Overlaid Slogan Badge */}
          <div className="relative w-full lg:w-[50%] h-[28.125rem] lg:h-[51.25rem]">
            <div className="w-full h-full rounded-3xl border-4 border-dark-brown overflow-clip shadow-xl">
              <img
                src="/assets/images/drizzy-1.jpg"
                alt="Drizzy USA"
                className="aspect-auto w-full object-cover h-[28.125rem] lg:h-[51.25rem]"
                loading="lazy"
              />
            </div>

            {/* Overlaid rotated slogan */}
            <div className="absolute w-[44%] lg:w-[38.5%] lg:rotate-[-18.62deg] bottom-[30%] lg:bottom-6 -right-4 lg:right-auto lg:-left-[10%] pointer-events-none drop-shadow-xl">
              <img
                src="/assets/images/Slogan_60f4524c-8b90-43e6-aad4-c9bbd67f0367.png"
                alt="drizzy slogan"
                className="aspect-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Feature Content */}
          <div className="w-full flex lg:w-[50%] min-h-full lg:min-h-[51.25rem]">
            <div className="flex flex-col gap-6 lg:gap-11 items-start lg:justify-center w-full">
              <h2 className="text-heading4 lg:text-heading1">
                Peanut Butter Needed This
              </h2>

              <div className="flex flex-col gap-6 w-full">
                {/* Feature 1 */}
                <div className="flex flex-row items-center gap-4 lg:gap-6">
                  <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14">
                    <img
                      src="/assets/images/image_11_Vectorized_-2.svg"
                      alt="DRIZZLE MORE, MESS LESS"
                      className="aspect-auto w-full object-cover h-full w-full !object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="text-[20px] lg:text-[28px] leading-[100%] font-primary uppercase">
                      DRIZZLE MORE, MESS LESS
                    </div>
                    <div className="text-body4 lg:text-body3">
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
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="text-[20px] lg:text-[28px] leading-[100%] font-primary uppercase">
                      fuel for your day
                    </div>
                    <div className="text-body4 lg:text-body3">
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
                      className="aspect-auto w-full object-cover h-full w-full !object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="text-[20px] lg:text-[28px] leading-[100%] font-primary uppercase">
                      100% natural, 0% Junk
                    </div>
                    <div className="text-body4 lg:text-body3">
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
                      className="aspect-auto w-full object-cover h-full w-full !object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="text-[20px] lg:text-[28px] leading-[100%] font-primary uppercase">
                      no more snack regret
                    </div>
                    <div className="text-body4 lg:text-body3">
                      <p>Our American peanuts are a good source of protein, fiber and healthy fats.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full lg:w-fit flex flex-col items-center gap-3">
                <Link
                  to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                  className="inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit focus-visible:outline-none text-[16px] lg:text-[20px] font-primary leading-[100%] py-4 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary"
                >
                  BUY DRIZZY PEANUT BUTTER NOW
                </Link>
                <div className="text-caption lg:text-body4 uppercase">
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
