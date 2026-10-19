import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { checkoutOrder } from '../services/api';
import styles from './CartPage.module.css';

const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    amountUntilFreeShipping,
    freeShippingProgress,
    clearCart,
  } = useCart();

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    city: '',
    state: 'TX',
    zip: '',
  });

  const [checkingOut, setCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customer.firstName || !customer.email) {
      setErrorMessage('Please fill in your name and email address.');
      return;
    }
    setCheckingOut(true);
    try {
      const orderPayload = {
        customer: {
          firstName: customer.firstName,
          lastName: customer.lastName || 'Customer',
          email: customer.email,
          phone: customer.phone,
        },
        shippingAddress: {
          address1: customer.address1 || '123 Main St',
          city: customer.city || 'Dallas',
          state: customer.state || 'TX',
          zip: customer.zip || '75201',
          country: 'US',
        },
        items,
        subtotal,
        shipping,
        tax: Math.round(subtotal * 0.0825),
        total: subtotal + shipping + Math.round(subtotal * 0.0825),
      };

      const res = await checkoutOrder(orderPayload);
      setOrderConfirmed(res.order || res.data || res);
      clearCart();
    } catch {
      setErrorMessage('Checkout error. Please verify your details and try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className={styles.stateCardWrapper}>
        <div className={styles.confirmedCard}>
          <div className={styles.confirmedEmoji}>🎉</div>
          <h1 className={styles.confirmedTitle}>
            Order Confirmed!
          </h1>
          <p className={styles.confirmedId}>
            Order ID: <strong>{orderConfirmed.orderNumber || orderConfirmed._id || 'DRIZZY-ORDER'}</strong>
          </p>
          <p className={styles.confirmedBody}>
            Thank you, {orderConfirmed.customer?.firstName || customer.firstName}! Your delicious Drizzy peanut butter is being prepared for shipment. A confirmation email has been sent to {orderConfirmed.customer?.email || customer.email}.
          </p>
          <Link
            to="/"
            className={styles.backHomeBtn}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <section className={styles.emptyCartSection}>
            <h1 className={styles.emptyTitle}>
              Your cart is empty.
            </h1>
            <Link
              to="/collections/all"
              className={styles.backHomeBtn}
            >
              Continue Shopping
            </Link>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>
          Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
        </h1>

        {/* Free Shipping Meter */}
        <div className={styles.shippingMeterCard}>
          <p className={styles.shippingMeterText}>
            {amountUntilFreeShipping > 0
              ? `You're $${(amountUntilFreeShipping / 100).toFixed(2)} away from FREE shipping!`
              : '🎉 You unlocked FREE Shipping!'}
          </p>
          <div className={styles.meterTrack}>
            <div
              className={styles.meterFill}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className={styles.cartLayout}>
          {/* Cart Items List */}
          <div className={styles.itemsList}>
            {items.map((item) => (
              <div
                key={item.id}
                className={styles.cartItem}
              >
                <div className={styles.itemThumbWrapper}>
                  <img
                    src={item.image || '/assets/images/1_bottle.png'}
                    alt={item.title}
                    className={styles.itemThumb}
                  />
                </div>

                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>
                    {item.title}
                  </h3>
                  <p className={styles.itemOption}>
                    {item.option?.title || `${item.option?.quantity || 1} Bottle`}
                    {item.purchaseType === 'subscription' && ' • Subscribe & Save'}
                  </p>
                  <p className={styles.itemPrice}>
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </p>

                  {/* Quantity selector */}
                  <div className={styles.quantityRow}>
                    <div className={styles.quantityGroup}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={styles.qtyButton}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className={styles.qtyValue}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={styles.qtyButton}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className={styles.removeBtn}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Box */}
          <div className={styles.checkoutBox}>
            <h2 className={styles.checkoutTitle}>
              Order Summary
            </h2>

            {errorMessage && (
              <div style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }} role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleCheckout} className={styles.formFields}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  required
                  placeholder="First Name *"
                  value={customer.firstName}
                  onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                  className={styles.formInput}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={customer.lastName}
                  onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <input
                type="email"
                required
                placeholder="Email Address *"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className={styles.formInput}
              />

              <input
                type="text"
                placeholder="Shipping Street Address"
                value={customer.address1}
                onChange={(e) => setCustomer({ ...customer, address1: e.target.value })}
                className={styles.formInput}
              />

              <div className={styles.formRow3}>
                <input
                  type="text"
                  placeholder="City"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className={styles.formInput}
                />
                <input
                  type="text"
                  placeholder="State"
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  className={styles.formInput}
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  value={customer.zip}
                  onChange={(e) => setCustomer({ ...customer, zip: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.summarySection}>
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span style={{ fontWeight: 700 }}>${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping:</span>
                  <span style={{ fontWeight: 700 }}>
                    {shipping === 0 ? 'FREE' : `$${(shipping / 100).toFixed(2)}`}
                  </span>
                </div>
                <div className={styles.totalRow}>
                  <span>Total:</span>
                  <span>${((subtotal + shipping) / 100).toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={checkingOut}
                className={styles.checkoutSubmitBtn}
              >
                {checkingOut ? 'Processing...' : 'Complete Checkout'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
