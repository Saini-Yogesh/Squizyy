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

    this.basePrice = parseFloat(this.container.getAttribute('data-base-price') || '19.99');
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

    const accordions = document.querySelectorAll('[data-accordion-toggle]');
    accordions.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const item = toggle.closest('.accordion-item');
        if (item) {
          item.classList.toggle('open');
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
      this.priceDisplay.textContent = '$' + finalPrice.toFixed(2);
    }

    if (this.comparePriceDisplay) {
      if (discountPct > 0) {
        this.comparePriceDisplay.textContent = '$' + rawTotal.toFixed(2);
        this.comparePriceDisplay.style.display = 'inline';
      } else {
        this.comparePriceDisplay.style.display = 'none';
      }
    }

    if (this.savingsBadge) {
      if (savings > 0) {
        this.savingsBadge.textContent = `Save $${savings.toFixed(2)} (${Math.round(discountPct * 100)}%)`;
        this.savingsBadge.style.display = 'inline-block';
      } else {
        this.savingsBadge.style.display = 'none';
      }
    }

    if (this.addToCartBtn) {
      this.addToCartBtn.setAttribute('data-quantity', this.selectedBottles);
      this.addToCartBtn.innerHTML = `<span>Add to Cart — $${finalPrice.toFixed(2)}</span>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SquizyyProduct();
});
