const Store = require('../models/Store');
const { storesData } = require('./seedData');
const { getIsConnected } = require('../config/db');

let memoryStores = [...storesData];

const getStores = async (searchTerm = '') => {
  if (getIsConnected()) {
    try {
      const filter = searchTerm ? {
        $or: [
          { city: { $regex: searchTerm, $options: 'i' } },
          { state: { $regex: searchTerm, $options: 'i' } },
          { zip: { $regex: searchTerm, $options: 'i' } },
          { name: { $regex: searchTerm, $options: 'i' } }
        ]
      } : {};
      const stores = await Store.find(filter);
      if (stores && stores.length > 0) return stores;
    } catch (err) {
      console.warn('Mongoose query failed for stores, using memory cache:', err.message);
    }
  }

  if (!searchTerm) return memoryStores;
  const term = searchTerm.toLowerCase().trim();
  return memoryStores.filter(s => 
    s.city.toLowerCase().includes(term) ||
    s.state.toLowerCase().includes(term) ||
    s.zip.includes(term) ||
    s.name.toLowerCase().includes(term)
  );
};

module.exports = {
  getStores
};
