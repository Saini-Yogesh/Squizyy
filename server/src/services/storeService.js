const Store = require('../models/Store');
const { storesData } = require('./seedData');
const { getIsConnected } = require('../config/db');

let memoryStores = [...storesData];

const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const normalizeStore = (s) => {
  const plain = s.toObject ? s.toObject() : s;
  const street = typeof plain.address === 'string' ? plain.address : (plain.address?.street || '');
  const city = plain.city || plain.address?.city || '';
  const state = plain.state || plain.address?.state || '';
  const zip = plain.zip || plain.address?.zip || '';

  return {
    ...plain,
    _id: plain._id || plain.id || String(Math.random()),
    id: plain._id || plain.id || String(Math.random()),
    address: street,
    street,
    city,
    state,
    zip,
    phone: plain.phone || '(800) 555-0199',
    hours: plain.hours || '7:00 AM - 10:00 PM Daily',
    inStock: plain.inStock !== false
  };
};

const getStores = async (searchTerm = '') => {
  const trimmed = searchTerm.trim();

  if (getIsConnected()) {
    try {
      const filter = trimmed ? {
        $or: [
          { city: { $regex: escapeRegex(trimmed), $options: 'i' } },
          { state: { $regex: escapeRegex(trimmed), $options: 'i' } },
          { zip: { $regex: escapeRegex(trimmed), $options: 'i' } },
          { name: { $regex: escapeRegex(trimmed), $options: 'i' } },
          { address: { $regex: escapeRegex(trimmed), $options: 'i' } }
        ]
      } : {};
      const stores = await Store.find(filter);
      if (stores && stores.length > 0) {
        return stores.map(normalizeStore);
      }
    } catch (err) {
      console.warn('Mongoose query failed for stores, using memory cache:', err.message);
    }
  }

  const normalizedMemory = memoryStores.map(normalizeStore);
  if (!trimmed) return normalizedMemory;

  const term = trimmed.toLowerCase();
  return normalizedMemory.filter(s => 
    s.city.toLowerCase().includes(term) ||
    s.state.toLowerCase().includes(term) ||
    s.zip.toLowerCase().includes(term) ||
    s.name.toLowerCase().includes(term) ||
    s.street.toLowerCase().includes(term)
  );
};

module.exports = {
  getStores
};
