require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { connectPg } = require('./src/config/connectPg');
const { connectPrisma } = require('./src/config/prisma');
const rootRouter = require('./src/router');
const { notFoundHandler, errorHandler } = require('./src/middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình Middleware cơ bản
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Tuyến đường kiểm tra sức khỏe hệ thống (Health Check)
app.get('/', (req, res) => {
  res.json({
    name: 'LOISTIQ Luxury Real Estate Backend API',
    status: 'Running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    database: 'PostgreSQL',
    timestamp: new Date().toISOString(),
  });
});

// Tích hợp toàn bộ API Routes vào /api
app.use('/api', rootRouter);

// Bắt lỗi 404 và Error Handler tập trung
app.use(notFoundHandler);
app.use(errorHandler);

// Khởi động máy chủ & kết nối cơ sở dữ liệu
const startServer = async () => {
  try {
    // Khởi chạy kiểm tra kết nối CSDL
    await connectPrisma();
    await connectPg();

    app.listen(PORT, () => {
      console.log(`\n🚀 [LOISTIQ Server] Đang chạy tại http://localhost:${PORT}`);
      console.log(`📡 [API Base] http://localhost:${PORT}/api`);
      console.log(`🩺 [Health Check] http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('❌ Lỗi khi khởi chạy máy chủ Express:', error);
    process.exit(1);
  }
};

startServer();
