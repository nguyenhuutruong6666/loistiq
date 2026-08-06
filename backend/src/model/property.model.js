const { prisma } = require('../config/prisma');

const PropertyModel = {
  findAll: async ({ category, city, status, search, sort = 'default', page = 1, limit = 10 } = {}) => {
    const where = {};

    if (category && category !== 'Tất cả') {
      where.category = category;
    }

    if (city && city !== 'Tất cả vị trí') {
      where.city = city;
    }

    if (status && status !== 'Tất cả') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy = { createdAt: 'desc' };
    if (sort === 'asc') orderBy = { rawPrice: 'asc' };
    if (sort === 'desc') orderBy = { rawPrice: 'desc' };

    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        orderBy,
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

  findByIdOrSlug: async (idOrSlug) => {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    if (isUuid) {
      return prisma.property.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });
    }
    return prisma.property.findUnique({
      where: { slug: idOrSlug },
    });
  },

  create: async (data) => {
    return prisma.property.create({
      data,
    });
  },

  update: async (id, data) => {
    return prisma.property.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    return prisma.property.delete({
      where: { id },
    });
  },

  countByCategory: async () => {
    return prisma.property.groupBy({
      by: ['category'],
      _count: {
        id: true,
      },
      _sum: {
        rawPrice: true,
      },
    });
  },
};

module.exports = PropertyModel;
