import React, { useState } from 'react';

const ProductGallery = ({ images = [], mode = 'compact' }) => {
  const [activeImage, setActiveImage] = useState(0);

  const defaultImages = [
    '/assets/images/USADRIZZYFRONTcopy.jpg',
    '/assets/images/DRIZZY12302.jpg',
    '/assets/images/DRIZZY13034.jpg',
    '/assets/images/DRIZZY13132.jpg',
    '/assets/images/DRIZZY12496.jpg',
    '/assets/images/DRIZZY12791.jpg',
    '/assets/images/DRIZZY12951.jpg',
    '/assets/images/DRIZZY12237.jpg',
    '/assets/images/USADRIZZYBACKcopy.jpg',
    '/assets/images/USADRIZZYGOODcopy.jpg',
    '/assets/images/USADRIZZYHOWTOcopy.jpg',
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  // PDP 2-Column Grid Mode
  if (mode === 'pdp') {
    return (
      <div className="w-full">
        {/* Desktop Layout: Large Hero + 2-Column Grid */}
        <div className="hidden lg:flex flex-col gap-4 w-full">
          {/* Main Top Feature Card */}
          <div className="w-full aspect-square rounded-[28px] border-3 border-dark-brown overflow-hidden bg-white p-6 flex items-center justify-center shadow-sm">
            <img
              src={galleryImages[0]}
              alt="Drizzy Squeezy Peanut Butter"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>

          {/* 2-Column Square Grid for all subsequent photos */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {galleryImages.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="w-full aspect-square rounded-[24px] border-3 border-dark-brown overflow-hidden bg-white shadow-sm flex items-center justify-center group"
              >
                <img
                  src={img}
                  alt={`Drizzy view ${idx + 2}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout: Large Top Card + Horizontal Thumbnail Strip */}
        <div className="lg:hidden flex flex-col gap-3 w-full">
          <div className="w-full aspect-square rounded-[24px] border-3 border-dark-brown overflow-hidden bg-white p-4 flex items-center justify-center shadow-sm">
            <img
              src={galleryImages[activeImage]}
              alt="Drizzy Squeezy Peanut Butter"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>

          {/* Scrollable Thumbnails Strip */}
          <div className="flex gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1 px-1">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 overflow-hidden bg-white transition-all cursor-pointer ${
                  activeImage === idx
                    ? 'border-dark-brown ring-2 ring-accent-purple opacity-100 scale-95'
                    : 'border-dark-brown/40 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Compact Mode (Used on Home Page Feature Section)
  return (
    <div className="flex w-full items-center justify-center flex-col gap-4">
      <div className="relative mx-auto flex flex-col gap-4 w-full">
        <div className="flex flex-col-reverse gap-2 w-full lg:block lg:relative lg:gap-0 lg:pl-[88px]">
          {/* Thumbnails strip (left side on desktop, bottom on mobile) */}
          <div className="thumbnail-strip relative mx-auto flex h-16 md:h-20 w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[72px] lg:h-auto lg:overflow-x-hidden lg:overflow-y-auto lg:block">
            <div className="flex h-full w-max gap-2 lg:h-auto lg:w-full lg:flex-col">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 aspect-square h-full cursor-pointer border-2 border-dark-brown rounded-[6px] lg:rounded-[8px] overflow-hidden lg:h-auto lg:w-full transition-opacity ${
                    activeImage === idx ? 'opacity-100 ring-2 ring-accent-purple' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width="240"
                    height="160"
                    className="aspect-auto w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main viewport */}
          <div className="main-viewport w-full max-w-full overflow-hidden relative border-2 border-dark-brown rounded-[28px] bg-white p-4 aspect-[400/460] flex items-center justify-center shadow-sm">
            <img
              src={galleryImages[activeImage]}
              alt="Drizzy Squeezy Peanut Butter 19.4 Oz"
              className="aspect-auto w-full h-full object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* 4 Featured Sticker Badges below the image gallery */}
      <div className="w-full grid grid-cols-4 gap-3 md:gap-4 md:px-2 pt-2">
        <div className="w-full aspect-square shrink-0">
          <img
            src="/assets/images/featured-sticker-1.png"
            alt="sticker 1"
            className="aspect-auto w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="w-full aspect-square shrink-0">
          <img
            src="/assets/images/featured-sticker-2.png"
            alt="sticker 2"
            className="aspect-auto w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="w-full aspect-square shrink-0">
          <img
            src="/assets/images/featured-sticker-3.png"
            alt="sticker 3"
            className="aspect-auto w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="w-full aspect-square shrink-0">
          <img
            src="/assets/images/featured-sticker-4.png"
            alt="sticker 4"
            className="aspect-auto w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
