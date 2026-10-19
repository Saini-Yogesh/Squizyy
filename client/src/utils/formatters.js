/**
 * Format currency in cents to dollar string
 * @param {number} cents - Amount in cents (e.g. 999 for $9.99)
 * @returns {string} Formatted string (e.g. "$9.99")
 */
export const formatCurrency = (cents = 0) => {
  const num = Number(cents) || 0;
  return `$${(num / 100).toFixed(2)}`;
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
