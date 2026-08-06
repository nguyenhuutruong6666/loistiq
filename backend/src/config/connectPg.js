const { Pool } = require('pg');
require('dotenv').config();

// Khởi tạo Connection Pool kết nối trực tiếp PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

/**
 * Kiểm tra kết nối cơ sở dữ liệu PostgreSQL
 */
const connectPg = async () => {
  try {
    const client = await pool.connect();
    console.log('🐘 [PostgreSQL] Kết nối cơ sở dữ liệu PostgreSQL thành công qua pg Pool!');
    client.release();
  } catch (error) {
    console.warn('⚠️ [PostgreSQL] Chưa thể kết nối pg Pool tới cơ sở dữ liệu PostgreSQL:', error.message);
  }
};

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  connectPg,
};
