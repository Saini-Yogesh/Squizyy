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
          className="group w-full aspect-[3/4] overflow-hidden relative z-0 border-2 sm:border-3 border-dark-brown rounded-2xl sm:rounded-[22px] bg-white shadow-sm"
        >
          <div className="h-full w-full relative">
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-cover z-10 absolute inset-0 transition-opacity duration-200 ease-in opacity-100 group-hover:opacity-0"
              loading="eager"
            />
            <img
              src={hoverImage}
              alt={product.name}
              className="w-full h-full object-cover z-0 absolute inset-0 transition-opacity duration-200 ease-in opacity-0 group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Card Info */}
        <div className="flex flex-col gap-1.5 z-10 mt-1">
          <Link
            to={`/products/${product.slug}`}
            className="font-mono text-sm sm:text-base text-dark-brown hover:underline leading-snug line-clamp-2"
          >
            {product.name}
          </Link>
          <div className="font-mono text-sm sm:text-base text-dark-brown font-bold">
            ${priceDisplay}
          </div>
        </div>

        {/* Add To Cart Button */}
        <div className="w-full mt-auto pt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full bg-accent-purple hover:bg-[#b885e3] text-dark-brown border-2 border-dark-brown font-champ uppercase text-base sm:text-lg py-3 sm:py-3.5 px-6 rounded-full transition-colors button-primary shadow-sm cursor-pointer disabled:opacity-80"
          >
            <span>{loading ? 'Adding...' : 'ADD TO CART'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
