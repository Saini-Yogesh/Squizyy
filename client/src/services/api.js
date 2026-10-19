import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Product API
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data?.data || response.data || [];
};

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`);
  return response.data?.data || response.data || null;
};

// Store Locator API
export const getStores = async (query = '') => {
  const response = await api.get('/stores', { params: { query } });
  return response.data?.data || response.data || [];
};

// Reviews API
export const getReviews = async (productSlug) => {
  const response = await api.get('/reviews', { params: { productSlug } });
  return response.data?.data || response.data || [];
};

export const submitReview = async (reviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

// Newsletter API
export const subscribeNewsletter = async (email, source = 'website') => {
  const response = await api.post('/newsletter', { email, source });
  return response.data;
};

// Wholesale API
export const submitWholesale = async (wholesaleData) => {
  const response = await api.post('/wholesale', wholesaleData);
  return response.data;
};

// Contest API
export const submitContest = async (contestData) => {
  const response = await api.post('/contest', contestData);
  return response.data;
};

// Cart / Checkout API
export const checkoutOrder = async (orderData) => {
  const response = await api.post('/cart/checkout', orderData);
  const data = response.data;
  return {
    ...data,
    order: data.data?.order || data.data || data
  };
};

// Admin API
export const getAdminStats = async (adminKey) => {
  const response = await api.get('/admin/stats', {
    headers: {
      'x-admin-key': adminKey
    }
  });
  return response.data?.data || response.data;
};

export const updateAdminProduct = async (slug, updateData, adminKey) => {
  const response = await api.put(`/admin/products/${slug}`, updateData, {
    headers: {
      'x-admin-key': adminKey
    }
  });
  return response.data?.data || response.data;
};

export default api;
