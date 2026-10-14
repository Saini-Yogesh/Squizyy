import React from 'react';

const BottleSelector = ({ options = [], selectedOption, onSelect }) => {
  const bottleAssets = {
    1: { image: '/assets/images/1_bottle.png', badge: null },
    2: { image: '/assets/images/2_bottle.png', badge: null },
    3: { image: '/assets/images/3_bottle.png', badge: '/assets/images/most-popular-sticker.png' },
    6: { image: '/assets/images/6_bottles.png', badge: '/assets/images/best-value-sticker.png' },
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
      {options.map((option) => {
        const isSelected = selectedOption?.quantity === option.quantity;
        const assetInfo = bottleAssets[option.quantity] || {};
        const bottleImg = option.image || assetInfo.image || '/assets/images/1_bottle.png';
        const badgeImg = option.badge || assetInfo.badge;

        return (
          <button
            key={option.quantity}
            type="button"
            onClick={() => onSelect(option)}
            className={`relative flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3.5 text-left rounded-2xl border-2 sm:border-3 border-dark-brown cursor-pointer transition-all duration-150 ${
              isSelected
                ? 'bg-[#2D0F28] text-[#CA9AF1] shadow-md ring-2 ring-[#2D0F28]'
                : 'bg-[#F8EBD7] text-dark-brown hover:bg-[#faefe1]'
            }`}
          >
            {/* Sticker Badge if popular or best value */}
            {badgeImg && (
              <span className="absolute -top-3.5 -right-2 sm:-top-4 sm:-right-3 z-10 pointer-events-none">
                <img
                  src={badgeImg}
                  alt="Badge"
                  className="w-12 sm:w-16 h-auto object-contain drop-shadow-md"
                />
              </span>
            )}

            {/* Bottle Thumbnail Image */}
            <div className="w-10 h-14 sm:w-12 sm:h-16 flex-shrink-0 flex items-center justify-center">
              <img
                src={bottleImg}
                alt={option.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Bottle Title & Pricing Info */}
            <div className="flex flex-col flex-1 min-w-0">
              <span
                className={`font-champ text-sm sm:text-base uppercase tracking-tight leading-tight ${
                  isSelected ? 'text-[#CA9AF1]' : 'text-dark-brown'
                }`}
              >
                {option.quantity}x Bottle{option.quantity > 1 ? 's' : ''}
              </span>

              <div className="flex items-center gap-1.5 mt-1 font-champ">
                <span className={`text-sm sm:text-base font-bold ${isSelected ? 'text-[#CA9AF1]' : 'text-dark-brown'}`}>
                  ${(option.price / 100).toFixed(2)}
                </span>
                {option.compareAtPrice > option.price && (
                  <span className={`text-xs font-mono line-through ${isSelected ? 'text-[#CA9AF1]/60' : 'text-dark-brown/50'}`}>
                    ${(option.compareAtPrice / 100).toFixed(2)}
                  </span>
                )}
              </div>

              {option.savingsPercent && option.savingsPercent !== '0%' && (
                <span className={`text-[10px] sm:text-xs font-mono font-bold mt-0.5 ${isSelected ? 'text-cream' : 'text-dark-brown/70'}`}>
                  Save {option.savingsPercent}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BottleSelector;
