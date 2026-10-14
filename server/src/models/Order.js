const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  bottleCount: { type: Number, default: 1 },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String, default: '' },
  purchaseType: { type: String, enum: ['one-time', 'subscription'], default: 'one-time' },
  deliveryFrequency: { type: String, default: '' }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' }
  },
  shippingAddress: {
    address1: { type: String, required: true },
    address2: { type: String, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, default: 'US' }
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'paid' },
  paymentMethod: { type: String, default: 'card' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
