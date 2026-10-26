/**
 * Squizyy Shopify Theme — Ajax Cart API Controller
 */

class SquizyyCart {
  constructor() {
    this.cartDrawer = document.getElementById('CartDrawer');
    this.cartOverlay = document.getElementById('CartDrawerOverlay');
    this.cartItemsContainer = document.getElementById('CartDrawerItems');
    this.cartCountBadges = document.querySelectorAll('[data-cart-count]');
    this.cartSubtotalEl = document.getElementById('CartDrawerSubtotal');
    this.shippingBarFill = document.getElementById('ShippingProgressFill');
    this.shippingBarText = document.getElementById('ShippingProgressText');
    this.shippingThreshold = parseInt(window.themeSettings?.freeShippingThreshold || 4999, 10);

    this.init();
  }

  init() {
    this.bindEvents();
    this.refresh();
  }

  bindEvents() {
    document.querySelectorAll('[data-open-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    document.querySelectorAll('[data-close-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    });

    if (this.cartOverlay) {
      this.cartOverlay.addEventListener('click', () => this.close());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        e.preventDefault();
        const variantId = addBtn.getAttribute('data-variant-id');
        const quantity = parseInt(addBtn.getAttribute('data-quantity') || '1', 10);
        if (variantId) {
          this.addItem(variantId, quantity, addBtn);
        }
      }

      const qtyBtn = e.target.closest('[data-cart-qty-change]');
      if (qtyBtn) {
        e.preventDefault();
        const line = parseInt(qtyBtn.getAttribute('data-line'), 10);
        const delta = parseInt(qtyBtn.getAttribute('data-cart-qty-change'), 10);
        const currentQty = parseInt(qtyBtn.getAttribute('data-current-qty'), 10);
        const newQty = Math.max(0, currentQty + delta);
        this.updateItem(line, newQty);
      }

      const removeBtn = e.target.closest('[data-cart-remove]');
      if (removeBtn) {
        e.preventDefault();
        const line = parseInt(removeBtn.getAttribute('data-line'), 10);
        this.updateItem(line, 0);
      }
    });
  }

  isOpen() {
    return this.cartDrawer && this.cartDrawer.classList.contains('active');
  }

  open() {
    if (!this.cartDrawer) return;
    this.cartDrawer.classList.add('active');
    if (this.cartOverlay) this.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.cartDrawer) return;
    this.cartDrawer.classList.remove('active');
    if (this.cartOverlay) this.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  async getCart() {
    try {
      const res = await fetch('/cart.js');
      return await res.json();
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      return null;
    }
  }

  async refresh() {
    const cart = await this.getCart();
    if (cart) {
      this.render(cart);
    }
  }

  async addItem(variantId, quantity = 1, buttonEl = null) {
    if (buttonEl) {
      buttonEl.setAttribute('disabled', 'disabled');
      buttonEl.dataset.originalText = buttonEl.innerHTML;
      buttonEl.innerHTML = '<span>Adding...</span>';
    }

    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity })
      });

      if (!res.ok) throw new Error('Add to cart failed');
      const item = await res.json();
      await this.refresh();
      this.open();
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Could not add item to cart. Please try again.');
    } finally {
      if (buttonEl) {
        buttonEl.removeAttribute('disabled');
        buttonEl.innerHTML = buttonEl.dataset.originalText || 'Add to Cart';
      }
    }
  }

  async updateItem(line, quantity) {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line, quantity })
      });

      if (!res.ok) throw new Error('Update cart failed');
      const cart = await res.json();
      this.render(cart);
    } catch (err) {
      console.error('Update item error:', err);
    }
  }

  formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  render(cart) {
    this.cartCountBadges.forEach(badge => {
      badge.textContent = cart.item_count;
      badge.style.display = cart.item_count > 0 ? 'inline-flex' : 'none';
    });

    if (this.cartSubtotalEl) {
      this.cartSubtotalEl.textContent = this.formatMoney(cart.total_price);
    }

    if (this.shippingBarFill && this.shippingBarText) {
      const remaining = this.shippingThreshold - cart.total_price;
      const percent = Math.min(100, Math.max(0, (cart.total_price / this.shippingThreshold) * 100));
      this.shippingBarFill.style.width = `${percent}%`;

      if (remaining <= 0) {
        this.shippingBarText.innerHTML = `🎉 <strong>You've unlocked FREE Shipping!</strong>`;
        this.shippingBarFill.style.backgroundColor = 'var(--color-accent-green, #036e2c)';
      } else {
        this.shippingBarText.innerHTML = `Add <strong>${this.formatMoney(remaining)}</strong> more for <strong>FREE Shipping!</strong>`;
        this.shippingBarFill.style.backgroundColor = 'var(--color-accent-purple, #ca9af1)';
      }
    }

    if (!this.cartItemsContainer) return;

    if (cart.item_count === 0) {
      this.cartItemsContainer.innerHTML = `
        <div class="cart-drawer-empty">
          <div class="cart-drawer-empty-icon">🥜</div>
          <p class="cart-drawer-empty-title">Your cart is empty!</p>
          <p class="cart-drawer-empty-desc">Grab a bottle of Drizzy and kiss your spoon goodbye.</p>
          <a href="/collections/all" class="button-primary button-small" style="margin-top: 1rem;">Shop Drizzy</a>
        </div>
      `;
      return;
    }

    let html = '';
    cart.items.forEach((item, index) => {
      const line = index + 1;
      html += `
        <div class="cart-drawer-item" data-line="${line}">
          <div class="cart-item-image">
            <img src="${item.featured_image.url}" alt="${item.title}" width="80" height="80">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.product_title}</h4>
            ${item.variant_title ? `<p class="cart-item-variant">${item.variant_title}</p>` : ''}
            <div class="cart-item-price">${this.formatMoney(item.final_line_price)}</div>
            
            <div class="cart-item-controls">
              <div class="cart-qty-picker">
                <button type="button" class="cart-qty-btn" data-cart-qty-change="-1" data-line="${line}" data-current-qty="${item.quantity}">-</button>
                <span class="cart-qty-val">${item.quantity}</span>
                <button type="button" class="cart-qty-btn" data-cart-qty-change="1" data-line="${line}" data-current-qty="${item.quantity}">+</button>
              </div>
              <button type="button" class="cart-item-remove" data-cart-remove data-line="${line}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    this.cartItemsContainer.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.squizyyCart = new SquizyyCart();
});
