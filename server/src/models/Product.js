const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sku: { type: String, default: '' },
  price: { type: Number, required: true }, // in cents, e.g. 999 = $9.99
  compareAtPrice: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  bottleCount: { type: Number, default: 1 },
  badge: { type: String, default: '' },
  savingsText: { type: String, default: '' }
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true }, // base unit price in cents
  compareAtPrice: { type: Number, default: 0 },
  images: [{ type: String }],
  category: { type: String, default: 'Peanut Butter' },
  featured: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 1042 },
  details: {
    origin: { type: String, default: 'Texas, USA' },
    size: { type: String, default: '19.4 oz (550g)' },
    ingredients: { type: String, default: '100% Roasted American Peanuts, Peanut Oil, Pinch of Salt' },
    protein: { type: String, default: '7g per serve' },
    shelfLife: { type: String, default: '12 months from roasting' },
    storage: { type: String, default: 'Store upright in a cool, dry place. No refrigeration needed.' }
  },
  bottleOptions: [
    {
      quantity: { type: Number, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      compareAtPrice: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      savingsPercent: { type: String, default: '0%' },
      badge: { type: String, default: '' },
      image: { type: String, default: '' }
    }
  ],
  variants: [variantSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
