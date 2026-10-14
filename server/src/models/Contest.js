const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  receiptFile: { type: String, default: '' },
  agreedRules: { type: Boolean, required: true },
  newsletterOptIn: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'verified', 'winner', 'disqualified'], default: 'pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contest', contestSchema);
