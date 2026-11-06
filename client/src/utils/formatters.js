/**
 * Format currency in paise/cents to INR (₹) string
 * @param {number} cents - Amount in paise (e.g. 34900 for ₹349.00)
 * @returns {string} Formatted string (e.g. "₹349.00")
 */
export const formatCurrency = (cents = 0) => {
  const num = Number(cents) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num / 100);
};

/**
 * Format raw number to 2 decimal places
 */
export const formatPriceNumber = (cents = 0) => {
  const num = Number(cents) || 0;
  return (num / 100).toFixed(2);
};

/**
 * Calculate percent savings
 */
export const calculateSavings = (price, compareAtPrice) => {
  if (!compareAtPrice || compareAtPrice <= price) return '0%';
  const diff = compareAtPrice - price;
  return `${Math.round((diff / compareAtPrice) * 100)}%`;
};
