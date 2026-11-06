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
    this.shippingThreshold = parseInt(window.themeSettings?.freeShippingThreshold || 49900, 10);
    this.discountInput = document.getElementById('CartDrawerDiscountInput');
    this.discountApplyBtn = document.getElementById('CartDrawerDiscountApply');
    this.discountMsg = document.getElementById('CartDrawerDiscountMsg');
    this.checkoutBtn = document.querySelector('.cart-checkout-btn');

    this.init();
  }

  init() {
    this.bindEvents();
    this.initDiscount();
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
        const packName = addBtn.getAttribute('data-pack-name') || '';
        const properties = {};
        if (packName) {
          properties['Pack Size'] = packName;
        }
        if (variantId && !variantId.startsWith('4400000000')) {
          this.addItem(variantId, quantity, addBtn, properties);
        } else {
          const productLink = addBtn.closest('.product-card')?.querySelector('a')?.href;
          if (productLink) {
            window.location.href = productLink;
          } else {
            alert('Please import products into your Shopify Admin catalog first.');
          }
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

  initDiscount() {
    let savedDiscount = localStorage.getItem('squizyy_discount') || '';
    // Automatically purge legacy test codes so users are never misled
    if (savedDiscount === 'TESTING' || savedDiscount === 'TEST') {
      localStorage.removeItem('squizyy_discount');
      savedDiscount = '';
    }

    if (savedDiscount) {
      if (this.discountInput) this.discountInput.value = savedDiscount;
      this.updateCheckoutUrl(savedDiscount);
      if (this.discountMsg) {
        this.discountMsg.innerHTML = `Promo code "<strong>${this.escapeHtml(savedDiscount)}</strong>" will be applied at checkout. <button type="button" class="cart-discount-remove-link" data-remove-discount style="margin-left:8px;text-decoration:underline;background:none;border:none;cursor:pointer;color:#c5221f;font-weight:700;">Remove</button>`;
        this.discountMsg.className = 'cart-discount-msg success';
        this.discountMsg.style.display = 'block';
        this.bindDiscountRemove();
      }
    }

    if (this.discountApplyBtn && this.discountInput) {
      this.discountApplyBtn.addEventListener('click', () => {
        const code = this.discountInput.value.trim().toUpperCase();
        if (code) {
          localStorage.setItem('squizyy_discount', code);
          this.updateCheckoutUrl(code);
          if (this.discountMsg) {
            this.discountMsg.innerHTML = `Promo code "<strong>${this.escapeHtml(code)}</strong>" will be applied at checkout. <button type="button" class="cart-discount-remove-link" data-remove-discount style="margin-left:8px;text-decoration:underline;background:none;border:none;cursor:pointer;color:#c5221f;font-weight:700;">Remove</button>`;
            this.discountMsg.className = 'cart-discount-msg success';
            this.discountMsg.style.display = 'block';
            this.bindDiscountRemove();
          }
        } else {
          this.clearDiscount();
        }
      });
      this.discountInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.discountApplyBtn.click();
        }
      });
    }
  }

  clearDiscount() {
    localStorage.removeItem('squizyy_discount');
    if (this.discountInput) this.discountInput.value = '';
    if (this.discountMsg) {
      this.discountMsg.style.display = 'none';
      this.discountMsg.innerHTML = '';
    }
    this.updateCheckoutUrl('');
  }

  bindDiscountRemove() {
    if (!this.discountMsg) return;
    const removeBtn = this.discountMsg.querySelector('[data-remove-discount]');
    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.clearDiscount();
      });
    }
  }

  updateCheckoutUrl(code) {
    if (!this.checkoutBtn) return;
    if (code) {
      this.checkoutBtn.href = `/checkout?discount=${encodeURIComponent(code)}`;
    } else {
      this.checkoutBtn.href = '/checkout';
    }
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

  async addItem(variantId, quantity = 1, buttonEl = null, properties = {}) {
    if (buttonEl) {
      buttonEl.setAttribute('disabled', 'disabled');
      buttonEl.dataset.originalText = buttonEl.innerHTML;
      buttonEl.innerHTML = '<span>Adding...</span>';
    }

    try {
      const payload = { id: variantId, quantity };
      if (properties && Object.keys(properties).length > 0) {
        payload.properties = properties;
      }
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.description || 'Add to cart failed');
      }
      await this.refresh();
      this.open();
    } catch (err) {
      console.error('Add to cart error:', err);
      alert(err.message || 'Could not add item to cart. Please try again.');
    } finally {
      if (buttonEl) {
        buttonEl.removeAttribute('disabled');
        buttonEl.innerHTML = buttonEl.dataset.originalText || 'Add to Cart';
      }
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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
    if (isNaN(cents) || cents == null) return '₹0.00';
    const format = window.themeSettings?.moneyFormat || '₹{{amount}}';
    const amountVal = (cents / 100).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const amountNoDecimalsVal = Math.round(cents / 100).toLocaleString('en-IN');
    return format
      .replace(/\{\{\s*amount\s*\}\}/g, amountVal)
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, amountNoDecimalsVal)
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, amountVal)
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/g, amountNoDecimalsVal);
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
          <p class="cart-drawer-empty-desc">Grab a bottle of Squizyy and kiss your spoon goodbye.</p>
          <a href="/collections/all" class="button-primary button-small" style="margin-top: 1rem;">Shop Squizyy</a>
        </div>
      `;
      return;
    }

    let html = '';
    cart.items.forEach((item, index) => {
      const line = index + 1;
      const imageUrl = (item.featured_image && item.featured_image.url)
        ? item.featured_image.url
        : (item.image ? item.image : '');
      const imageTag = imageUrl
        ? `<img src="${imageUrl}" alt="${this.escapeHtml(item.title)}" width="80" height="80">`
        : `<div class="cart-item-placeholder" style="width:80px;height:80px;display:flex;align-items:center;justify-content:center;background:#f4eaff;border-radius:12px;font-size:2rem;">🥜</div>`;

      html += `
        <div class="cart-drawer-item" data-line="${line}">
          <div class="cart-item-image">
            ${imageTag}
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${this.escapeHtml(item.product_title || item.title)}</h4>
            ${item.variant_title && item.variant_title !== 'Default Title' ? `<p class="cart-item-variant">${this.escapeHtml(item.variant_title)}</p>` : (item.properties && item.properties['Pack Size'] ? `<p class="cart-item-variant">${this.escapeHtml(item.properties['Pack Size'])}</p>` : '')}
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
