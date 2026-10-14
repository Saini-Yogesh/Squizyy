const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productSlug: { type: String, default: 'drizzy-squeezy-peanut-butter-19-4-oz' },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  verified: { type: Boolean, default: true },
  location: { type: String, default: 'Sydney, Australia' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
