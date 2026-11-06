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
    this.purchaseTypeRadios = this.container.querySelectorAll('input[name="purchase_type"]');
    this.addToCartBtn = this.container.querySelector('[data-add-to-cart-main]');
    this.mainImage = document.querySelector('[data-pdp-main-image]');
    this.thumbs = document.querySelectorAll('[data-pdp-thumb]');

    this.basePrice = parseFloat(this.container.getAttribute('data-base-price') || '349.00');
    this.selectedBottles = 1;
    this.selectedType = 'onetime';

    this.discounts = { 1: 0, 2: 0.10, 3: 0.15, 6: 0.20 };
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCalculation();
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

    this.purchaseTypeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        this.selectedType = radio.value;
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
    const rawTotal = this.basePrice * this.selectedBottles;
    let discountPct = this.discounts[this.selectedBottles] || 0;
    if (this.selectedType === 'subscribe') {
      discountPct += 0.15;
    }

    const finalPrice = rawTotal * (1 - discountPct);
    const savings = rawTotal - finalPrice;

    if (this.priceDisplay) {
      this.priceDisplay.textContent = this.formatMoney(finalPrice);
    }

    if (this.comparePriceDisplay) {
      if (discountPct > 0) {
        this.comparePriceDisplay.textContent = this.formatMoney(rawTotal);
        this.comparePriceDisplay.style.display = 'inline';
      } else {
        this.comparePriceDisplay.style.display = 'none';
      }
    }

    if (this.savingsBadge) {
      if (savings > 0) {
        this.savingsBadge.textContent = `Save ${this.formatMoney(savings)} (${Math.round(discountPct * 100)}%)`;
        this.savingsBadge.style.display = 'inline-block';
      } else {
        this.savingsBadge.style.display = 'none';
      }
    }

    if (this.addToCartBtn) {
      this.addToCartBtn.setAttribute('data-quantity', this.selectedBottles);
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
