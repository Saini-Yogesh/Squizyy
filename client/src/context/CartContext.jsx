import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'drizzy_cart_v1';
const FREE_SHIPPING_THRESHOLD_CENTS = 4999; // $49.99

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product, selectedOption, purchaseType = 'one-time', deliveryFrequency = '4 weeks', quantity = 1) => {
    // Generate unique ID based on product, bottle count, and purchase type
    const bottleCount = selectedOption?.quantity || 1;
    const unitPrice = purchaseType === 'subscription' 
      ? Math.round((selectedOption?.price || product.price) * 0.9) 
      : (selectedOption?.price || product.price);

    const itemId = `${product.slug}-${bottleCount}-${purchaseType}-${purchaseType === 'subscription' ? deliveryFrequency : ''}`;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          id: itemId,
          productId: product._id || product.slug,
          slug: product.slug,
          title: product.name,
          variantTitle: `${bottleCount}x Bottle${bottleCount > 1 ? 's' : ''}`,
          bottleCount,
          price: unitPrice,
          image: selectedOption?.image || product.images?.[0] || '/assets/images/1_bottle.png',
          purchaseType,
          deliveryFrequency: purchaseType === 'subscription' ? deliveryFrequency : null,
          quantity
        };
        return [...prevItems, newItem];
      }
    });

    openCart();
  };

  const updateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + (item.quantity * (item.bottleCount || 1)), 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD_CENTS || subtotal === 0 ? 0 : 599;
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD_CENTS) * 100));

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      openCart,
      closeCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      shipping,
      total: subtotal + shipping,
      itemCount,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD_CENTS,
      amountUntilFreeShipping,
      freeShippingProgress
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
