import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import PdpBuyBox from '../components/product/PdpBuyBox';
import GoodStuffOnly from '../components/product/GoodStuffOnly';
import ProductFaq from '../components/product/ProductFaq';
import { getProductBySlug } from '../services/api';
import { useCart } from '../context/CartContext';
import styles from './ProductDetails.module.css';

const fallbackProduct = {
  name: 'Drizzy Squeezy Peanut Butter 19.4 Oz',
  slug: 'drizzy-squeezy-peanut-butter-19-4-oz',
  price: 999,
  images: [
    '/assets/images/DRIZZY12302.jpg',
    '/assets/images/USADRIZZYFRONTcopy.jpg',
    '/assets/images/DRIZZY13132.jpg',
    '/assets/images/DRIZZY12386.jpg',
  ],
  bottleOptions: [
    { quantity: 1, title: '1 Bottle', price: 999, perBottle: '$9.99/bottle', savingsPercent: '0%', badge: null },
    { quantity: 2, title: '2 Bottles', price: 1898, compareAtPrice: 1998, perBottle: '$9.49/bottle', savingsPercent: '5%', badge: null },
    { quantity: 3, title: '3 Bottles', price: 2697, compareAtPrice: 2997, perBottle: '$8.99/bottle', savingsPercent: '10%', badge: 'Most Popular' },
    { quantity: 6, title: '6 Bottles', price: 4794, compareAtPrice: 5994, perBottle: '$7.99/bottle', savingsPercent: '20%', badge: 'Best Value' },
  ],
};

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [deliveryFrequency, setDeliveryFrequency] = useState('4 weeks');
  const [adding, setAdding] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getProductBySlug(slug || 'drizzy-squeezy-peanut-butter-19-4-oz')
      .then((data) => {
        if (!isMounted) return;
        const currentProduct = data || fallbackProduct;
        setProduct(currentProduct);
        if (currentProduct.bottleOptions?.length) {
          setSelectedOption(currentProduct.bottleOptions[2] || currentProduct.bottleOptions[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('Fallback product data loaded:', err);
        setProduct(fallbackProduct);
        setSelectedOption(fallbackProduct.bottleOptions[2]);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

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
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>Loading Drizzy...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span>/</span>
        <Link to="/collections/all" className={styles.breadcrumbLink}>Products</Link>
        <span>/</span>
        <span className={styles.breadcrumbActive}>{product?.name}</span>
      </nav>

      {/* Main PDP Section */}
      <section className={styles.mainSection}>
        <div className={styles.pdpColumns}>
          {/* Left Gallery */}
          <div className={styles.galleryCol}>
            <ProductGallery images={product?.images} mode="pdp" />
          </div>

          {/* Right Buy Box */}
          <div className={styles.buyBoxCol}>
            <PdpBuyBox
              product={product}
              selectedOption={selectedOption}
              onSelectOption={setSelectedOption}
              purchaseType={purchaseType}
              setPurchaseType={setPurchaseType}
              deliveryFrequency={deliveryFrequency}
              setDeliveryFrequency={setDeliveryFrequency}
              onAddToCart={handleAddToCart}
              adding={adding}
            />
          </div>
        </div>
      </section>

      {/* 2. Good Stuff Only Section */}
      <GoodStuffOnly />

      {/* 3. Premium Peanuts. Nothing Else. */}
      <section className={styles.premiumSection} aria-label="Premium Quality Story">
        <div className={styles.premiumContainer}>
          <div className={styles.premiumRow}>
            {/* Left Image with Sticker */}
            <div className={styles.premiumImageWrapper}>
              <div className={styles.premiumImageFrame}>
                <img
                  src="/assets/images/pdp-image.png"
                  alt="Drizzy in cart with peanuts"
                  className={styles.premiumImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.aussieBadge}>
                <img
                  src="/assets/images/aussie.png"
                  alt="Aussie Aussie Aussie"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className={styles.premiumContent}>
              <h2 className={styles.premiumHeading}>
                Premium Peanuts. Nothing Else.
              </h2>

              <div className={styles.perksList}>
                <div className={styles.perkRow}>
                  <div className={styles.perkEmojiCircle} aria-hidden="true">
                    🥜
                  </div>
                  <div>
                    <h3 className={styles.perkTitle}>PURE AMERICAN PEANUTS</h3>
                    <p className={styles.perkDescription}>
                      100% roasted American peanuts with a splash of peanut oil.
                    </p>
                  </div>
                </div>

                <div className={styles.perkRow}>
                  <div className={styles.perkEmojiCircle} aria-hidden="true">
                    ⚡
                  </div>
                  <div>
                    <h3 className={styles.perkTitle}>CLEAN ENERGY, ZERO CRASH</h3>
                    <p className={styles.perkDescription}>
                      7g of plant-based protein in every serving.
                    </p>
                  </div>
                </div>

                <div className={styles.perkRow}>
                  <div className={styles.perkEmojiCircle} aria-hidden="true">
                    ★
                  </div>
                  <div>
                    <h3 className={styles.perkTitle}>5-STAR HEALTH RATING</h3>
                    <p className={styles.perkDescription}>
                      No palm oil. No stabilizers. Nothing your peanut butter needs explaining.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.premiumCtaBox}>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={styles.premiumCtaBtn}
                >
                  BUY DRIZZY PEANUT BUTTER NOW
                </button>
                <div className={styles.shippingCaption}>
                  FREE SHIPPING ON ORDERS $49.99+
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Loved by 1,000+ Aussies (Reviews Grid) */}
      <section className={styles.reviewsSection} aria-label="Customer Reviews">
        <div className={styles.premiumContainer}>
          <div className={styles.reviewsHeader}>
            <div className={styles.reviewsStars} aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <h2 className={styles.reviewsTitle}>
              Loved by 1,000+ Aussies
            </h2>
          </div>

          <div className={styles.reviewsGrid}>
            {/* Review 1 */}
            <div className={styles.quoteCard}>
              <div>
                <div className={styles.quoteStars}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className={styles.quoteText}>
                  "I bought it for my kids. They absolutely love it"
                </p>
              </div>
              <div className={styles.quoteAuthor}>
                <span className={styles.authorName}>BRET M.</span>
                <span className={styles.verifiedBadge}>✓ VERIFIED CUSTOMER</span>
              </div>
            </div>

            {/* Review 2: Video Thumbnail */}
            <div className={styles.videoCard}>
              <img
                src="/assets/images/752346b4c8024ba38fba13e55d014963.thumbnail.0000000000_1.jpg"
                alt="Customer review video thumbnail"
                className={styles.videoCardImg}
                loading="lazy"
              />
            </div>

            {/* Review 3 */}
            <div className={styles.quoteCard}>
              <div>
                <div className={styles.quoteStars}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className={styles.quoteText}>
                  "Absolutely love this on my overnight oats every morning - so quick and easy and very tasty went back and bought more :)"
                </p>
              </div>
              <div className={styles.quoteAuthor}>
                <span className={styles.authorName}>JAY B.</span>
                <span className={styles.verifiedBadge}>✓ VERIFIED CUSTOMER</span>
              </div>
            </div>

            {/* Review 4: Video Thumbnail */}
            <div className={styles.videoCard}>
              <img
                src="/assets/images/7197cdc3c5194c39804a834f7b97aebd.thumbnail.0000000000_1.jpg"
                alt="Customer enjoying Drizzy"
                className={styles.videoCardImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <ProductFaq />
    </div>
  );
};

export default ProductDetails;
