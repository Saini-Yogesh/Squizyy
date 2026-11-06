/**
 * Squizyy Shopify Theme — Product Page & Bottle Selector Controller
 */

class SquizyyProduct {
  constructor() {
    this.container = document.querySelector('[data-product-buy-box]');
    if (!this.container) return;

    this.bottleButtons = this.container.querySelectorAll('[data-bottle-count]');
    this.priceDisplay = this.container.querySelector('[data-product-price]');
    this.comparePriceDisplay = this.container.querySelector('[data-compare-price]');
    this.savingsBadge = this.container.querySelector('[data-savings-badge]');
    this.addToCartBtn = this.container.querySelector('[data-add-to-cart-main]');
    this.mainImage = document.querySelector('[data-pdp-main-image]');
    this.thumbs = document.querySelectorAll('[data-pdp-thumb]');

    this.basePrice = parseFloat(this.container.getAttribute('data-base-price') || '349.00');
    this.defaultVariantId = this.addToCartBtn ? this.addToCartBtn.getAttribute('data-variant-id') : null;
    this.selectedBottles = 1;

    // Load variants data if provided in JSON script
    this.variants = [];
    const variantsEl = document.querySelector('[data-product-variants]');
    if (variantsEl) {
      try {
        this.variants = JSON.parse(variantsEl.textContent || '[]');
      } catch (e) {
        console.warn('Could not parse variants JSON:', e);
      }
    }

    this.discounts = { 1: 0, 2: 0.10, 3: 0.15 };
    this.packNames = { 1: '1-Pack', 2: '2-Pack', 3: '3-Pack' };

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCalculation();
  }

  findMatchingVariant(count) {
    if (!this.variants || this.variants.length <= 1) return null;
    const searchTerms = [
      `${count}-pack`,
      `${count} pack`,
      `pack of ${count}`,
      `${count} bottle`,
      `${count}x`,
      `pack ${count}`
    ];

    return this.variants.find(v => {
      const title = (v.title || '').toLowerCase();
      if (searchTerms.some(term => title.includes(term))) return true;

      return [v.option1, v.option2, v.option3].some(opt => {
        if (!opt) return false;
        const o = String(opt).toLowerCase().trim();
        return o === String(count) || searchTerms.some(term => o.includes(term));
      });
    });
  }

  bindEvents() {
    this.bottleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.bottleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedBottles = parseInt(btn.getAttribute('data-bottle-count'), 10);
        this.updateCalculation();
      });
    });

    this.thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        this.thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const newSrc = thumb.getAttribute('data-image-src');
        if (this.mainImage && newSrc) {
          this.mainImage.src = newSrc;
        }
      });
    });
  }

  updateCalculation() {
    const count = this.selectedBottles;
    const packName = this.packNames[count] || `${count}-Pack`;
    const matchedVariant = this.findMatchingVariant(count);

    let finalPrice;
    let rawTotal = this.basePrice * count;
    let savings = 0;
    let discountPct = this.discounts[count] || 0;

    if (matchedVariant) {
      finalPrice = matchedVariant.price / 100.0;
      if (matchedVariant.compare_at_price && matchedVariant.compare_at_price > matchedVariant.price) {
        rawTotal = matchedVariant.compare_at_price / 100.0;
      } else {
        rawTotal = this.basePrice * count;
      }
      savings = Math.max(0, rawTotal - finalPrice);
      discountPct = rawTotal > 0 ? (savings / rawTotal) : 0;

      if (this.addToCartBtn) {
        this.addToCartBtn.setAttribute('data-variant-id', matchedVariant.id);
        this.addToCartBtn.setAttribute('data-quantity', '1');
        this.addToCartBtn.setAttribute('data-pack-name', matchedVariant.title);
      }
    } else {
      finalPrice = rawTotal * (1 - discountPct);
      savings = rawTotal - finalPrice;

      if (this.addToCartBtn) {
        if (this.defaultVariantId) {
          this.addToCartBtn.setAttribute('data-variant-id', this.defaultVariantId);
        }
        this.addToCartBtn.setAttribute('data-quantity', count);
        this.addToCartBtn.setAttribute('data-pack-name', packName);
      }
    }

    if (this.priceDisplay) {
      this.priceDisplay.textContent = this.formatMoney(finalPrice);
    }

    if (this.comparePriceDisplay) {
      if (savings > 0 || discountPct > 0) {
        this.comparePriceDisplay.textContent = this.formatMoney(rawTotal);
        this.comparePriceDisplay.style.display = 'inline';
      } else {
        this.comparePriceDisplay.style.display = 'none';
      }
    }

    if (this.savingsBadge) {
      if (savings > 0 && discountPct > 0) {
        this.savingsBadge.textContent = `Save ${this.formatMoney(savings)} (${Math.round(discountPct * 100)}%)`;
        this.savingsBadge.style.display = 'inline-block';
      } else {
        this.savingsBadge.style.display = 'none';
      }
    }

    if (this.addToCartBtn) {
      this.addToCartBtn.innerHTML = `<span>Add to Cart — ${this.formatMoney(finalPrice)}</span>`;
    }
  }

  formatMoney(amount) {
    if (isNaN(amount) || amount == null) return '₹0.00';
    const cents = Math.round(amount * 100);
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
}

document.addEventListener('DOMContentLoaded', () => {
  new SquizyyProduct();
});
