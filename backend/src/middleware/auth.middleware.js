const { verifyToken } = require('../utils/jwtUtils');
const { errorResponse } = require('../utils/apiResponse');
const { prisma } = require('../config/prisma');

/**
 * Middleware bảo vệ các API dành riêng cho Quản trị viên
 */
const requireAuth = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return errorResponse(res, 'Yêu cầu đăng nhập quản trị để truy cập tài nguyên này.', 401);
    }

    const decoded = verifyToken(token);
    const user = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true, avatar: true },
    });

    if (!user) {
      return errorResponse(res, 'Tài khoản quản trị không tồn tại hoặc đã bị thu hồi quyền.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Mã xác thực không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại!', 401);
  }
};

module.exports = {
  requireAuth,
};
