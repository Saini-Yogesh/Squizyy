import React from 'react';

const FeatureTicker = () => {
  const tickerItems = [
    { icon: '/assets/images/image_10_Vectorized.svg', title: 'AUSSIE-OWNED' },
    { icon: '/assets/images/image_11_Vectorized_-2.svg', title: 'ULTRA-SMOOTH' },
    { icon: '/assets/images/image_11_Vectorized.svg', title: 'ZERO ADDED SUGAR' },
    { icon: '/assets/images/image_11_Vectorized_-1.svg', title: 'NATURAL FUEL' },
    { icon: '/assets/images/image_10_Vectorized.svg', title: 'AUSSIE-OWNED' },
    { icon: '/assets/images/image_11_Vectorized_-2.svg', title: 'ULTRA-SMOOTH' },
    { icon: '/assets/images/image_11_Vectorized.svg', title: 'ZERO ADDED SUGAR' },
    { icon: '/assets/images/image_11_Vectorized_-1.svg', title: 'NATURAL FUEL' },
  ];

  return (
    <div id="shopify-section-template--22221105463467__logos_marquee_BxkYjX" className="shopify-section">
      <section
        className="text-foreground bg-background color-scheme-1 pt-8 pb-8 lg:pt-8 lg:pb-8 overflow-hidden"
        style={{
          '--spacing-top': '2.0rem',
          '--spacing-bottom': '2.0rem',
          '--spacing-top-mobile': '2.0rem',
          '--spacing-bottom-mobile': '2.0rem',
        }}
      >
        <div className="px-0">
          <div className="flex flex-col gap-10 overflow-x-hidden">
            <div className="flex overflow-hidden select-none">
              {/* Track 1 */}
              <div className="flex justify-around flex-shrink-0 min-w-full animate-ticker-marquee">
                {tickerItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 pr-[60px]">
                    <div className="flex justify-center items-center h-10 w-10 lg:h-14 lg:w-14 flex-shrink-0">
                      <img
                        src={item.icon}
                        alt="icon"
                        width="460"
                        height="491"
                        className="aspect-auto w-full object-cover h-full w-auto !object-contain"
                        loading="eager"
                      />
                    </div>
                    <p className="text-heading5 lg:text-heading4 uppercase whitespace-nowrap">{item.title}</p>
                  </div>
                ))}
              </div>

              {/* Track 2 for seamless loop */}
              <div className="flex justify-around flex-shrink-0 min-w-full animate-ticker-marquee" aria-hidden="true">
                {tickerItems.map((item, idx) => (
                  <div key={`track2-${idx}`} className="flex items-center gap-4 pr-[60px]">
                    <div className="flex justify-center items-center h-10 w-10 lg:h-14 lg:w-14 flex-shrink-0">
                      <img
                        src={item.icon}
                        alt="icon"
                        width="460"
                        height="491"
                        className="aspect-auto w-full object-cover h-full w-auto !object-contain"
                        loading="eager"
                      />
                    </div>
                    <p className="text-heading5 lg:text-heading4 uppercase whitespace-nowrap">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureTicker;
