import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const InstaFeed = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const reels = [
    {
      id: '1',
      img: '/assets/images/timeline-3.jpg',
      badge: null,
      caption: 'ME! 🇦🇺 Five m...',
      link: 'https://instagram.com/getdrizzy',
    },
    {
      id: '2',
      img: '/assets/images/7197cdc3c5194c39804a834f7b97aebd.thumbnail.0000000000.jpg',
      badge: null,
      caption: '"Go where the wind takes you"\nMe:',
      link: 'https://instagram.com/getdrizzy',
    },
    {
      id: '3',
      img: '/assets/images/DRIZZY13132.jpg',
      badge: null,
      caption: null,
      link: 'https://instagram.com/getdrizzy',
    },
    {
      id: '4',
      img: '/assets/images/insta-post-1.png',
      badge: null,
      caption: 'Come with us to watch Drizzy launch',
      link: 'https://instagram.com/getdrizzy',
    },
    {
      id: '5',
      img: '/assets/images/insta-post-2.png',
      badge: 'Yo-Chi Frozen Yogurt',
      caption: null,
      link: 'https://instagram.com/getdrizzy',
    },
    {
      id: '6',
      img: '/assets/images/insta-post-3.png',
      badge: null,
      caption: null,
      link: 'https://instagram.com/getdrizzy',
    },
    {
      id: '7',
      img: '/assets/images/insta-post-4.png',
      badge: null,
      caption: null,
      link: 'https://instagram.com/getdrizzy',
    },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div id="shopify-section-template--22221105463467__178698386217403125" className="shopify-section relative">
      <section className="bg-cream text-dark-brown pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase tracking-tight text-dark-brown">
              Follow @getdrizzy
            </h2>
          </div>

          {/* Carousel Slider Container */}
          <div className="relative group/carousel">
            
            {/* Left Scroll Button */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scroll('left')}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-dark-brown border-2 border-dark-brown flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} className="stroke-[2.5]" />
              </button>
            )}

            {/* Right Scroll Button */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scroll('right')}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-dark-brown border-2 border-dark-brown flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} className="stroke-[2.5]" />
              </button>
            )}

            {/* Scrollable Reel Cards */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-4 sm:gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2 px-2 snap-x snap-mandatory scroll-smooth"
            >
              {reels.map((reel) => (
                <a
                  key={reel.id}
                  href={reel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-[240px] sm:w-[280px] lg:w-[310px] aspect-[9/16] rounded-[24px] sm:rounded-[32px] overflow-hidden border-3 border-dark-brown bg-[#2D0F28] shadow-sm relative group snap-start transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Reel Image */}
                  <img
                    src={reel.img}
                    alt={reel.caption || 'Drizzy post'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Dark gradient for text readability if caption exists */}
                  {reel.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  )}

                  {/* Badge (e.g. Yo-Chi location pin) */}
                  {reel.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-accent-purple/90 backdrop-blur-sm text-dark-brown font-mono font-bold text-[10px] sm:text-xs px-3 py-1.5 rounded-full border border-dark-brown flex items-center gap-1.5 shadow-sm">
                      <span>📍</span>
                      <span>{reel.badge}</span>
                    </div>
                  )}

                  {/* Caption Overlay */}
                  {reel.caption && (
                    <div className="absolute inset-x-4 bottom-5 z-10 text-white font-mono text-xs sm:text-sm font-semibold whitespace-pre-line drop-shadow-md leading-snug">
                      {reel.caption}
                    </div>
                  )}
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default InstaFeed;
