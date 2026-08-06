const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const { validate } = require('../middleware/validate.middleware');
const { loginSchema } = require('../validation/auth.validation');
const { requireAuth } = require('../middleware/auth.middleware');

// Tuyến đường đăng nhập quản trị viên
router.post('/login', validate(loginSchema), authController.login);

// Tuyến đường lấy thông tin quản trị viên hiện tại
router.get('/me', requireAuth, authController.getMe);

module.exports = router;
