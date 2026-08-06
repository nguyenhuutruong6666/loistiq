const { prisma } = require('../config/prisma');
const ActivityModel = require('../model/activity.model');
const { successResponse } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Thống kê tổng hợp Dashboard Quản trị (KPIs, Biểu đồ, Phân bổ danh mục)
 * GET /api/dashboard/stats
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalProperties,
    exclusiveProperties,
    totalLeads,
    newLeads,
    totalSubscribers,
    recentActivities,
    recentLeads,
    categoryDistribution,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { status: 'Độc quyền' } }),
    prisma.vIPLead.count(),
    prisma.vIPLead.count({ where: { status: 'Mới tiếp nhận' } }),
    prisma.newsletterSubscriber.count(),
    ActivityModel.findRecent(10),
    prisma.vIPLead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.property.groupBy({
      by: ['category'],
      _count: { id: true },
      _sum: { rawPrice: true },
    }),
  ]);

  // Biểu đồ tăng trưởng mẫu theo tháng
  const monthlyChartData = [
    { month: 'T2', views: 1420, inquiries: 18, deals: 320 },
    { month: 'T3', views: 1890, inquiries: 24, deals: 450 },
    { month: 'T4', views: 2450, inquiries: 32, deals: 580 },
    { month: 'T5', views: 2200, inquiries: 28, deals: 520 },
    { month: 'T6', views: 3100, inquiries: 45, deals: 780 },
    { month: 'T7', views: 3680, inquiries: 54, deals: 940 },
    { month: 'T8', views: 4250, inquiries: 68, deals: 1180 },
  ];

  return successResponse(
    res,
    {
      kpi: {
        totalProperties,
        exclusiveProperties,
        totalLeads,
        newLeads,
        totalSubscribers,
      },
      monthlyChartData,
      categoryDistribution: categoryDistribution.map((item) => ({
        category: item.category,
        count: item._count.id,
        valuation: `${item._sum.rawPrice || 0} Tỷ`,
      })),
      recentActivities,
      recentLeads,
    },
    'Lấy số liệu thống kê Dashboard thành công.'
  );
});

module.exports = {
  getDashboardStats,
};
