const { prisma } = require('../config/prisma');

const ActivityModel = {
  findRecent: async (limit = 10) => {
    return prisma.adminActivity.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },

  create: async (data) => {
    return prisma.adminActivity.create({
      data: {
        ...data,
        time: data.time || 'Vừa xong',
      },
    });
  },
};

module.exports = ActivityModel;
