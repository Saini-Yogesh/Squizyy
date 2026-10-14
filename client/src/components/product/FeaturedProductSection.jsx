import React, { useState, useEffect } from 'react';
import ProductGallery from './ProductGallery';
import { useCart } from '../../context/CartContext';
import { getProductBySlug } from '../../services/api';

const FeaturedProductSection = () => {
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [deliveryFrequency, setDeliveryFrequency] = useState('4 weeks');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductBySlug('drizzy-squeezy-peanut-butter-19-4-oz')
      .then((data) => {
        setProduct(data);
        if (data?.bottleOptions?.length) {
          // Default to the 3-bottle bundle option
          setSelectedOption(data.bottleOptions[2] || data.bottleOptions[0]);
        }
      })
      .catch((err) => console.warn('Could not load featured product data:', err));
  }, []);

  const bundleOptions = product?.bottleOptions || [
    {
      quantity: 1,
      title: '1 Bottle',
      price: 999,
      compareAtPrice: 999,
      savingsPercent: '0%',
      image: '/assets/images/1_bottle.png',
      badge: null,
    },
    {
      quantity: 2,
      title: '2 Bottles',
      price: 1998,
      compareAtPrice: 1998,
      savingsPercent: '0%',
      image: '/assets/images/2_bottle.png',
      badge: null,
    },
    {
      quantity: 3,
      title: '3 Bottles',
      price: 2697,
      compareAtPrice: 2997,
      savingsPercent: '10%',
      image: '/assets/images/3_bottle.png',
      badge: '/assets/images/most-popular-sticker.png',
    },
    {
      quantity: 6,
      title: '6 Bottles',
      price: 4999,
      compareAtPrice: 5994,
      savingsPercent: '16%',
      image: '/assets/images/6_bottles.png',
      badge: '/assets/images/best-value-sticker.png',
    },
  ];

  const currentOption = selectedOption || bundleOptions[2] || bundleOptions[0];

  const finalUnitPrice = purchaseType === 'subscription'
    ? Math.round(currentOption.price * 0.9)
    : currentOption.price;

  const handleAddToCart = () => {
    const prodObj = product || {
      _id: 'featured-pb-194',
      name: 'Drizzy Squeezy Peanut Butter 19.4 Oz',
      slug: 'drizzy-squeezy-peanut-butter-19-4-oz',
      price: currentOption.price,
      images: ['/assets/images/USADRIZZYFRONTcopy.jpg'],
    };
    addToCart(prodObj, currentOption, purchaseType, deliveryFrequency, quantity);
  };

  return (
    <div id="shopify-section-template--22221105463467__featured_product_dzQzaz" className="shopify-section relative">
      <section
        className="relative bg-brown text-cream color-scheme-6b429eba-cf78-4f62-a7d0-644c65da650d pb-12 lg:pb-20 px-0 overflow-hidden"
        style={{
          '--spacing-top': '2.5rem',
          '--spacing-bottom': '2.5rem',
          '--spacing-top-mobile': '1.5rem',
          '--spacing-bottom-mobile': '1.5rem',
        }}
      >
        {/* Floating Peanuts Background Elements */}
        <div
          className="hidden lg:block absolute w-[105px] top-1/2 -translate-y-1/2 rotate-[135deg] left-[-12px] pointer-events-none z-0"
          aria-hidden="true"
        >
          <img
            src="/assets/images/drizzy-peanut-left.png"
            alt="peanut"
            className="aspect-auto w-full object-cover"
          />
        </div>

        <div
          className="hidden lg:block absolute w-[137px] bottom-[25%] translate-y-[25%] rotate-[-120deg] right-[-42px] pointer-events-none z-0"
          aria-hidden="true"
        >
          <img
            src="/assets/images/drizzy-peanut-left.png"
            alt="peanut"
            className="aspect-auto w-full object-cover"
          />
        </div>

        <div
          className="hidden lg:block absolute w-[67px] top-1/2 -translate-y-1/2 rotate-[-7deg] right-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          <img
            src="/assets/images/peanut-small.png"
            alt="peanut"
            className="aspect-auto w-full object-cover"
          />
        </div>

        <div
          className="hidden lg:block absolute w-[90px] top-[55%] -translate-y-[55%] rotate-[18deg] right-8 pointer-events-none z-0"
          aria-hidden="true"
        >
          <img
            src="/assets/images/peanut-small.png"
            alt="peanut"
            className="aspect-auto w-full object-cover"
          />
        </div>

        {/* Main Product Container */}
        <div className="w-full pt-4 lg:pt-8 pb-4 relative z-10">
          <div className="container !max-w-[1054px] block mx-auto px-4">
            <div className="relative z-10 flex h-full w-full flex-col justify-center items-start gap-8 lg:gap-14 lg:flex-row">
              
              {/* Left Column: Authentic Media Gallery + 4 Stickers */}
              <div className="flex w-full items-center justify-center flex-col gap-4 lg:w-1/2">
                <ProductGallery images={product?.images} />
              </div>

              {/* Right Column: Authentic Buy Box */}
              <div className="flex w-full flex-col items-start lg:w-1/2 lg:py-2">
                
                {/* 5-Star Aussie Reviews */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-[3px] text-accent-purple">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        className="block align-middle w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-body4 lg:text-body3 text-cream font-bold">
                    5.0 Based on 984 Aussie Reviews
                  </span>
                </div>

                {/* Product Title & Serving Size */}
                <div className="mt-3 space-y-1">
                  <h2 className="text-heading4 lg:text-heading2 text-cream font-primary">
                    The Ultimate Breakfast Power-Up
                  </h2>
                  <div className="text-body3 lg:text-body2 text-cream/90 font-mono">
                    19.4 oz (550g)
                  </div>
                </div>

                {/* Dotted Divider */}
                <div className="w-full border-t border-dashed border-cream/40 mt-5 lg:mt-6" />

                {/* Price Display */}
                <div className="text-[24px] lg:text-heading5 font-primary leading-[100%] mt-5 lg:mt-6 text-cream">
                  <span>$9.99</span>
                </div>

                {/* Dotted Divider */}
                <div className="w-full border-t border-dashed border-cream/40 mt-5 lg:mt-6" />

                {/* 3 Authentic Feature Bullet Items with Checkmarks */}
                <div className="space-y-3.5 mt-5 lg:mt-6 w-full">
                  <div className="w-full flex items-center gap-3.5">
                    <div className="w-5 h-5 shrink-0">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.75 10.75C0.75 6.036 0.75 3.679 2.214 2.214C3.68 0.75 6.036 0.75 10.75 0.75C15.464 0.75 17.821 0.75 19.285 2.214C20.75 3.68 20.75 6.036 20.75 10.75C20.75 15.464 20.75 17.821 19.285 19.285C17.822 20.75 15.464 20.75 10.75 20.75C6.036 20.75 3.679 20.75 2.214 19.285C0.75 17.822 0.75 15.464 0.75 10.75Z"
                          stroke="#F8EBD7"
                          strokeWidth="1.5"
                        />
                        <path d="M7.25 11.25L9.25 13.25L14.25 8.25" stroke="#F8EBD7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-body4 lg:text-body3 text-cream">
                      Simply shake, squeeze and drizzle.
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-3.5">
                    <div className="w-5 h-5 shrink-0">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.75 10.75C0.75 6.036 0.75 3.679 2.214 2.214C3.68 0.75 6.036 0.75 10.75 0.75C15.464 0.75 17.821 0.75 19.285 2.214C20.75 3.68 20.75 6.036 20.75 10.75C20.75 15.464 20.75 17.821 19.285 19.285C17.822 20.75 15.464 20.75 10.75 20.75C6.036 20.75 3.679 20.75 2.214 19.285C0.75 17.822 0.75 15.464 0.75 10.75Z"
                          stroke="#F8EBD7"
                          strokeWidth="1.5"
                        />
                        <path d="M7.25 11.25L9.25 13.25L14.25 8.25" stroke="#F8EBD7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-body4 lg:text-body3 text-cream">
                      100% Pure American roasted peanuts with a splash of peanut oil. No palm oil, no junk.
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-3.5">
                    <div className="w-5 h-5 shrink-0">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.75 10.75C0.75 6.036 0.75 3.679 2.214 2.214C3.68 0.75 6.036 0.75 10.75 0.75C15.464 0.75 17.821 0.75 19.285 2.214C20.75 3.68 20.75 6.036 20.75 10.75C20.75 15.464 20.75 17.821 19.285 19.285C17.822 20.75 15.464 20.75 10.75 20.75C6.036 20.75 3.679 20.75 2.214 19.285C0.75 17.822 0.75 15.464 0.75 10.75Z"
                          stroke="#F8EBD7"
                          strokeWidth="1.5"
                        />
                        <path d="M7.25 11.25L9.25 13.25L14.25 8.25" stroke="#F8EBD7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-body4 lg:text-body3 text-cream">
                      7g of protein per serve for everything you love and anything you crave.
                    </div>
                  </div>
                </div>

                {/* Add to Cart / Buy Now Action Button */}
                <a
                  href="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                  className="!w-full mt-8 lg:mt-10 inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit focus-visible:outline-none text-[16px] lg:text-[20px] font-primary leading-[100%] py-4 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary shadow-lg"
                >
                  BUY DRIZZY PEANUT BUTTER NOW
                </a>

                {/* Free Shipping Subtext */}
                <div className="w-full text-caption lg:text-body4 text-center mt-3 text-cream/90 font-bold uppercase">
                  FREE SHIPPING ON ORDERS $49.99+
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProductSection;
