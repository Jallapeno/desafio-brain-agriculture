import * as producerPrismaService from '../../services/producerPrismaService'
import * as validators from '../../utils/validators/index'
import { errorHandler } from '../../utils/errorHandler'

export const resolvers = {
  Query: {
    producers: async () => {
      return await producerPrismaService.getProducers()
    },
    producer: async (_, { id }) => {
      return await producerPrismaService.getProducerById(id)
    }
  },
  Mutation: {
    createProducer: async (_, { input }) => {
      if (input.cpfCnpj && !validators.isValidCpfCnpj(input.cpfCnpj)) {
        errorHandler('invalid CPF or CNPJ', 'BAD_REQUEST', 400)
      }
      return await producerPrismaService.createProducer(input)
    },
    updateProducer: async (_, { id, input }) => {
      if (input.cpfCnpj && !validators.isValidCpfCnpj(input.cpfCnpj)) {
        errorHandler('invalid CPF or CNPJ', 'BAD_REQUEST', 400)
      }
      return await producerPrismaService.updateProducer(id, input)
    },
    deleteProducer: async (_, { id }) => {
      try {
        return await producerPrismaService.deleteProducer(id)
      } catch (error) {
        errorHandler('Error to delete a new producer', 'INTERNAL_SERVER_ERROR', 500)
      }
    }
  }
}
