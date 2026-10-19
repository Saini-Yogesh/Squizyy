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
  const toggleCart = () => setIsOpen(prev => !prev);

  const addToCart = (product, selectedOption, purchaseType = 'one-time', deliveryFrequency = '4 weeks', quantity = 1) => {
    if (!product) return;
    const bottleCount = selectedOption?.quantity || 1;
    const rawPrice = selectedOption?.price || product.price || 999;
    const unitPrice = purchaseType === 'subscription' 
      ? Math.round(rawPrice * 0.9) 
      : rawPrice;

    const itemId = `${product.slug || product._id || 'drizzy-pb'}-${bottleCount}-${purchaseType}-${purchaseType === 'subscription' ? deliveryFrequency : ''}`;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          id: itemId,
          productId: product._id || product.slug || 'drizzy-pb',
          slug: product.slug || 'drizzy-squeezy-peanut-butter-19-4-oz',
          title: product.name || 'Drizzy Squeezy Peanut Butter',
          name: product.name || 'Drizzy Squeezy Peanut Butter',
          variantTitle: `${bottleCount}x Bottle${bottleCount > 1 ? 's' : ''}`,
          bottleCount,
          price: unitPrice,
          image: selectedOption?.image || product.images?.[0] || '/assets/images/1_bottle.png',
          purchaseType,
          deliveryFrequency: purchaseType === 'subscription' ? deliveryFrequency : null,
          quantity: Math.max(1, quantity),
          selectedOption: selectedOption || { quantity: bottleCount, price: unitPrice }
        };
        return [...prevItems, newItem];
      }
    });

    openCart();
  };

  /**
   * Overloaded updateQuantity to accept either itemId or (productId, newQty, bottleCount, purchaseType)
   */
  const updateQuantity = (idOrProductId, newQty, bottleCount, purchaseType) => {
    if (newQty <= 0) {
      removeFromCart(idOrProductId, bottleCount, purchaseType);
      return;
    }
    setItems(prev => prev.map(item => {
      if (item.id === idOrProductId) {
        return { ...item, quantity: newQty };
      }
      if (bottleCount !== undefined && item.productId === idOrProductId && item.bottleCount === bottleCount && (!purchaseType || item.purchaseType === purchaseType)) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  /**
   * Overloaded removeFromCart to accept either itemId or (productId, bottleCount, purchaseType)
   */
  const removeFromCart = (idOrProductId, bottleCount, purchaseType) => {
    setItems(prev => prev.filter(item => {
      if (item.id === idOrProductId) return false;
      if (bottleCount !== undefined && item.productId === idOrProductId && item.bottleCount === bottleCount && (!purchaseType || item.purchaseType === purchaseType)) {
        return false;
      }
      return true;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + (item.quantity * (item.bottleCount || 1)), 0);
  const totalBottleUnits = itemCount;
  const isFreeShippingQualified = subtotal >= FREE_SHIPPING_THRESHOLD_CENTS;
  const shipping = isFreeShippingQualified || subtotal === 0 ? 0 : 599;
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotal);
  const amountToFreeShipping = amountUntilFreeShipping;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD_CENTS) * 100));

  const contextValue = {
    // Items state
    items,
    cart: { items },
    
    // Drawer visibility (both names supported for 100% compatibility)
    isOpen,
    isCartOpen: isOpen,
    openCart,
    closeCart,
    toggleCart,
    
    // Mutation methods
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    
    // Financial metrics
    subtotal,
    shipping,
    total: subtotal + shipping,
    itemCount,
    totalBottleUnits,
    
    // Free shipping meter
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD_CENTS,
    amountUntilFreeShipping,
    amountToFreeShipping,
    freeShippingProgress,
    isFreeShippingQualified
  };

  return (
    <CartContext.Provider value={contextValue}>
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

export default CartContext;
