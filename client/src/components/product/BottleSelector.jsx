import React from 'react';

const BottleSelector = ({ options = [], selectedQuantity, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 w-full my-4">
      {options.map((option) => {
        const isSelected = selectedQuantity === option.quantity;
        return (
          <button
            key={option.quantity}
            type="button"
            onClick={() => onSelect(option)}
            className={`bottle-option-card relative flex flex-col sm:flex-row items-center gap-3 p-3.5 md:p-4 text-left cursor-pointer ${
              isSelected ? 'active bg-foreground text-background' : 'bg-white text-foreground hover:bg-foreground/5'
            }`}
          >
            {/* Sticker Badge if popular or best value */}
            {option.badge && (
              <span className="absolute -top-4 -right-2 md:-right-3 z-10 flex items-center justify-center">
                <img
                  src={option.badge}
                  alt="Badge"
                  className="w-16 md:w-20 h-auto object-contain drop-shadow-md"
                />
              </span>
            )}

            {/* Bottle Image */}
            <div className="w-12 h-16 md:w-16 md:h-20 flex-shrink-0 flex items-center justify-center">
              <img
                src={option.image}
                alt={option.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Bottle Info */}
            <div className="flex flex-col flex-1 min-w-0">
              <span className={`font-champ text-sm md:text-base uppercase ${isSelected ? 'text-white' : 'text-foreground'}`}>
                {option.title}
              </span>

              <div className="flex items-center gap-2 mt-1">
                <span className={`font-champ text-base md:text-lg ${isSelected ? 'text-accent-purple' : 'text-foreground'}`}>
                  ${(option.price / 100).toFixed(2)}
                </span>
                {option.compareAtPrice > option.price && (
                  <span className="text-xs font-mono line-through opacity-60">
                    ${(option.compareAtPrice / 100).toFixed(2)}
                  </span>
                )}
              </div>

              {option.savingsPercent && option.savingsPercent !== '0%' && (
                <span className={`text-[11px] font-mono mt-0.5 font-bold ${isSelected ? 'text-accent-purple' : 'text-accent-green'}`}>
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
