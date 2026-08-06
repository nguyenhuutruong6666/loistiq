const express = require('express');
const router = express.Router();
const leadController = require('../controller/lead.controller');
const { validate } = require('../middleware/validate.middleware');
const { createLeadSchema, updateLeadStatusSchema } = require('../validation/lead.validation');
const { requireAuth } = require('../middleware/auth.middleware');

// Tuyến đường công khai: Khách gửi yêu cầu tư vấn VIP
router.post('/', validate(createLeadSchema), leadController.createLead);

// Tuyến đường Quản trị: Lấy danh sách & Cập nhật trạng thái Leads
router.get('/', requireAuth, leadController.getLeads);
router.patch('/:id/status', requireAuth, validate(updateLeadStatusSchema), leadController.updateLeadStatus);

module.exports = router;
