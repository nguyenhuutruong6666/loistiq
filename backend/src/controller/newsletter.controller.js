const { prisma } = require('../config/prisma');
const ActivityModel = require('../model/activity.model');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Đăng ký nhận bản tin VIP
 * POST /api/newsletter/subscribe
 */
const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const cleanEmail = email.toLowerCase().trim();

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email: cleanEmail },
  });

  if (existing) {
    return successResponse(res, existing, 'Email này đã được đăng ký nhận bản tin VIP trước đó.');
  }

  const subscriber = await prisma.newsletterSubscriber.create({
    data: { email: cleanEmail },
  });

  // Ghi nhật ký hoạt động
  await ActivityModel.create({
    user: 'Hệ thống',
    action: 'Ghi nhận thêm 1 Email đăng ký Bản tin VIP',
    target: subscriber.email,
    type: 'newsletter',
  });

  return successResponse(res, subscriber, 'Đăng ký nhận bản tin VIP thành công!', 201);
});

/**
 * Lấy danh sách subscribers (Quản trị viên)
 * GET /api/newsletter
 */
const getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: 'desc' },
  });

  return successResponse(res, subscribers, 'Lấy danh sách đăng ký bản tin thành công.');
});

module.exports = {
  subscribe,
  getSubscribers,
};
