import React from 'react';
import { Link } from 'react-router-dom';

const AnnouncementBar = () => {
  const items = [
    { icon: '/assets/images/Union.svg', isSvg: true },
    { icon: '/assets/images/peanut-tiny_edb0d5dd-b629-429d-a3b9-ec4c93589cbb.png', isSvg: false },
    { icon: '/assets/images/Union.svg', isSvg: true },
    { icon: '/assets/images/peanut-tiny_edb0d5dd-b629-429d-a3b9-ec4c93589cbb.png', isSvg: false },
    { icon: '/assets/images/Union.svg', isSvg: true },
    { icon: '/assets/images/peanut-tiny_edb0d5dd-b629-429d-a3b9-ec4c93589cbb.png', isSvg: false },
  ];

  return (
    <div id="shopify-section-sections--22221105168555__announcement_bar_QRrKnC" className="shopify-section shopify-section-group-header-group">
      <section
        className="announcement-bar relative flex justify-center bg-background bg-gradient text-accent-foreground color-scheme-1 pt-4 pb-0 lg:pt-4 lg:pb-0"
        style={{
          '--spacing-top': '1.0rem',
          '--spacing-bottom': '0.0rem',
          '--spacing-top-mobile': '1.0rem',
          '--spacing-bottom-mobile': '0.0rem',
        }}
      >
        <div className="relative w-full px-4 lg:px-6">
          {/* Mobile view */}
          <div className="lg:hidden uppercase py-1.5 bg-accent-background rounded-full overflow-hidden">
            <div className="flex animate-announcement-marquee whitespace-nowrap">
              <div className="flex items-center justify-around flex-shrink-0 min-w-full gap-4">
                {items.slice(0, 3).map((item, idx) => (
                  <Link
                    key={idx}
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className="flex items-center justify-center gap-2 text-wrap text-center px-4"
                  >
                    <span className="flex items-center h-auto w-[18px] flex-shrink-0">
                      <img
                        src={item.icon}
                        alt="icon"
                        width="80"
                        height="80"
                        className="aspect-auto w-full object-contain"
                      />
                    </span>
                    <div className="flex gap-2 text-[10px] leading-[100%] font-secondary">
                      <span>FREE SHIPPING ON ORDERS $49.99+</span>
                      <span className="underline font-bold">BUY NOW</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-around flex-shrink-0 min-w-full gap-4">
                {items.slice(0, 3).map((item, idx) => (
                  <Link
                    key={`dup-${idx}`}
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className="flex items-center justify-center gap-2 text-wrap text-center px-4"
                  >
                    <span className="flex items-center h-auto w-[18px] flex-shrink-0">
                      <img
                        src={item.icon}
                        alt="icon"
                        width="80"
                        height="80"
                        className="aspect-auto w-full object-contain"
                      />
                    </span>
                    <div className="flex gap-2 text-[10px] leading-[100%] font-secondary">
                      <span>FREE SHIPPING ON ORDERS $49.99+</span>
                      <span className="underline font-bold">BUY NOW</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop view */}
          <div className="hidden lg:block overflow-hidden select-none w-full uppercase py-3 rounded-full bg-accent-background">
            <div className="flex">
              <div className="flex justify-around flex-shrink-0 min-w-full animate-announcement-marquee">
                {items.map((item, idx) => (
                  <Link
                    key={idx}
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className="flex items-center gap-4 pr-4"
                  >
                    <span className="flex items-center h-auto w-[23px] flex-shrink-0">
                      <img
                        src={item.icon}
                        alt="icon"
                        width="200"
                        height="200"
                        className="aspect-auto w-full h-full !object-contain"
                      />
                    </span>
                    <div className="flex gap-2">
                      <span className="text-body4">FREE SHIPPING ON ORDERS $49.99+</span>
                      <span className="text-body4 underline">BUY NOW</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Second identical set for seamless continuous marquee loop */}
              <div className="flex justify-around flex-shrink-0 min-w-full animate-announcement-marquee" aria-hidden="true">
                {items.map((item, idx) => (
                  <Link
                    key={`track2-${idx}`}
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className="flex items-center gap-4 pr-4"
                  >
                    <span className="flex items-center h-auto w-[23px] flex-shrink-0">
                      <img
                        src={item.icon}
                        alt="icon"
                        width="200"
                        height="200"
                        className="aspect-auto w-full h-full !object-contain"
                      />
                    </span>
                    <div className="flex gap-2">
                      <span className="text-body4">FREE SHIPPING ON ORDERS $49.99+</span>
                      <span className="text-body4 underline">BUY NOW</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnnouncementBar;
