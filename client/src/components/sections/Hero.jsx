import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div id="shopify-section-template--22221105463467__hero_DqxALE" className="shopify-section">
      <section
        className="bg-background text-foreground pt-2 pb-4 lg:pt-4 lg:pb-6"
        style={{
          '--spacing-top': '1.0rem',
          '--spacing-bottom': '1.5rem',
          '--spacing-top-mobile': '0.5rem',
          '--spacing-bottom-mobile': '0.75rem',
        }}
      >
        <div className="w-full max-w-[1500px] mx-auto px-4">
          {/* Main hero frame */}
          <div className="relative w-full h-[620px] sm:h-[700px] lg:h-[600px] flex flex-col justify-between items-center px-4 pt-10 sm:pt-12 pb-6 lg:pb-8 rounded-[32px] sm:rounded-[40px] overflow-hidden">
            {/* Desktop Hero Background Graphic */}
            <img
              src="/assets/images/hero-bg.png"
              alt="drizzy hero"
              className="aspect-auto w-full object-cover hidden md:block absolute inset-0 w-full h-full z-0"
              loading="eager"
            />

            {/* Mobile Hero Background Graphic */}
            <img
              src="/assets/images/hero-bg-mobile.png"
              alt="drizzy hero"
              className="aspect-auto w-full object-cover md:hidden absolute inset-0 w-full h-full z-0"
              loading="eager"
            />

            {/* Floating Sticker Graphic */}
            <div className="absolute w-[160px] sm:w-[190px] lg:w-[220px] aspect-square rotate-[10deg] top-[50%] sm:top-[52%] lg:top-[54%] right-[3%] sm:right-[5%] lg:right-[6%] z-[3] pointer-events-none drop-shadow-xl">
              <img
                src="/assets/images/sticker.png"
                alt="drizzy sticker"
                className="aspect-auto w-full h-full object-contain"
                loading="eager"
              />
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-brown to-transparent z-[1] pointer-events-none" />

            {/* Top Heading + Star Ratings */}
            <div className="relative flex flex-col gap-3 items-center text-center z-[2]">
              <div className="flex flex-row items-center gap-2">
                <div className="flex items-center gap-[3.5px]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.16089 13.5124C2.82276 13.6862 2.43989 13.3824 2.50796 12.9944L3.23397 8.8561L0.151933 5.91904C-0.1361 5.64456 0.0129997 5.14269 0.398865 5.08788L4.68503 4.47899L6.59614 0.693267C6.76829 0.352244 7.23464 0.352244 7.40679 0.693267L9.3179 4.47899L13.6041 5.08788C13.9899 5.14269 14.139 5.64456 13.851 5.91904L10.769 8.8561L11.495 12.9944C11.563 13.3824 11.1802 13.6862 10.842 13.5124L7.00146 11.5384L3.16089 13.5124Z"
                        fill="#CA9AF1"
                      />
                    </svg>
                  ))}
                </div>
                <p className="font-secondary text-[13px] sm:text-[14px] font-bold text-cream">Loved by Thousands of Aussies!</p>
              </div>

              <h1 className="font-champ text-cream text-[36px] sm:text-[50px] lg:text-[58px] leading-[105%] tracking-[-0.02em] max-w-[800px] mt-1 sm:mt-2 text-center drop-shadow-sm">
                All-Natural Peanut Butter You Can Squeeze
              </h1>
            </div>

            {/* Bottom CTA & Subtitle */}
            <div className="flex flex-col gap-2.5 items-center z-[2] w-full max-w-md pb-2 sm:pb-3">
              <Link
                to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                className="inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit focus-visible:outline-none text-[16px] sm:text-[18px] lg:text-[20px] font-champ leading-[100%] py-3.5 px-8 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary shadow-lg"
              >
                BUY DRIZZY PEANUT BUTTER NOW
              </Link>
              <p className="font-secondary text-[12px] uppercase tracking-wider text-cream font-bold mt-1">
                FREE SHIPPING ON ORDERS $49.99+
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
