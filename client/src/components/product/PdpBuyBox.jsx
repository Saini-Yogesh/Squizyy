import React, { useState } from 'react';
import BottleSelector from './BottleSelector';
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
    ? purchaseType === 'subscription'
      ? Math.round(selectedOption.price * 0.9)
      : selectedOption.price
    : product?.price || 999;

  return (
    <div className={styles.buyBox}>
      {/* Title */}
      <h1 className={styles.title}>
        {product?.name || 'Drizzy Squeezy Peanut Butter 19.4 Oz'}
      </h1>

      {/* Subtitle */}
      <p className={styles.subtitle}>
        19.4 Oz of peanut butter
      </p>

      {/* Dashed separator */}
      <div className={styles.dashedSeparator} />

      {/* Price */}
      <div className={styles.priceDisplay}>
        ${(calculatedPrice / 100).toFixed(2)}
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

      {/* Subscription toggle cards */}
      <div className={styles.subscriptionCards}>
        {/* Card 1: Subscribe and save */}
        <div
          onClick={() => setPurchaseType('subscription')}
          className={`${styles.subCard} ${
            purchaseType === 'subscription' ? styles.subCardActive : styles.subCardInactive
          }`}
          role="radio"
          aria-checked={purchaseType === 'subscription'}
          tabIndex={0}
        >
          <div className={styles.subCardRow}>
            <div className={styles.subCardLeft}>
              <div
                className={`${styles.radioCircle} ${
                  purchaseType === 'subscription' ? styles.radioActive : styles.radioInactive
                }`}
              >
                {purchaseType === 'subscription' && <div className={styles.radioInner} />}
              </div>
              <span className={styles.subCardLabel}>
                Subscribe and save
              </span>
            </div>
            <span className={styles.subCardPrice}>
              ${(Math.round((selectedOption?.price || 999) * 0.9) / 100).toFixed(2)}
            </span>
          </div>

          {/* Frequency Dropdown */}
          {purchaseType === 'subscription' && (
            <div className={styles.frequencyRow}>
              <span>Delivery:</span>
              <select
                value={deliveryFrequency}
                onChange={(e) => setDeliveryFrequency(e.target.value)}
                className={styles.frequencySelect}
                aria-label="Delivery Frequency"
              >
                <option value="2 weeks" className={styles.frequencyOption}>Every 2 weeks</option>
                <option value="4 weeks" className={styles.frequencyOption}>Every 4 weeks</option>
                <option value="6 weeks" className={styles.frequencyOption}>Every 6 weeks</option>
                <option value="8 weeks" className={styles.frequencyOption}>Every 8 weeks</option>
              </select>
            </div>
          )}
        </div>

        {/* Card 2: One Time Purchase */}
        <div
          onClick={() => setPurchaseType('one-time')}
          className={`${styles.subCard} ${
            purchaseType === 'one-time' ? styles.subCardActive : styles.subCardInactive
          }`}
          role="radio"
          aria-checked={purchaseType === 'one-time'}
          tabIndex={0}
        >
          <div className={styles.subCardRow}>
            <div className={styles.subCardLeft}>
              <div
                className={`${styles.radioCircle} ${
                  purchaseType === 'one-time' ? styles.radioActive : styles.radioInactive
                }`}
              >
                {purchaseType === 'one-time' && <div className={styles.radioInner} />}
              </div>
              <span className={styles.subCardLabel}>
                One Time Purchase
              </span>
            </div>
            <span className={styles.subCardPrice}>
              ${((selectedOption?.price || 999) / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

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
          FREE SHIPPING ON ORDERS OVER $49.99+
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
              <p>Drizzy™ is an ultra-smooth, drizzlable peanut butter made to fit modern life.</p>
              <p style={{ marginTop: '0.5rem' }}>
                No jars. No knives. No mess. Just shake, squeeze and drizzle over toast, oats, smoothies, fruit or straight into your mouth.
              </p>
              <p style={{ fontWeight: 'bold', marginTop: '0.75rem', textTransform: 'uppercase' }}>Why Drizzy™:</p>
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
