require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Connect to database
  await connectDB();

  const server = http.createServer(app);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is in use. Attempting port ${PORT + 1}...`);
      server.listen(PORT + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`🚀 Drizzy API Server is running on port ${PORT}`);
    console.log(`   Root:         http://localhost:${PORT}/`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
    console.log(`   Products API: http://localhost:${PORT}/api/products`);
    console.log(`   Stores API:   http://localhost:${PORT}/api/stores`);
    console.log(`   Reviews API:  http://localhost:${PORT}/api/reviews`);
    console.log(`===============================================`);
  });

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
  });
}

startServer();
