import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, Truck } from 'lucide-react';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    itemCount,
    freeShippingThreshold,
    amountToFreeShipping,
    freeShippingProgress,
    isFreeShippingQualified,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 h-screen w-screen pointer-events-auto"
      style={{ height: '100dvh' }}
    >
      {/* Backdrop overlay */}
      <div
        onClick={closeCart}
        className="absolute inset-0 z-0 h-screen w-screen bg-black/40 backdrop-blur-[2px] transition-opacity duration-200"
      />

      {/* Drawer */}
      <div
        className="bg-background color-scheme-1 absolute right-0 top-0 z-10 h-screen w-full md:w-[24rem] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out border-l-2 border-dark-brown"
        style={{ height: '100dvh' }}
      >
        {/* Drawer Header */}
        <div className="cart-drawer--header border-b border-dark-brown/15 p-4">
          <div className="flex items-center justify-between font-primary">
            <div className="flex items-center">
              <span className="text-body2 font-primary text-foreground uppercase tracking-tight font-bold">
                Your Cart
              </span>
              <div className="text-caption font-primary bg-accent-purple text-dark-brown rounded-full w-6 h-6 flex items-center justify-center ml-2 font-bold border border-dark-brown">
                {itemCount}
              </div>
            </div>

            <button
              onClick={closeCart}
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-dark-brown/10 text-foreground transition-colors"
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
          <div className="mt-3 py-3 px-3.5 rounded-[12px] bg-accent-purple border-x-[2px] border-t-[2px] border-b-[4px] border-dark-brown">
            <div className="text-center font-secondary text-[11px] font-bold text-dark-brown">
              {isFreeShippingQualified ? (
                <span>🎉 You've unlocked <strong>FREE Shipping!</strong></span>
              ) : (
                <span>
                  You're <strong>${(amountToFreeShipping / 100).toFixed(2)} away</strong> from FREE Shipping!
                </span>
              )}
            </div>

            <div className="mt-2.5 relative">
              <div className="h-2 w-full rounded-full bg-cream border border-dark-brown overflow-hidden">
                <div
                  className="h-full bg-dark-brown transition-all duration-300"
                  style={{ width: `${Math.min(100, freeShippingProgress)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
              <div className="w-16 h-16 rounded-full bg-accent-purple/30 border-2 border-dark-brown flex items-center justify-center">
                <img
                  src="/assets/images/peanut-tiny_edb0d5dd-b629-429d-a3b9-ec4c93589cbb.png"
                  alt="Empty cart"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h4 className="font-primary text-xl uppercase text-foreground">
                Your cart is empty
              </h4>
              <p className="font-secondary text-xs text-foreground/70 max-w-xs">
                Looks like you haven't added any squeezy peanut butter to your cart yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  navigate('/products/drizzy-squeezy-peanut-butter-19-4-oz');
                }}
                className="button-primary py-3 px-6 text-sm mt-2"
              >
                Start Squeezing
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedOption?.quantity}-${item.purchaseType}`}
                  className="flex gap-3 p-3 rounded-2xl bg-white border-2 border-dark-brown shadow-sm"
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-xl border border-dark-brown/20 bg-background flex items-center justify-center p-1 shrink-0 overflow-hidden">
                    <img
                      src={item.image || '/assets/images/USADRIZZYFRONTcopy_1.jpg'}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-1 min-w-0 justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-primary text-xs uppercase text-foreground truncate max-w-[140px]">
                          {item.name}
                        </h5>
                        <p className="font-secondary text-[11px] text-foreground/70">
                          {item.selectedOption?.title || 'Single Bottle'}
                          {item.purchaseType === 'subscription' && ' • Subscribe (10% off)'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId, item.selectedOption?.quantity, item.purchaseType)}
                        className="text-foreground/40 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-dark-brown rounded-full px-2 py-0.5 bg-background">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedOption?.quantity, item.purchaseType)}
                          className="text-foreground p-0.5 hover:opacity-70"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-primary text-xs px-2">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedOption?.quantity, item.purchaseType)}
                          className="text-foreground p-0.5 hover:opacity-70"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="font-primary text-sm text-foreground">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.items.length > 0 && (
          <div className="cart-drawer--footer border-t-2 border-dark-brown p-4 bg-white/50 backdrop-blur-sm space-y-3">
            <div className="flex items-center justify-between font-primary text-base text-foreground">
              <span className="uppercase">Subtotal</span>
              <span className="text-lg">${(subtotal / 100).toFixed(2)}</span>
            </div>

            <p className="font-secondary text-[10px] text-foreground/60 text-center">
              Taxes and shipping calculated at checkout.
            </p>

            <Link
              to="/cart"
              onClick={closeCart}
              className="button-primary w-full py-4 text-center text-base flex items-center justify-center gap-2 shadow-lg"
            >
              <span>CHECKOUT NOW • ${(subtotal / 100).toFixed(2)}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
