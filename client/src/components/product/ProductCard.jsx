import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const defaultOption = product.bottleOptions?.[0] || { quantity: 1, price: product.price || 999 };
    addToCart(product, defaultOption, 'one-time', null, 1);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const primaryImage = product.images?.[0] || '/assets/images/DRIZZY12302.jpg';
  const hoverImage = product.images?.[1] || product.images?.[0] || '/assets/images/USADRIZZYFRONTcopy.jpg';
  const priceDisplay = (product.price / 100).toFixed(2);

  return (
    <div className="h-full w-full product-card relative">
      <div className="flex h-full w-full flex-col gap-3">
        {/* Card Image */}
        <Link
          to={`/products/${product.slug}`}
          className="group w-full !aspect-[3/4] overflow-hidden relative z-0 border-x-[2px] border-t-[2px] border-b-[4px] border-dark-brown rounded-[16px] bg-cream"
        >
          <div className="h-full w-full relative">
            <img
              src={primaryImage}
              alt={product.name}
              className="aspect-auto w-full object-cover w-full h-auto !aspect-[3/4] z-10 absolute inset-0 transition-opacity duration-200 ease-in opacity-100 group-hover:opacity-0"
              loading="eager"
            />
            <img
              src={hoverImage}
              alt={product.name}
              className="aspect-auto w-full object-cover w-full h-auto !aspect-[3/4] z-0 absolute inset-0 transition-opacity duration-200 ease-in opacity-0 group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Card Info */}
        <div className="flex flex-col gap-2 z-10">
          <Link
            to={`/products/${product.slug}`}
            className="transition-colors text-[14px] lg:text-[16px] font-body tracking-[-0.01em] leading-[120%] text-dark-brown hover:text-dark-brown/80"
          >
            {product.name}
          </Link>
          <div className="text-[14px] lg:text-[16px] font-body tracking-[-0.01em] leading-[120%] text-dark-brown font-semibold">
            ${priceDisplay}
          </div>
        </div>

        {/* Add To Cart Button */}
        <div className="w-full mt-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={loading}
            className="AddToCart relative !w-full inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full text-[16px] lg:text-[20px] font-champ leading-[100%] py-4 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream disabled:opacity-80 button-primary"
          >
            <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
