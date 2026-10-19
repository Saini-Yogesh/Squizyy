import React, { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import Spinner from '../components/common/Spinner/Spinner';
import { getProducts } from '../services/api';
import styles from './Products.module.css';

const defaultFallbackProducts = [
  {
    id: '8932474355883',
    slug: 'drizzy-squeezy-peanut-butter-19-4-oz',
    name: 'Drizzy Squeezy Peanut Butter 19.4 Oz',
    price: 999,
    images: ['/assets/images/DRIZZY12302.jpg', '/assets/images/USADRIZZYFRONTcopy.jpg'],
  },
  {
    id: '8932545495211',
    slug: 'food-services-pack-6-units',
    name: 'Food Services Case Pack (6 units)',
    price: 3750,
    images: ['/assets/images/Screenshot2026-08-13at2.48.55pm_0bac0419-b155-4cdf-ac7f-4842cf6b6824.png'],
  },
];

const Products = () => {
  const [products, setProducts] = useState(defaultFallbackProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getProducts()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn('Using authentic fallback products:', err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div id="shopify-section-main-collection" className="shopify-section">
        <section className={styles.section} aria-label="All Products">
          <div className={styles.container}>
            <div className={styles.headerArea}>
              <h1 className={styles.pageTitle}>Shop All Drizzy</h1>
              <p className={styles.pageSubtitle}>
                100% natural squeezy peanut butter, straight from Texas runner peanuts.
              </p>
            </div>

            {loading && products.length === 0 ? (
              <div className={styles.emptyState}>
                <Spinner size="lg" />
                <p className={styles.emptyDesc} style={{ marginTop: '1rem' }}>
                  Loading delicious peanut butter...
                </p>
              </div>
            ) : products.length === 0 ? (
              <div className={styles.emptyState}>
                <h2 className={styles.emptyTitle}>No products found</h2>
                <p className={styles.emptyDesc}>Check back soon for new roasts and batches!</p>
              </div>
            ) : (
              <div id="ProductGridContainer" className="product-grid-container">
                <div id="product-grid" className={styles.grid}>
                  {products.map((p) => (
                    <ProductCard key={p.slug || p._id || p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
