const express = require('express');
const router = express.Router();
const newsletterController = require('../controller/newsletter.controller');
const { validate } = require('../middleware/validate.middleware');
const { newsletterSchema } = require('../validation/lead.validation');
const { requireAuth } = require('../middleware/auth.middleware');

// Tuyến đường công khai: Khách đăng ký bản tin VIP
router.post('/subscribe', validate(newsletterSchema), newsletterController.subscribe);

// Tuyến đường Quản trị: Xem danh sách emails đã đăng ký
router.get('/', requireAuth, newsletterController.getSubscribers);

module.exports = router;
