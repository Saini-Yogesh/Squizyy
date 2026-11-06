/**
 * In-memory sliding-window rate limiter middleware
 * Provides brute-force and DDoS protection with zero external dependencies.
 */

const createRateLimiter = ({
  windowMs = 60 * 1000, // 1 minute default
  maxRequests = 60,      // 60 requests per window
  message = 'Too many requests, please try again later.'
} = {}) => {
  const requests = new Map();

  // Periodic cleanup of stale entries every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requests.entries()) {
      if (now - data.startTime > windowMs * 2) {
        requests.delete(ip);
      }
    }
  }, 5 * 60 * 1000).unref();

  return (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();

    if (!requests.has(clientIp)) {
      requests.set(clientIp, {
        count: 1,
        startTime: now
      });
      return next();
    }

    const clientData = requests.get(clientIp);
    const elapsed = now - clientData.startTime;

    if (elapsed > windowMs) {
      // Window expired, reset
      clientData.count = 1;
      clientData.startTime = now;
      return next();
    }

    clientData.count += 1;

    if (clientData.count > maxRequests) {
      res.setHeader('Retry-After', Math.ceil((windowMs - elapsed) / 1000));
      return res.status(429).json({
        success: false,
        message,
        retryAfterSeconds: Math.ceil((windowMs - elapsed) / 1000)
      });
    }

    next();
  };
};

// Specialized limiters
const generalApiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 120,
  message: 'Too many API requests from this IP. Please slow down.'
});

const formSubmissionLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 15,
  message: 'Too many submissions. Please wait a few minutes before trying again.'
});

const checkoutLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  message: 'Too many checkout attempts. Please wait a few minutes or contact support.'
});

const adminAuthLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  message: 'Too many admin authentication attempts. Access locked for 15 minutes.'
});

module.exports = {
  createRateLimiter,
  generalApiLimiter,
  formSubmissionLimiter,
  checkoutLimiter,
  adminAuthLimiter
};

