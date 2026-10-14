const mongoose = require('mongoose');

const wholesaleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  company: { type: String, required: true, trim: true },
  phone: { type: String, default: '' },
  estimatedLocations: { type: String, default: '1-5' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'approved', 'declined'], default: 'new' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Wholesale', wholesaleSchema);
