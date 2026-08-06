/**
 * Bọc hàm async của Controller để tự động bắt lỗi và chuyển tiếp sang next(err)
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
