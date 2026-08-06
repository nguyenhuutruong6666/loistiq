const LeadModel = require('../model/lead.model');
const ActivityModel = require('../model/activity.model');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Gửi form đăng ký tư vấn VIP từ trang liên hệ hoặc trang chi tiết
 * POST /api/leads
 */
const createLead = asyncHandler(async (req, res) => {
  const payload = req.body;

  const newLead = await LeadModel.create(payload);

  // Ghi nhật ký hoạt động
  await ActivityModel.create({
    user: 'Hệ thống',
    action: 'Tiếp nhận yêu cầu tư vấn VIP mới từ',
    target: newLead.name,
    type: 'lead',
  });

  return successResponse(
    res,
    newLead,
    `Cảm ơn Quý khách ${newLead.name}. Chuyên viên LOISTIQ sẽ liên hệ tư vấn trong thời gian sớm nhất!`,
    201
  );
});

/**
 * Lấy danh sách khách hàng VIP (Quản trị viên)
 * GET /api/leads
 */
const getLeads = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 20 } = req.query;

  const result = await LeadModel.findAll({
    status,
    search,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  });

  return successResponse(res, result, 'Lấy danh sách khách hàng VIP thành công.');
});

/**
 * Cập nhật trạng thái xử lý yêu cầu tư vấn (Quản trị viên)
 * PATCH /api/leads/:id/status
 */
const updateLeadStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const existing = await LeadModel.findById(id);
  if (!existing) {
    return errorResponse(res, 'Không tìm thấy thông tin yêu cầu tư vấn.', 404);
  }

  const updatedLead = await LeadModel.updateStatus(id, status);

  // Ghi nhật ký hoạt động
  await ActivityModel.create({
    user: req.user ? req.user.name : 'Admin Quản Trị',
    action: `Chuyển trạng thái yêu cầu sang: "${status}" cho khách hàng`,
    target: updatedLead.name,
    type: 'lead',
  });

  return successResponse(res, updatedLead, `Đã cập nhật trạng thái yêu cầu sang: "${status}"`);
});

module.exports = {
  createLead,
  getLeads,
  updateLeadStatus,
};
