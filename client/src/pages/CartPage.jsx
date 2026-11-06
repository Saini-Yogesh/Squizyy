import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { checkoutOrder } from '../services/api';
import { formatCurrency } from '../utils/formatters';
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
    state: 'Gujarat',
    zip: '',
  });

  const [checkingOut, setCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (checkingOut) return;
    setErrorMessage('');

    if (!customer.firstName || !customer.email) {
      setErrorMessage('Please fill in your name and email address.');
      return;
    }
    setCheckingOut(true);
    try {
      const orderPayload = {
        customer: {
          firstName: customer.firstName.trim(),
          lastName: customer.lastName ? customer.lastName.trim() : 'Customer',
          email: customer.email.trim(),
          phone: customer.phone ? customer.phone.trim() : '',
        },
        shippingAddress: {
          address1: customer.address1 ? customer.address1.trim() : '123 Market Street',
          city: customer.city ? customer.city.trim() : 'Ahmedabad',
          state: customer.state ? customer.state.trim() : 'Gujarat',
          zip: customer.zip ? customer.zip.trim() : '380001',
          country: 'IN',
        },
        items,
        subtotal,
        shipping,
        tax,
        total,
      };

      const res = await checkoutOrder(orderPayload);
      setOrderConfirmed(res.order || res.data || res);
      clearCart();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Checkout error. Please verify your details and try again.';
      setErrorMessage(msg);
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
            Order ID: <strong>{orderConfirmed.orderNumber || orderConfirmed._id || 'SQUIZYY-ORDER'}</strong>
          </p>
          <p className={styles.confirmedBody}>
            Thank you, {orderConfirmed.customer?.firstName || customer.firstName}! Your delicious Squizyy peanut butter is being prepared for shipment. A confirmation email has been sent to {orderConfirmed.customer?.email || customer.email}.
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
              ? `You're ${formatCurrency(amountUntilFreeShipping)} away from FREE shipping!`
              : '🎉 You unlocked FREE Shipping!'}
          </p>
          <div className={styles.meterTrack}>
            <div
              className={styles.meterFill}
              style={{ width: `${Math.min(100, freeShippingProgress)}%` }}
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
                  </p>
                  <p className={styles.itemPrice}>
                    {formatCurrency(item.price * item.quantity)}
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
                  placeholder="PIN Code"
                  value={customer.zip}
                  onChange={(e) => setCustomer({ ...customer, zip: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.summarySection}>
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(subtotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>GST (5%):</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(tax)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping:</span>
                  <span style={{ fontWeight: 700 }}>
                    {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className={styles.totalRow}>
                  <span>Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={checkingOut}
                className={styles.checkoutSubmitBtn}
              >
                {checkingOut ? 'PROCESSING ORDER...' : 'COMPLETE ORDER'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
