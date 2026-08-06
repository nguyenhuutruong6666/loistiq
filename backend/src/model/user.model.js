const { prisma } = require('../config/prisma');

const UserModel = {
  findByEmail: async (email) => {
    return prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  },

  findById: async (id) => {
    return prisma.adminUser.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true, avatar: true, createdAt: true },
    });
  },

  create: async (data) => {
    return prisma.adminUser.create({
      data: {
        ...data,
        email: data.email.toLowerCase().trim(),
      },
    });
  },
};

module.exports = UserModel;
