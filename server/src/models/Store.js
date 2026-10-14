const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  chain: { type: String, default: 'Sprouts Farmers Market' },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, default: '' },
  inStock: { type: Boolean, default: true },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Store', storeSchema);
