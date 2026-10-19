import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import styles from './CartDrawer.module.css';

const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    itemCount,
    amountUntilFreeShipping,
    freeShippingProgress,
    isFreeShippingQualified,
  } = useCart();

  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Backdrop overlay */}
      <div
        onClick={closeCart}
        className={styles.backdrop}
      />

      {/* Drawer Container */}
      <div className={styles.drawer}>
        {/* Drawer Header */}
        <div className={styles.header}>
          <div className={styles.headerRow}>
            <div className={styles.titleArea}>
              <span className={styles.title}>Your Cart</span>
              <div className={styles.badge}>{itemCount}</div>
            </div>

            <button
              onClick={closeCart}
              type="button"
              className={styles.closeButton}
              aria-label="Close cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.0008 13.4L7.10078 18.3C6.91745 18.4834 6.68411 18.575 6.40078 18.575C6.11745 18.575 5.88411 18.4834 5.70078 18.3C5.51745 18.1167 5.42578 17.8834 5.42578 17.6C5.42578 17.3167 5.51745 17.0834 5.70078 16.9L10.6008 12L5.70078 7.10005C5.51745 6.91672 5.42578 6.68338 5.42578 6.40005C5.42578 6.11672 5.51745 5.88338 5.70078 5.70005C5.88411 5.51672 6.11745 5.42505 6.40078 5.42505C6.68411 5.42505 6.91745 5.51672 7.10078 5.70005L12.0008 10.6L16.9008 5.70005C17.0841 5.51672 17.3174 5.42505 17.6008 5.42505C17.8841 5.42505 18.1174 5.51672 18.3008 5.70005C18.4841 5.88338 18.5758 6.11672 18.5758 6.40005C18.5758 6.68338 18.4841 6.91672 18.3008 7.10005L13.4008 12L18.3008 16.9C18.4841 17.0834 18.5758 17.3167 18.5758 17.6C18.5758 17.8834 18.4841 18.1167 18.3008 18.3C18.1174 18.4834 17.8841 18.575 17.6008 18.575C17.3174 18.575 17.0841 18.4834 16.9008 18.3L12.0008 13.4Z"
                  fill="#2D0F28"
                />
              </svg>
            </button>
          </div>

          {/* Authentic Freebies / Free Shipping Progress Meter */}
          <div className={styles.shippingMeter}>
            <div className={styles.shippingText}>
              {isFreeShippingQualified ? (
                <span>🎉 You've unlocked <strong>FREE Shipping!</strong></span>
              ) : (
                <span>
                  You're <strong>{formatCurrency(amountUntilFreeShipping)} away</strong> from FREE Shipping!
                </span>
              )}
            </div>

            <div className={styles.progressBarContainer}>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${Math.min(100, freeShippingProgress)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Body */}
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconCircle}>
                <img
                  src="/assets/images/peanut-tiny_edb0d5dd-b629-429d-a3b9-ec4c93589cbb.png"
                  alt=""
                  className={styles.emptyIcon}
                />
              </div>
              <h4 className={styles.emptyTitle}>Your cart is empty</h4>
              <p className={styles.emptyDescription}>
                Looks like you haven't added any squeezy peanut butter to your cart yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  navigate('/products/drizzy-squeezy-peanut-butter-19-4-oz');
                }}
                className={`button-primary ${styles.startSqueezingBtn}`}
              >
                Start Squeezing
              </button>
            </div>
          ) : (
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.itemCard}>
                  {/* Item Image */}
                  <div className={styles.itemImageWrapper}>
                    <img
                      src={item.image || '/assets/images/1_bottle.png'}
                      alt={item.title || item.name}
                      className={styles.itemImage}
                    />
                  </div>

                  {/* Details */}
                  <div className={styles.itemInfo}>
                    <div className={styles.itemTop}>
                      <div>
                        <h5 className={styles.itemName}>
                          {item.title || item.name}
                        </h5>
                        <p className={styles.itemVariant}>
                          {item.variantTitle || `${item.bottleCount} Bottle${item.bottleCount > 1 ? 's' : ''}`}
                          {item.purchaseType === 'subscription' && ' • Subscribe (10% off)'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className={styles.removeButton}
                        aria-label={`Remove ${item.title || item.name} from cart`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className={styles.itemBottom}>
                      <div className={styles.quantityControls}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={styles.qtyBtn}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className={styles.qtyNumber}>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={styles.qtyBtn}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className={styles.itemPrice}>
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span>Subtotal</span>
              <span className={styles.subtotalPrice}>{formatCurrency(subtotal)}</span>
            </div>

            <p className={styles.taxNotice}>
              Taxes and shipping calculated at checkout.
            </p>

            <Link
              to="/cart"
              onClick={closeCart}
              className={`button-primary ${styles.checkoutButton}`}
            >
              <span>CHECKOUT NOW • {formatCurrency(subtotal)}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
