import React, { useState } from 'react';
import BottleSelector from './BottleSelector';
import { formatCurrency } from '../../utils/formatters';
import styles from './PdpBuyBox.module.css';

const PdpBuyBox = ({
  product,
  selectedOption,
  onSelectOption,
  purchaseType,
  setPurchaseType,
  deliveryFrequency,
  setDeliveryFrequency,
  onAddToCart,
  adding,
}) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const calculatedPrice = selectedOption
    ? selectedOption.price
    : product?.price || 34900;

  return (
    <div className={styles.buyBox}>
      {/* Title */}
      <h1 className={styles.title}>
        {product?.name || 'Squizyy Squeezy Peanut Butter 19.4 Oz'}
      </h1>

      {/* Subtitle */}
      <p className={styles.subtitle}>
        350g of pure squeezy peanut butter
      </p>

      {/* Dashed separator */}
      <div className={styles.dashedSeparator} />

      {/* Price */}
      <div className={styles.priceDisplay}>
        {formatCurrency(calculatedPrice)}
      </div>

      {/* Dashed separator */}
      <div className={styles.dashedSeparator} />

      {/* Feature Checkmarks */}
      <div className={styles.checkmarksList}>
        <div className={styles.checkItem}>
          <span className={styles.checkIcon} aria-hidden="true">✓</span>
          <span>Ultra-smooth drizzlable texture</span>
        </div>
        <div className={styles.checkItem}>
          <span className={styles.checkIcon} aria-hidden="true">✓</span>
          <span>7g of plant-based protein & 100% Natural</span>
        </div>
        <div className={styles.checkItem}>
          <span className={styles.checkIcon} aria-hidden="true">✓</span>
          <span>Naturally rich in protein & healthy fats</span>
        </div>
      </div>

      {/* Quantity Header */}
      <div className={styles.quantityHeader}>
        Quantity: {selectedOption?.quantity || 1} {selectedOption?.quantity === 1 ? 'Bottle' : 'Bottles'}
      </div>

      {/* Bottle Selector Component */}
      {product?.bottleOptions && (
        <BottleSelector
          options={product.bottleOptions}
          selectedOption={selectedOption}
          onSelect={onSelectOption}
        />
      )}

      {/* Add to Cart CTA */}
      <div className={styles.ctaWrapper}>
        <button
          type="button"
          onClick={onAddToCart}
          disabled={adding}
          className={styles.addToCartBtn}
        >
          {adding ? 'ADDING...' : 'ADD TO CART'}
        </button>
        <p className={styles.shippingNote}>
          FREE DELIVERY ACROSS INDIA ON ORDERS OVER ₹499+
        </p>
      </div>

      {/* 3 Authentic PDP Accordions in Single Rounded Box */}
      <div className={styles.accordionBox}>
        {/* Accordion 1: Description */}
        <div className={styles.accordionItem}>
          <button
            type="button"
            onClick={() => toggleAccordion('description')}
            className={styles.accordionToggle}
            aria-expanded={openAccordion === 'description'}
          >
            <span>Description</span>
            <span className={styles.accordionIcon}>{openAccordion === 'description' ? '∧' : '∨'}</span>
          </button>
          {openAccordion === 'description' && (
            <div className={styles.accordionContent}>
              <p>Squizyy™ is an ultra-smooth, drizzlable peanut butter made to fit modern life.</p>
              <p style={{ marginTop: '0.5rem' }}>
                No jars. No knives. No mess. Just shake, squeeze and drizzle over toast, oats, smoothies, fruit or straight into your mouth.
              </p>
              <p style={{ fontWeight: 'bold', marginTop: '0.75rem', textTransform: 'uppercase' }}>Why Squizyy™:</p>
              <ul className={styles.bulletList}>
                <li>Squeeze bottle = zero mess</li>
                <li>Smooth, drizzlable consistency</li>
                <li>7g protein per serve</li>
                <li>Perfect for breakfast, lunch and all day snacking!</li>
              </ul>
            </div>
          )}
        </div>

        {/* Accordion 2: Ingredients */}
        <div className={styles.accordionItem}>
          <button
            type="button"
            onClick={() => toggleAccordion('ingredients')}
            className={styles.accordionToggle}
            aria-expanded={openAccordion === 'ingredients'}
          >
            <span>Ingredients</span>
            <span className={styles.accordionIcon}>{openAccordion === 'ingredients' ? '∧' : '∨'}</span>
          </button>
          {openAccordion === 'ingredients' && (
            <div className={styles.accordionContent}>
              <p><strong>Ingredients:</strong> 100% Pure Natural American Roasted Peanuts, Splash of Peanut Oil.</p>
              <p style={{ marginTop: '0.5rem' }}>Zero palm oil. Zero added sugars. Zero artificial stabilizers.</p>
              <p style={{ marginTop: '0.5rem' }}>Contains: Peanuts. Manufactured in a dedicated peanut facility.</p>
            </div>
          )}
        </div>

        {/* Accordion 3: Nutrition Facts */}
        <div className={styles.accordionItem}>
          <button
            type="button"
            onClick={() => toggleAccordion('nutrition')}
            className={styles.accordionToggle}
            aria-expanded={openAccordion === 'nutrition'}
          >
            <span>Nutrition Facts</span>
            <span className={styles.accordionIcon}>{openAccordion === 'nutrition' ? '∧' : '∨'}</span>
          </button>
          {openAccordion === 'nutrition' && (
            <div className={styles.accordionContent}>
              <p><strong>Serving Size:</strong> 2 tbsp (32g) • Servings Per Container: Approx. 17</p>
              <p style={{ marginTop: '0.25rem' }}><strong>Calories:</strong> 200 • <strong>Total Fat:</strong> 16g (21% DV)</p>
              <p style={{ marginTop: '0.25rem' }}><strong>Sodium:</strong> 0mg (0% DV) • <strong>Total Carbs:</strong> 6g (2% DV)</p>
              <p style={{ marginTop: '0.25rem' }}><strong>Dietary Fiber:</strong> 2g (7% DV) • <strong>Total Sugars:</strong> 1g (Includes 0g Added Sugars)</p>
              <p style={{ marginTop: '0.25rem' }}><strong>Protein:</strong> 7g (14% DV)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdpBuyBox;
