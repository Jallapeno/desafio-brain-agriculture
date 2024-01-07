import * as producerPrismaService from '../services/producerPrismaService'

export const resolvers = {
  Query: {
    producers: async () => {
      return producerPrismaService.getProducers()
    },
    producer: async (_, { id }) => {
      return producerPrismaService.getProducerById(id)
    }
  },
  Mutation: {
    createProducer: async (_, { input }) => {
      return producerPrismaService.createProducer(input)
    },
    updateProducer: async (_, { id, input }) => {
      return producerPrismaService.updateProducer(id, input)
    },
    deleteProducer: async (_, { id }) => {
      return producerPrismaService.deleteProducer(id)
    }
  }
}
