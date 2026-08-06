const { PrismaClient } = require('@prisma/client');

// Khởi tạo đối tượng Prisma Client duy nhất (Singleton Pattern)
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

/**
 * Kiểm tra kết nối Prisma Client tới PostgreSQL
 */
const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log('💎 [Prisma ORM] Kết nối thành công đến cơ sở dữ liệu PostgreSQL!');
  } catch (error) {
    console.warn('⚠️ [Prisma ORM] Chưa kết nối được PostgreSQL qua Prisma Client:', error.message);
  }
};

module.exports = {
  prisma,
  connectPrisma,
};
