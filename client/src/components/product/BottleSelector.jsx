import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import styles from './BottleSelector.module.css';

const BottleSelector = ({ options = [], selectedOption, onSelect }) => {
  const bottleAssets = {
    1: { image: '/assets/images/1_bottle.png', badge: null },
    2: { image: '/assets/images/2_bottle.png', badge: null },
    3: { image: '/assets/images/3_bottle.png', badge: '/assets/images/most-popular-sticker.png' },
    6: { image: '/assets/images/6_bottles.png', badge: '/assets/images/best-value-sticker.png' },
  };

  return (
    <div className={styles.grid}>
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
            className={`${styles.optionCard} ${isSelected ? styles.selected : ''}`}
            aria-pressed={isSelected}
          >
            {/* Sticker Badge if popular or best value */}
            {badgeImg && (
              <span className={styles.badgeWrapper}>
                <img
                  src={badgeImg}
                  alt=""
                  className={styles.badgeImg}
                />
              </span>
            )}

            {/* Bottle Thumbnail Image */}
            <div className={styles.thumbWrapper}>
              <img
                src={bottleImg}
                alt={option.title}
                className={styles.thumbImg}
              />
            </div>

            {/* Bottle Title & Pricing Info */}
            <div className={styles.info}>
              <span className={styles.title}>
                {option.quantity}x Bottle{option.quantity > 1 ? 's' : ''}
              </span>

              <div className={styles.pricing}>
                <span className={styles.price}>
                  {formatCurrency(option.price)}
                </span>
                {option.compareAtPrice > option.price && (
                  <span className={styles.comparePrice}>
                    {formatCurrency(option.compareAtPrice)}
                  </span>
                )}
              </div>

              {option.savingsPercent && option.savingsPercent !== '0%' && (
                <span className={styles.savings}>
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
