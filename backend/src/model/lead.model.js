const { prisma } = require('../config/prisma');

const LeadModel = {
  findAll: async ({ status, search, page = 1, limit = 20 } = {}) => {
    const where = {};

    if (status && status !== 'Tất cả') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { propertyTitle: { contains: search, mode: 'insensitive' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      prisma.vIPLead.count({ where }),
      prisma.vIPLead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: limit > 0 ? skip : undefined,
        take: limit > 0 ? limit : undefined,
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      items,
    };
  },

  findById: async (id) => {
    return prisma.vIPLead.findUnique({
      where: { id },
    });
  },

  create: async (data) => {
    return prisma.vIPLead.create({
      data,
    });
  },

  updateStatus: async (id, status) => {
    return prisma.vIPLead.update({
      where: { id },
      data: { status },
    });
  },

  countByStatus: async () => {
    return prisma.vIPLead.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });
  },
};

module.exports = LeadModel;
