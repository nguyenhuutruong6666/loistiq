const bcrypt = require('bcryptjs');
const UserModel = require('../model/user.model');
const { generateToken } = require('../utils/jwtUtils');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Đăng nhập quản trị viên
 * POST /api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findByEmail(email);
  if (!user) {
    return errorResponse(res, 'Email hoặc mật khẩu quản trị không chính xác.', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return errorResponse(res, 'Email hoặc mật khẩu quản trị không chính xác.', 401);
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return successResponse(
    res,
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    },
    'Đăng nhập thành công!'
  );
});

/**
 * Lấy thông tin tài khoản đang đăng nhập
 * GET /api/auth/me
 */
const getMe = asyncHandler(async (req, res) => {
  return successResponse(res, { user: req.user }, 'Lấy thông tin tài khoản thành công.');
});

module.exports = {
  login,
  getMe,
};
