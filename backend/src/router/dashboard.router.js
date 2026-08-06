const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboard.controller');
const { requireAuth } = require('../middleware/auth.middleware');

// Tuyến đường Quản trị: Lấy thống kê tổng hợp Dashboard
router.get('/stats', requireAuth, dashboardController.getDashboardStats);

module.exports = router;
