import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div id="shopify-section-template--22221105463467__hero_DqxALE" className="shopify-section">
      <section
        className="bg-foreground text-foreground color-scheme-6b429eba-cf78-4f62-a7d0-644c65da650d pt-3 pb-3 lg:pt-6 lg:pb-6 h-[50.0rem] lg:h-[90svh]"
        style={{
          '--spacing-top': '1.5rem',
          '--spacing-bottom': '1.5rem',
          '--spacing-top-mobile': '0.75rem',
          '--spacing-bottom-mobile': '0.75rem',
          '--height_desktop': '90svh',
          '--height_mobile': '50.0rem',
        }}
      >
        <div className="w-full h-full px-3 lg:px-4 bg-foreground">
          {/* Main content frame */}
          <div className="relative w-full h-full flex flex-col justify-between items-center px-3 pt-8 pb-6 lg:pb-5 rounded-[40px] overflow-hidden">
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
            <div className="absolute w-[37vw] md:w-[15vw] rotate-[10deg] top-[38%] lg:top-[40%] right-[3%] lg:right-[8%] z-0 pointer-events-none">
              <img
                src="/assets/images/sticker.png"
                alt="drizzy sticker"
                className="aspect-auto w-full object-cover w-full h-full"
                loading="eager"
              />
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-brown to-transparent z-[1] pointer-events-none" />

            {/* Top Heading + Star Ratings */}
            <div className="relative flex flex-col gap-3 items-center text-center z-[2]">
              <div className="flex flex-col lg:flex-row items-center gap-2.5">
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
                <p className="text-body4 lg:text-body3 text-foreground">Loved by Thousands of Aussies!</p>
              </div>

              <h1 className="text-heading4 lg:text-heading1 md:max-w-[852px] mt-2 lg:mt-0 text-foreground">
                All-Natural Peanut Butter You Can Squeeze
              </h1>
            </div>

            {/* Bottom CTA & Subtitle */}
            <div className="flex flex-col gap-3 items-center z-[2] w-full max-w-md">
              <Link
                to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                className="inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit focus-visible:outline-none text-[16px] lg:text-[20px] font-primary leading-[100%] py-4 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary shadow-lg"
              >
                BUY DRIZZY PEANUT BUTTER NOW
              </Link>
              <p className="text-caption lg:text-body4 uppercase text-foreground">FREE SHIPPING ON ORDERS $49.99+</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
