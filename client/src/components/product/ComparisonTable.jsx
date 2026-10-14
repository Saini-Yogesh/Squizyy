import React from 'react';

const ComparisonTable = () => {
  return (
    <div id="shopify-section-template--22221105463467__comparison_k3FRjd" className="shopify-section">
      <section
        className="relative bg-accent-purple text-dark-brown color-scheme-828742e9-7009-4ced-847a-38b9d0a9af8e pt-0 pb-0 px-0 overflow-hidden"
        style={{
          '--spacing-top': '0.0rem',
          '--spacing-bottom': '0.0rem',
          '--spacing-top-mobile': '0.0rem',
          '--spacing-bottom-mobile': '0.0rem',
        }}
      >
        {/* Floating peanut left */}
        <div className="hidden md:block absolute w-[17vw] rotate-[-60deg] left-[-6vw] top-[16%] lg:top-[65%] z-[2] pointer-events-none">
          <img
            src="/assets/images/drizzy-peanut-left.png"
            alt="drizzy peanut"
            className="aspect-auto w-full object-cover"
          />
        </div>

        {/* Product bottle left */}
        <div className="absolute w-[58vw] md:w-[35vw] left-0 md:-left-8 top-[20%] z-[1] pointer-events-none">
          <img
            src="/assets/images/product-bottle-left.png"
            alt="drizzy bottle"
            className="aspect-auto w-full object-cover w-full hidden md:block"
          />
          <img
            src="/assets/images/product-image-left-mobile_44b57598-ff45-4f03-85da-e91f86420009.png"
            alt="drizzy bottle"
            className="aspect-auto w-full object-cover w-full md:hidden"
          />
        </div>

        {/* Floating peanut right */}
        <div className="hidden md:block absolute w-[6.25vw] rotate-[-14deg] right-[-1.5%] top-[20%] z-[2] pointer-events-none">
          <img
            src="/assets/images/drizzy-peanut-left.png"
            alt="drizzy peanut"
            className="aspect-auto w-full object-cover"
          />
        </div>

        {/* Other product right (messy jars) */}
        <div className="absolute w-[86vw] md:w-[35vw] right-[-10vw] md:-right-2.5 bottom-[10%] md:bottom-[25%] z-[1] pointer-events-none">
          <img
            src="/assets/images/other-product-right.png"
            alt="other jars"
            className="aspect-auto w-full object-cover"
          />
        </div>

        <div className="main-wrapper bg-accent-purple">
          {/* Top cream dripping graphic */}
          <div className="w-full">
            <img
              src="/assets/images/12e124.png"
              alt="cream drip"
              className="aspect-auto w-full object-cover hidden md:block"
            />
            <img
              src="/assets/images/cream-drip-mobile.svg"
              alt="cream drip"
              className="aspect-auto w-full object-cover md:hidden"
            />
          </div>

          {/* Headline and Comparison badges */}
          <div className="relative container md:max-w-[925px] mx-auto mt-3 pb-[25vh] lg:pb-[20vh] z-[3]">
            <p className="text-heading5 lg:text-heading1 lg:max-w-[802px] text-center mx-auto text-foreground">
              Kiss Your Jar Goodbye, Mwa!
            </p>

            <div className="w-full flex flex-col items-center md:gap-2.5 mt-20 md:mt-[68px]">
              <div className="w-full flex justify-between items-center flex-col md:flex-row gap-8 md:gap-0">
                {/* Left (Drizzy) perks */}
                <div className="flex flex-col gap-3 items-end md:items-start md:basis-1/3">
                  <div className="w-fit text-[12px] lg:text-[16px] leading-[100%] font-primary uppercase py-2 px-4 lg:py-3 lg:px-6 bg-cream rounded-full border border-dark-brown">
                    PERFECTLY SMOOTH
                  </div>
                  <div className="w-fit text-[12px] lg:text-[16px] leading-[100%] font-primary uppercase py-2 px-4 lg:py-3 lg:px-6 bg-cream rounded-full border border-dark-brown">
                    SQUEEZE AND DRIZZLE
                  </div>
                  <div className="w-fit text-[12px] lg:text-[16px] leading-[100%] font-primary uppercase py-2 px-4 lg:py-3 lg:px-6 bg-cream rounded-full border border-dark-brown">
                    ZERO MESS
                  </div>
                </div>

                {/* VS Badge */}
                <div className="mt-12 md:mt-0 self-center w-20 h-20 aspect-square flex justify-center items-center rounded-full bg-dark-brown text-cream text-heading5 shadow-lg">
                  VS
                </div>

                {/* Right (Standard Jars) pain points */}
                <div className="flex flex-col gap-3 items-start md:items-end md:basis-1/3">
                  <div className="w-fit text-[12px] lg:text-[16px] leading-[100%] font-primary uppercase py-2 px-4 lg:py-3 lg:px-6 bg-cream rounded-full border border-dark-brown">
                    Hard to stir
                  </div>
                  <div className="w-fit text-[12px] lg:text-[16px] leading-[100%] font-primary uppercase py-2 px-4 lg:py-3 lg:px-6 bg-cream rounded-full border border-dark-brown">
                    SCOOP AND SCRAPE
                  </div>
                  <div className="w-fit text-[12px] lg:text-[16px] leading-[100%] font-primary uppercase py-2 px-4 lg:py-3 lg:px-6 bg-cream rounded-full border border-dark-brown">
                    SOMEHOW GET IT EVERYWHERE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom purple drip graphic */}
          <div className="w-full bg-brown">
            <img
              src="/assets/images/purple-drip.svg"
              alt="purple drip"
              className="aspect-auto w-full object-cover hidden md:block"
            />
            <img
              src="/assets/images/purple-drip-mobile.svg"
              alt="purple drip"
              className="aspect-auto w-full object-cover md:hidden"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComparisonTable;
