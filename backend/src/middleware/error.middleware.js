const { errorResponse } = require('../utils/apiResponse');

/**
 * Middleware xử lý tuyến đường không tồn tại (404 Not Found)
 */
const notFoundHandler = (req, res, next) => {
  return errorResponse(res, `Đường dẫn [${req.method}] ${req.originalUrl} không tồn tại trên hệ thống.`, 404);
};

/**
 * Middleware xử lý lỗi tập trung toàn ứng dụng (Global Error Handler)
 */
const errorHandler = (err, req, res, next) => {
  console.error('🔥 [Server Error]:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Máy chủ đang gặp sự cố nội bộ. Vui lòng thử lại sau.';

  return errorResponse(
    res,
    message,
    statusCode,
    process.env.NODE_ENV === 'development' ? err.stack : null
  );
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
