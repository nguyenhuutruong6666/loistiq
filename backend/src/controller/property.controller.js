const PropertyModel = require('../model/property.model');
const ActivityModel = require('../model/activity.model');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Lấy danh sách bất động sản (hỗ trợ lọc, tìm kiếm, sắp xếp và phân trang)
 * GET /api/properties
 */
const getProperties = asyncHandler(async (req, res) => {
  const {
    category,
    city,
    status,
    search,
    sort,
    page = 1,
    limit = 10,
  } = req.query;

  const result = await PropertyModel.findAll({
    category,
    city,
    status,
    search,
    sort,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  });

  return successResponse(res, result, 'Lấy danh sách bất động sản thành công.');
});

/**
 * Lấy chi tiết bất động sản theo ID hoặc Slug
 * GET /api/properties/:idOrSlug
 */
const getPropertyById = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const property = await PropertyModel.findByIdOrSlug(idOrSlug);
  if (!property) {
    return errorResponse(res, 'Không tìm thấy bất động sản tương ứng.', 404);
  }

  return successResponse(res, property, 'Lấy thông tin chi tiết bất động sản thành công.');
});

/**
 * Thêm mới bất động sản (Quản trị viên)
 * POST /api/properties
 */
const createProperty = asyncHandler(async (req, res) => {
  const payload = req.body;

  // Tạo slug tự động từ tiêu đề nếu không có
  const slug =
    payload.slug ||
    payload.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') +
      '-' +
      Date.now().toString().slice(-4);

  const newProperty = await PropertyModel.create({
    ...payload,
    slug,
  });

  // Ghi nhật ký hoạt động
  await ActivityModel.create({
    user: req.user ? req.user.name : 'Admin Quản Trị',
    action: 'Thêm mới bất động sản',
    target: newProperty.title,
    type: 'property',
  });

  return successResponse(res, newProperty, 'Thêm bất động sản mới thành công.', 201);
});

/**
 * Cập nhật thông tin bất động sản (Quản trị viên)
 * PUT /api/properties/:id
 */
const updateProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const existing = await PropertyModel.findByIdOrSlug(id);
  if (!existing) {
    return errorResponse(res, 'Không tìm thấy bất động sản để cập nhật.', 404);
  }

  const updatedProperty = await PropertyModel.update(existing.id, payload);

  // Ghi nhật ký hoạt động
  await ActivityModel.create({
    user: req.user ? req.user.name : 'Admin Quản Trị',
    action: 'Cập nhật thông tin bất động sản',
    target: updatedProperty.title,
    type: 'property',
  });

  return successResponse(res, updatedProperty, 'Cập nhật bất động sản thành công.');
});

/**
 * Xóa bất động sản (Quản trị viên)
 * DELETE /api/properties/:id
 */
const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existing = await PropertyModel.findByIdOrSlug(id);
  if (!existing) {
    return errorResponse(res, 'Không tìm thấy bất động sản để xóa.', 404);
  }

  await PropertyModel.delete(existing.id);

  // Ghi nhật ký hoạt động
  await ActivityModel.create({
    user: req.user ? req.user.name : 'Admin Quản Trị',
    action: 'Xóa bất động sản khỏi hệ thống',
    target: existing.title,
    type: 'property',
  });

  return successResponse(res, null, 'Đã xóa bất động sản thành công.');
});

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
