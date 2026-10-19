import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import styles from './ProductCard.module.css';

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

  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        {/* Card Image */}
        <Link
          to={`/products/${product.slug}`}
          className={styles.imageLink}
          aria-label={`View details for ${product.name}`}
        >
          <div className={styles.imageContainer}>
            <img
              src={primaryImage}
              alt={product.name}
              className={styles.primaryImg}
              loading="eager"
            />
            <img
              src={hoverImage}
              alt=""
              className={styles.hoverImg}
              loading="lazy"
            />
          </div>
        </Link>

        {/* Card Info */}
        <div className={styles.info}>
          <Link
            to={`/products/${product.slug}`}
            className={styles.title}
          >
            {product.name}
          </Link>
          <div className={styles.price}>
            {formatCurrency(product.price)}
          </div>
        </div>

        {/* Add To Cart Button */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={loading}
            className={`button-primary ${styles.addToCartBtn}`}
          >
            <span>{loading ? 'Adding...' : 'ADD TO CART'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
