import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    producers: async () => {
      return prisma.producer.findMany();
    },
    producer: async (_, { id}) => {
      return prisma.producer.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createProducer: async (_, { input }) => {
      return prisma.producer.create({ data: input });
    },
    updateProducer: async (_, { id, input }) => {
      return prisma.producer.update({ where: { id }, data: input });
    },
    deleteProducer: async (_, { id }) => {
      return prisma.producer.delete({ where: { id } });
    },
  },
};