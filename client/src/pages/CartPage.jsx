import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { checkoutOrder } from '../services/api';

const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
    amountUntilFreeShipping,
    freeShippingProgress,
    clearCart
  } = useCart();

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    city: '',
    state: 'TX',
    zip: ''
  });

  const [checkingOut, setCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!customer.firstName || !customer.email) {
      alert('Please fill in your name and email address.');
      return;
    }
    setCheckingOut(true);
    try {
      const orderPayload = {
        customer: {
          firstName: customer.firstName,
          lastName: customer.lastName || 'Customer',
          email: customer.email,
          phone: customer.phone
        },
        shippingAddress: {
          address1: customer.address1 || '123 Main St',
          city: customer.city || 'Dallas',
          state: customer.state || 'TX',
          zip: customer.zip || '75201',
          country: 'US'
        },
        items,
        subtotal,
        shipping,
        tax: Math.round(subtotal * 0.0825),
        total: subtotal + shipping + Math.round(subtotal * 0.0825)
      };

      const res = await checkoutOrder(orderPayload);
      setOrderConfirmed(res.order);
      clearCart();
    } catch {
      alert('Checkout error. Please verify your details.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="py-20 px-4 max-w-2xl mx-auto text-center">
        <div className="bg-cream border-4 border-b-8 border-dark-brown rounded-3xl p-8 sm:p-12 shadow-2xl text-dark-brown">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="font-champ text-3xl sm:text-4xl uppercase text-dark-brown mb-3">
            Order Confirmed!
          </h1>
          <p className="font-mono text-sm mb-6 text-dark-brown/80">
            Order ID: <strong>{orderConfirmed.orderNumber}</strong>
          </p>
          <p className="font-body text-base text-dark-brown/90 mb-8 leading-relaxed">
            Thank you, {orderConfirmed.customer?.firstName}! Your delicious Drizzy peanut butter is being prepared for shipment. A confirmation email has been sent to {orderConfirmed.customer?.email}.
          </p>
          <Link
            to="/"
            className="inline-flex uppercase font-champ text-lg py-4 px-8 bg-accent-purple text-dark-brown border-2 border-dark-brown rounded-full hover:bg-cream button-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full">
        <div id="shopify-section-template--22221105496235__main" className="shopify-section">
          <section id="main-cart" className="container bg-background bg-gradient text-foreground color-scheme-1 py-20 mx-auto px-4 max-w-[87.5rem]">
            <div className="flex flex-col justify-center items-center w-full gap-8 mb-20 text-center">
              <h3 className="text-3xl lg:text-5xl font-champ uppercase text-dark-brown tracking-tight">
                Your cart is empty.
              </h3>
              <Link
                to="/collections/all"
                className="inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit text-[16px] lg:text-[20px] font-champ leading-[100%] py-4 px-8 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary"
              >
                Continue Shopping
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-cream py-10 lg:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase text-dark-brown mb-8">
          Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
        </h1>

        {/* Free Shipping Meter */}
        <div className="mb-8 p-4 bg-white border-2 border-dark-brown rounded-2xl shadow-sm">
          <p className="text-xs sm:text-sm font-mono font-bold uppercase text-dark-brown mb-2 text-center">
            {amountUntilFreeShipping > 0
              ? `You're $${(amountUntilFreeShipping / 100).toFixed(2)} away from FREE shipping!`
              : '🎉 You unlocked FREE Shipping!'}
          </p>
          <div className="w-full bg-cream rounded-full h-3 border border-dark-brown overflow-hidden">
            <div
              className="bg-accent-purple h-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-dark-brown rounded-2xl p-4 sm:p-5 flex gap-4 items-center shadow-sm"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl border border-dark-brown/20 overflow-hidden bg-cream flex-shrink-0">
                  <img
                    src={item.image || '/assets/images/1_bottle.png'}
                    alt={item.title}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-champ text-base sm:text-lg uppercase text-dark-brown truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-dark-brown/70 mt-0.5">
                    {item.option?.title || `${item.option?.quantity || 1} Bottle`}
                    {item.purchaseType === 'subscription' && ' • Subscribe & Save'}
                  </p>
                  <p className="font-champ text-base text-dark-brown mt-1">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </p>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-dark-brown rounded-full overflow-hidden bg-cream">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 font-bold text-dark-brown hover:bg-dark-brown hover:text-cream transition-colors text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-mono text-xs font-bold text-dark-brown">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 font-bold text-dark-brown hover:bg-dark-brown hover:text-cream transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-mono text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Box */}
          <div className="lg:col-span-5 bg-white border-4 border-b-8 border-dark-brown rounded-3xl p-6 sm:p-8 shadow-xl text-dark-brown">
            <h2 className="font-champ text-2xl uppercase text-dark-brown mb-6">
              Order Summary
            </h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="First Name *"
                  value={customer.firstName}
                  onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                  className="bg-cream border border-dark-brown rounded px-3 py-2 text-xs font-mono text-dark-brown focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={customer.lastName}
                  onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                  className="bg-cream border border-dark-brown rounded px-3 py-2 text-xs font-mono text-dark-brown focus:outline-none"
                />
              </div>

              <input
                type="email"
                required
                placeholder="Email Address *"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="w-full bg-cream border border-dark-brown rounded px-3 py-2 text-xs font-mono text-dark-brown focus:outline-none"
              />

              <input
                type="text"
                placeholder="Shipping Street Address"
                value={customer.address1}
                onChange={(e) => setCustomer({ ...customer, address1: e.target.value })}
                className="w-full bg-cream border border-dark-brown rounded px-3 py-2 text-xs font-mono text-dark-brown focus:outline-none"
              />

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="bg-cream border border-dark-brown rounded px-3 py-2 text-xs font-mono text-dark-brown focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  className="bg-cream border border-dark-brown rounded px-3 py-2 text-xs font-mono text-dark-brown focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  value={customer.zip}
                  onChange={(e) => setCustomer({ ...customer, zip: e.target.value })}
                  className="bg-cream border border-dark-brown rounded px-3 py-2 text-xs font-mono text-dark-brown focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-dark-brown/15 space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-bold">
                    {shipping === 0 ? 'FREE' : `$${(shipping / 100).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-dark-brown/15 text-lg font-champ">
                  <span>Total:</span>
                  <span>${((subtotal + shipping) / 100).toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={checkingOut}
                className="w-full bg-accent-purple text-dark-brown border-2 border-dark-brown rounded-full py-4 px-6 font-champ text-xl uppercase tracking-wide button-primary hover:bg-cream disabled:opacity-50 mt-4"
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
