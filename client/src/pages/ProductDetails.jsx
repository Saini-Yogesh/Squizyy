import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import BottleSelector from '../components/product/BottleSelector';
import ComparisonTable from '../components/product/ComparisonTable';
import FeatureTicker from '../components/sections/FeatureTicker';
import FeaturesGrid from '../components/sections/FeaturesGrid';
import { getProductBySlug } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [deliveryFrequency, setDeliveryFrequency] = useState('4 weeks');
  const [openAccordion, setOpenAccordion] = useState(null);
  const [adding, setAdding] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug || 'drizzy-squeezy-peanut-butter-19-4-oz')
      .then((data) => {
        setProduct(data);
        if (data?.bottleOptions?.length) {
          setSelectedOption(data.bottleOptions[2] || data.bottleOptions[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Fallback product data:', err);
        // Fallback product matching getdrizzy
        const fallback = {
          name: 'Drizzy Squeezy Peanut Butter 19.4 Oz',
          slug: 'drizzy-squeezy-peanut-butter-19-4-oz',
          price: 999,
          bottleOptions: [
            { quantity: 1, title: '1 Bottle', price: 999, perBottle: '$9.99/bottle', savingsPercent: '0%', badge: null },
            { quantity: 2, title: '2 Bottles', price: 1898, compareAtPrice: 1998, perBottle: '$9.49/bottle', savingsPercent: '5%', badge: null },
            { quantity: 3, title: '3 Bottles', price: 2697, compareAtPrice: 2997, perBottle: '$8.99/bottle', savingsPercent: '10%', badge: 'Most Popular' },
            { quantity: 6, title: '6 Bottles', price: 4794, compareAtPrice: 5994, perBottle: '$7.99/bottle', savingsPercent: '20%', badge: 'Best Value' }
          ]
        };
        setProduct(fallback);
        setSelectedOption(fallback.bottleOptions[2]);
        setLoading(false);
      });
  }, [slug]);

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const handleAddToCart = () => {
    if (!product || !selectedOption) return;
    setAdding(true);
    addToCart(product, selectedOption, purchaseType, deliveryFrequency, 1);
    setTimeout(() => {
      setAdding(false);
    }, 400);
  };

  if (loading) {
    return (
      <div className="py-24 text-center bg-cream">
        <div className="animate-spin w-10 h-10 border-4 border-dark-brown border-t-accent-purple rounded-full mx-auto" />
        <p className="mt-4 font-champ text-lg uppercase text-dark-brown">Loading Drizzy...</p>
      </div>
    );
  }

  const calculatedPrice = selectedOption
    ? purchaseType === 'subscription'
      ? Math.round(selectedOption.price * 0.9)
      : selectedOption.price
    : product?.price || 999;

  return (
    <div className="w-full bg-cream">
      {/* Breadcrumb */}
      <div className="max-w-[87.5rem] mx-auto px-4 py-4 text-xs font-mono text-dark-brown/70 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to="/collections/all" className="hover:underline">Products</Link>
        <span>/</span>
        <span className="text-dark-brown font-bold">{product?.name}</span>
      </div>

      {/* Main PDP Section */}
      <section className="pb-16 px-4 max-w-[87.5rem] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
          {/* Left Gallery - 2-Column Square Grid on Desktop, Strip on Mobile */}
          <div className="w-full lg:w-[52%]">
            <ProductGallery images={product?.images} mode="pdp" />
          </div>

          {/* Right Buy Box - Sticky on Desktop */}
          <div className="w-full lg:w-[48%] lg:sticky lg:top-24 flex flex-col text-dark-brown">
            {/* Title */}
            <h1 className="font-champ text-3xl sm:text-4xl lg:text-5xl uppercase text-dark-brown leading-none tracking-tight">
              {product?.name || 'Drizzy Squeezy Peanut Butter 19.4 Oz'}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-base font-mono text-dark-brown font-medium">
              19.4 Oz of peanut butter
            </p>

            {/* Dashed separator */}
            <div className="w-full border-t border-dashed border-dark-brown/30 my-4" />

            {/* Price */}
            <div className="font-mono text-xl sm:text-2xl font-bold text-dark-brown">
              ${(calculatedPrice / 100).toFixed(2)}
            </div>

            {/* Dashed separator */}
            <div className="w-full border-t border-dashed border-dark-brown/30 my-4" />

            {/* Feature Checkmarks */}
            <div className="space-y-2.5 font-mono text-xs sm:text-sm text-dark-brown">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md border border-dark-brown flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </span>
                <span>Ultra-smooth drizzlable texture</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md border border-dark-brown flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </span>
                <span>7g of plant-based protein & 100% Natural</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md border border-dark-brown flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </span>
                <span>Naturally rich in protein & healthy fats</span>
              </div>
            </div>

            {/* Quantity Header */}
            <div className="font-champ text-lg sm:text-xl uppercase text-dark-brown mt-6 mb-3">
              Quantity: {selectedOption?.quantity || 1} {selectedOption?.quantity === 1 ? 'Bottle' : 'Bottles'}
            </div>

            {/* Bottle Selector Component */}
            {product?.bottleOptions && (
              <BottleSelector
                options={product.bottleOptions}
                selectedOption={selectedOption}
                onSelect={setSelectedOption}
              />
            )}

            {/* Subscription toggle cards */}
            <div className="mt-4 space-y-2.5">
              {/* Card 1: Subscribe and save */}
              <div
                onClick={() => setPurchaseType('subscription')}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 sm:border-3 border-dark-brown cursor-pointer transition-all ${
                  purchaseType === 'subscription'
                    ? 'bg-[#2D0F28] text-[#CA9AF1]'
                    : 'bg-[#F8EBD7] text-dark-brown hover:bg-[#faefe1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${purchaseType === 'subscription' ? 'border-[#CA9AF1]' : 'border-dark-brown'}`}>
                      {purchaseType === 'subscription' && <div className="w-2 h-2 rounded-full bg-[#CA9AF1]" />}
                    </div>
                    <span className="font-champ text-sm sm:text-base uppercase tracking-tight">
                      Subscribe and save
                    </span>
                  </div>
                  <span className="font-champ text-sm sm:text-base font-bold">
                    ${(Math.round((selectedOption?.price || 999) * 0.9) / 100).toFixed(2)}
                  </span>
                </div>

                {/* Frequency Dropdown */}
                {purchaseType === 'subscription' && (
                  <div className="mt-3 pt-3 border-t border-[#CA9AF1]/20 flex items-center justify-between text-xs font-mono">
                    <span>Delivery:</span>
                    <select
                      value={deliveryFrequency}
                      onChange={(e) => setDeliveryFrequency(e.target.value)}
                      className="bg-transparent text-[#CA9AF1] border border-[#CA9AF1]/40 rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer"
                    >
                      <option value="2 weeks" className="bg-[#2D0F28] text-cream">Every 2 weeks</option>
                      <option value="4 weeks" className="bg-[#2D0F28] text-cream">Every 4 weeks</option>
                      <option value="6 weeks" className="bg-[#2D0F28] text-cream">Every 6 weeks</option>
                      <option value="8 weeks" className="bg-[#2D0F28] text-cream">Every 8 weeks</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Card 2: One Time Purchase */}
              <div
                onClick={() => setPurchaseType('one-time')}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 sm:border-3 border-dark-brown cursor-pointer transition-all ${
                  purchaseType === 'one-time'
                    ? 'bg-[#2D0F28] text-[#CA9AF1]'
                    : 'bg-[#F8EBD7] text-dark-brown hover:bg-[#faefe1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${purchaseType === 'one-time' ? 'border-[#CA9AF1]' : 'border-dark-brown'}`}>
                      {purchaseType === 'one-time' && <div className="w-2 h-2 rounded-full bg-[#CA9AF1]" />}
                    </div>
                    <span className="font-champ text-sm sm:text-base uppercase tracking-tight">
                      One Time Purchase
                    </span>
                  </div>
                  <span className="font-champ text-sm sm:text-base font-bold">
                    ${((selectedOption?.price || 999) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full bg-accent-purple hover:bg-[#b885e3] text-dark-brown border-2 border-dark-brown rounded-full py-4 sm:py-4.5 px-8 font-champ text-lg sm:text-xl uppercase tracking-wide button-primary transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {adding ? 'ADDING...' : 'ADD TO CART'}
              </button>
              <p className="mt-2 text-center font-mono text-[11px] sm:text-xs text-dark-brown uppercase tracking-wider">
                FREE SHIPPING ON ORDERS OVER $49.99+
              </p>
            </div>

            {/* 3 Authentic PDP Accordions in Single Rounded Box */}
            <div className="mt-6 border-2 sm:border-3 border-dark-brown rounded-3xl bg-cream overflow-hidden p-5 sm:p-6 divide-y divide-dashed divide-dark-brown/30">
              {/* Accordion 1: Description */}
              <div className="pb-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('description')}
                  className="w-full flex items-center justify-between font-champ text-base sm:text-lg uppercase text-dark-brown cursor-pointer text-left"
                >
                  <span>Description</span>
                  <span className="font-mono text-xl">{openAccordion === 'description' ? '∧' : '∨'}</span>
                </button>
                {openAccordion === 'description' && (
                  <div className="mt-3 text-xs sm:text-sm font-mono leading-relaxed text-dark-brown/90 space-y-2">
                    <p>Drizzy™ is an ultra-smooth, drizzlable peanut butter made to fit modern life.</p>
                    <p>No jars. No knives. No mess. Just shake, squeeze and drizzle over toast, oats, smoothies, fruit or straight into your mouth.</p>
                    <p className="font-bold mt-2 font-champ uppercase">Why Drizzy™:</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li>Squeeze bottle = zero mess</li>
                      <li>Smooth, drizzlable consistency</li>
                      <li>7g protein per serve</li>
                      <li>Perfect for breakfast, lunch and all day snacking!</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Ingredients */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full flex items-center justify-between font-champ text-base sm:text-lg uppercase text-dark-brown cursor-pointer text-left"
                >
                  <span>Ingredients</span>
                  <span className="font-mono text-xl">{openAccordion === 'ingredients' ? '∧' : '∨'}</span>
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="mt-3 text-xs sm:text-sm font-mono leading-relaxed text-dark-brown/90 space-y-2">
                    <p><strong>Ingredients:</strong> 100% Pure Natural American Roasted Peanuts, Splash of Peanut Oil.</p>
                    <p>Zero palm oil. Zero added sugars. Zero artificial stabilizers.</p>
                    <p>Contains: Peanuts. Manufactured in a dedicated peanut facility.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Nutrition Facts */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('nutrition')}
                  className="w-full flex items-center justify-between font-champ text-base sm:text-lg uppercase text-dark-brown cursor-pointer text-left"
                >
                  <span>Nutrition Facts</span>
                  <span className="font-mono text-xl">{openAccordion === 'nutrition' ? '∧' : '∨'}</span>
                </button>
                {openAccordion === 'nutrition' && (
                  <div className="mt-3 text-xs sm:text-sm font-mono leading-relaxed text-dark-brown/90 space-y-2">
                    <p><strong>Serving Size:</strong> 2 tbsp (32g) • Servings Per Container: Approx. 17</p>
                    <p><strong>Calories:</strong> 200 • <strong>Total Fat:</strong> 16g (21% DV)</p>
                    <p><strong>Sodium:</strong> 0mg (0% DV) • <strong>Total Carbs:</strong> 6g (2% DV)</p>
                    <p><strong>Dietary Fiber:</strong> 2g (7% DV) • <strong>Total Sugars:</strong> 1g (Includes 0g Added Sugars)</p>
                    <p><strong>Protein:</strong> 7g (14% DV)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Good Stuff Only Section */}
      <section className="py-16 lg:py-24 bg-cream text-dark-brown relative overflow-hidden">
        <div className="max-w-[87.5rem] mx-auto px-4 lg:px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase text-center mb-10 lg:mb-16">
            Good Stuff Only
          </h2>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-3 items-center max-w-5xl mx-auto relative">
            {/* Left Column Perks */}
            <div className="flex flex-col gap-16 items-end text-right">
              <div className="flex flex-col items-end gap-3 max-w-xs">
                <img src="/assets/images/smile.png" alt="icon" className="w-14 h-14 object-contain" />
                <h3 className="font-champ text-xl uppercase leading-tight">GOOD SOURCE OF PROTEIN & FIBER</h3>
              </div>
              <div className="flex flex-col items-end gap-3 max-w-xs">
                <img src="/assets/images/peanut-man.png" alt="icon" className="w-14 h-14 object-contain" />
                <h3 className="font-champ text-xl uppercase leading-tight">NO PALM OILS, NO NASTIES</h3>
              </div>
            </div>

            {/* Center Bottle Graphic */}
            <div className="flex justify-center px-4">
              <img
                src="/assets/images/features-bg-2.png"
                alt="Good Stuff Drizzy Bottle"
                className="w-full max-w-[340px] h-auto object-contain drop-shadow-xl"
              />
            </div>

            {/* Right Column Perks */}
            <div className="flex flex-col gap-16 items-start text-left">
              <div className="flex flex-col items-start gap-3 max-w-xs">
                <img src="/assets/images/natural-fuel.png" alt="icon" className="w-14 h-14 object-contain" />
                <h3 className="font-champ text-xl uppercase leading-tight">NATURAL FUEL FOR YOUR DAY</h3>
              </div>
              <div className="flex flex-col items-start gap-3 max-w-xs">
                <img src="/assets/images/zero-sugar.png" alt="icon" className="w-14 h-14 object-contain" />
                <h3 className="font-champ text-xl uppercase leading-tight">NO ADDED SUGAR</h3>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 gap-6 w-full max-w-sm text-center">
              <div className="flex flex-col items-center gap-2">
                <img src="/assets/images/smile.png" alt="icon" className="w-12 h-12 object-contain" />
                <h3 className="font-champ text-xs uppercase">GOOD SOURCE OF PROTEIN & FIBER</h3>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src="/assets/images/natural-fuel.png" alt="icon" className="w-12 h-12 object-contain" />
                <h3 className="font-champ text-xs uppercase">NATURAL FUEL FOR YOUR DAY</h3>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src="/assets/images/peanut-man.png" alt="icon" className="w-12 h-12 object-contain" />
                <h3 className="font-champ text-xs uppercase">NO PALM OILS, NO NASTIES</h3>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src="/assets/images/zero-sugar.png" alt="icon" className="w-12 h-12 object-contain" />
                <h3 className="font-champ text-xs uppercase">NO ADDED SUGAR</h3>
              </div>
            </div>

            <div className="w-full max-w-[280px]">
              <img
                src="/assets/images/features-bg-mobile.png"
                alt="Good Stuff Drizzy Bottle"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Drizzy vs. The Rest Comparison Table */}
      <section className="py-16 lg:py-24 bg-accent-purple text-dark-brown relative overflow-hidden">
        <div className="max-w-[87.5rem] mx-auto px-4 lg:px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase text-center mb-10 lg:mb-16 text-dark-brown">
            Drizzy vs. The Rest
          </h2>

          <div className="max-w-4xl mx-auto overflow-x-auto [scrollbar-width:none]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-4 text-left font-champ text-base sm:text-xl uppercase w-[40%]"></th>
                  <th className="py-4 px-4 text-center bg-cream rounded-t-3xl border-t-4 border-x-4 border-dark-brown w-[30%]">
                    <img
                      src="/assets/images/drizzy-dark-logo.svg"
                      alt="DRIZZY"
                      className="h-8 lg:h-10 mx-auto object-contain"
                    />
                  </th>
                  <th className="py-4 px-4 text-center font-champ text-xs sm:text-base lg:text-lg uppercase text-dark-brown w-[30%]">
                    STANDARD PB JARS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-brown/20 font-mono text-xs sm:text-sm">
                {[
                  { feature: 'Mess-Free, No Spoons Needed', drizzy: true, standard: false },
                  { feature: 'Always Drizzlable Texture', drizzy: true, standard: false },
                  { feature: 'Natural Fuel', drizzy: true, standard: false },
                  { feature: '100% American Peanuts', drizzy: true, standard: false },
                  { feature: 'No Palm Oils or Nasties', drizzy: true, standard: false },
                  { feature: 'No Added Sugar', drizzy: true, standard: false },
                  { feature: 'No Stabilizers', drizzy: true, standard: false },
                ].map((row, idx, arr) => (
                  <tr key={idx} className="hover:bg-dark-brown/5">
                    <td className="py-4 px-4 font-bold text-dark-brown">
                      {row.feature}
                    </td>
                    <td className={`py-4 px-4 text-center bg-cream border-x-4 border-dark-brown ${idx === arr.length - 1 ? 'rounded-b-3xl border-b-8' : ''}`}>
                      <div className="w-7 h-7 mx-auto rounded-lg bg-dark-brown text-cream flex items-center justify-center font-bold">
                        ✓
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="w-7 h-7 mx-auto rounded-lg border-2 border-dark-brown/40 text-dark-brown/60 flex items-center justify-center font-bold text-sm">
                        ✕
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Premium Peanuts. Nothing Else. */}
      <section className="py-16 lg:py-24 bg-cream text-dark-brown relative overflow-hidden">
        <div className="max-w-[87.5rem] mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-5xl mx-auto">
            {/* Left Image with Sticker */}
            <div className="relative w-full lg:w-1/2">
              <div className="rounded-3xl border-4 border-b-8 border-dark-brown overflow-hidden bg-white shadow-xl aspect-[3/4]">
                <img
                  src="/assets/images/pdp-image.png"
                  alt="Drizzy in cart with peanuts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 sm:w-28 lg:w-36 pointer-events-none drop-shadow-xl">
                <img
                  src="/assets/images/aussie.png"
                  alt="Aussie Aussie Aussie"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase leading-tight">
                Premium Peanuts. Nothing Else.
              </h2>

              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-purple border border-dark-brown flex items-center justify-center shrink-0 font-champ font-bold text-lg">
                    🥜
                  </div>
                  <div>
                    <h3 className="font-champ text-base lg:text-lg uppercase">PURE AMERICAN PEANUTS</h3>
                    <p className="font-mono text-xs sm:text-sm text-dark-brown/80 mt-1">
                      100% roasted American peanuts with a splash of peanut oil.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-purple border border-dark-brown flex items-center justify-center shrink-0 font-champ font-bold text-lg">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-champ text-base lg:text-lg uppercase">CLEAN ENERGY, ZERO CRASH</h3>
                    <p className="font-mono text-xs sm:text-sm text-dark-brown/80 mt-1">
                      7g of plant-based protein in every serving.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-purple border border-dark-brown flex items-center justify-center shrink-0 font-champ font-bold text-lg">
                    ★
                  </div>
                  <div>
                    <h3 className="font-champ text-base lg:text-lg uppercase">5-STAR HEALTH RATING</h3>
                    <p className="font-mono text-xs sm:text-sm text-dark-brown/80 mt-1">
                      No palm oil. No stabilizers. Nothing your peanut butter needs explaining.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="button-primary w-full sm:w-fit py-4 px-8 text-base lg:text-lg"
                >
                  BUY DRIZZY PEANUT BUTTER NOW
                </button>
                <div className="text-caption uppercase mt-3 font-mono font-bold text-dark-brown/80">
                  FREE SHIPPING ON ORDERS $49.99+
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Loved by 1,000+ Aussies (Review Carousel) */}
      <section className="py-16 lg:py-24 bg-cream text-dark-brown relative overflow-hidden border-t-2 border-dark-brown/15">
        <div className="max-w-[87.5rem] mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-1.5 text-accent-purple mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">★</span>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase">
              Loved by 1,000+ Aussies
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {/* Review 1: Purple Quote Card */}
            <div className="bg-accent-purple rounded-3xl border-3 border-b-6 border-dark-brown p-6 flex flex-col justify-between aspect-[3/4] shadow-md">
              <div>
                <div className="flex text-dark-brown gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="font-mono text-sm lg:text-base leading-relaxed text-dark-brown">
                  "I bought it for my kids. They absolutely love it"
                </p>
              </div>
              <div className="pt-4 border-t border-dark-brown/20 font-mono text-xs">
                <span className="font-bold uppercase block">BRET M.</span>
                <span className="text-accent-green font-bold flex items-center gap-1 mt-1">✓ VERIFIED CUSTOMER</span>
              </div>
            </div>

            {/* Review 2: Video Thumbnail */}
            <div className="rounded-3xl border-3 border-b-6 border-dark-brown overflow-hidden bg-dark-brown aspect-[3/4] shadow-md relative group">
              <img
                src="/assets/images/752346b4c8024ba38fba13e55d014963.thumbnail.0000000000_1.jpg"
                alt="Customer with Drizzy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Review 3: Purple Quote Card */}
            <div className="bg-accent-purple rounded-3xl border-3 border-b-6 border-dark-brown p-6 flex flex-col justify-between aspect-[3/4] shadow-md">
              <div>
                <div className="flex text-dark-brown gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="font-mono text-sm lg:text-base leading-relaxed text-dark-brown">
                  "Absolutely love this on my overnight oats every morning - so quick and easy and very tasty went back and bought more :)"
                </p>
              </div>
              <div className="pt-4 border-t border-dark-brown/20 font-mono text-xs">
                <span className="font-bold uppercase block">JAY B.</span>
                <span className="text-accent-green font-bold flex items-center gap-1 mt-1">✓ VERIFIED CUSTOMER</span>
              </div>
            </div>

            {/* Review 4: Video Thumbnail */}
            <div className="rounded-3xl border-3 border-b-6 border-dark-brown overflow-hidden bg-dark-brown aspect-[3/4] shadow-md relative group">
              <img
                src="/assets/images/7197cdc3c5194c39804a834f7b97aebd.thumbnail.0000000000_1.jpg"
                alt="Girl enjoying Drizzy in car"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section: You Got Questions. We Got Answers. */}
      <section className="relative w-full bg-dark-brown text-cream overflow-hidden">
        {/* Top Cream Drip */}
        <div className="w-full relative z-[1]">
          <img
            src="/assets/images/timeline-drip.svg"
            alt="drip"
            className="w-full object-cover hidden md:block aspect-auto"
          />
          <img
            src="/assets/images/timeline-drip-mobile.svg"
            alt="drip"
            className="w-full object-cover md:hidden aspect-auto"
          />
        </div>

        <div className="relative w-full pb-16 lg:pb-24 pt-6 max-w-[87.5rem] mx-auto px-4 lg:px-6">
          {/* Background FAQ illustration (bottle dripping) */}
          <div className="absolute top-0 right-0 max-w-[50vw] lg:max-w-[38vw] pointer-events-none z-0">
            <img
              src="/assets/images/faq-bg.png"
              alt="FAQ bottle background"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="container relative z-[1] mx-auto max-w-4xl">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase text-cream mb-8 leading-tight">
              <p>You Got Questions.</p>
              <p>We Got Answers.</p>
            </div>

            {/* Cream Accordion Card with Dark Brown Text */}
            <div className="bg-cream text-dark-brown px-5 lg:px-8 py-4 rounded-[24px] lg:rounded-[32px] border-4 border-b-8 border-dark-brown shadow-2xl">
              {[
                {
                  q: 'What is Drizzy?',
                  a: 'Drizzy is 100% natural peanut butter, made from American peanuts and a splash of peanut oil. We filled a squeeze bottle so you no longer have to deal with the pains of a jar. Drizzy has no added sugar, no palm oil and no stabilizers. Just shake, squeeze and drizzle.',
                },
                {
                  q: 'Where can I buy Drizzy?',
                  a: 'You can buy Drizzy right here on our official website, nationwide at Sprouts Farmers Market stores, and on Amazon.',
                },
                {
                  q: 'Is Drizzy vegan & gluten-free?',
                  a: 'Yes! Drizzy contains only 100% American roasted peanuts and peanut oil. It is naturally vegan, gluten-free, dairy-free, and non-GMO.',
                },
                {
                  q: 'Does Drizzy contain palm oil, added sugar or stabilizers?',
                  a: 'Never. We never use palm oils, hydrogenated fats, added sugars, or emulsifiers. Only pure peanuts and peanut oil.',
                },
                {
                  q: 'Why do I need to shake Drizzy?',
                  a: 'Because Drizzy has zero artificial stabilizers or emulsifiers, natural peanut oils will naturally separate to the top. A quick 5-second shake blends it back into an ultra-smooth drizzle!',
                },
                {
                  q: 'How should I store Drizzy?',
                  a: 'Store Drizzy at room temperature in your pantry with the cap facing up. Do not refrigerate, as cold temperatures will harden natural peanut butter.',
                },
                {
                  q: 'My order arrived damaged. What should I do?',
                  a: 'Shoot an email to support@getdrizzy.co with a photo of the package and your order number. We will send you a replacement immediately, hassle-free!',
                },
              ].map((faq, index) => {
                const isOpen = openAccordion === `pdp-faq-${index}`;
                return (
                  <div
                    key={index}
                    className={`border-b border-dashed border-dark-brown/25 last:border-b-0 py-5 transition-all ${
                      isOpen ? 'pb-6' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(`pdp-faq-${index}`)}
                      className="w-full flex items-center justify-between text-left font-champ text-lg lg:text-xl uppercase text-dark-brown gap-4 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className={`transform transition-transform duration-200 text-xl font-bold ${isOpen ? 'rotate-180' : ''}`}>
                        ↓
                      </span>
                    </button>
                    {isOpen && (
                      <div className="mt-4 text-sm lg:text-base font-body text-dark-brown/90 leading-relaxed font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
