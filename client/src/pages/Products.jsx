import React, { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../services/api';

const defaultFallbackProducts = [
  {
    id: '8932474355883',
    slug: 'drizzy-squeezy-peanut-butter-19-4-oz',
    name: 'Drizzy Squeezy Peanut Butter 19.4 Oz',
    price: 999,
    images: ['/assets/images/DRIZZY12302.jpg', '/assets/images/USADRIZZYFRONTcopy.jpg']
  },
  {
    id: '8932545495211',
    slug: 'food-services-pack-6-units',
    name: 'Food Services Case Pack (6 units)',
    price: 3750,
    images: ['/assets/images/Screenshot2026-08-13at2.48.55pm_0bac0419-b155-4cdf-ac7f-4842cf6b6824.png']
  }
];

const Products = () => {
  const [products, setProducts] = useState(defaultFallbackProducts);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn('Using authentic fallback products:', err);
      });
  }, []);

  return (
    <div className="w-full">
      <div id="shopify-section-template--22221105561771__main-collection" className="shopify-section">
        <section className="relative grid items-center bg-background bg-gradient text-foreground color-scheme-1 py-10 lg:py-16">
          <div className="container relative flex flex-col mx-auto px-4 max-w-[87.5rem]">
            {/* Header / Product count */}
            <div className="flex justify-between items-center mb-6 lg:mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase text-dark-brown">
                Products
              </h1>
              <div className="text-[14px] tracking-[-0.01em] leading-[120%] font-body text-dark-brown/70 flex gap-1 ml-auto">
                <span>{products.length}</span> Products
              </div>
            </div>

            {/* Product Grid */}
            <div id="ProductGridContainer" className="product-grid-container w-full">
              <div
                id="product-grid"
                className="grid collection product-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-content-stretch"
              >
                {products.map((p) => (
                  <ProductCard key={p.slug || p._id} product={p} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
