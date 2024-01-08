import { PrismaClient, type Producer } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducers = async (): Promise<Producer[]> => {
  try {
    const producers = await prisma.producer.findMany()
    return producers
  } catch (error) {
    throw new Error('Failed to fetch producers')
  }
}

export const getProducerById = async (id: number): Promise<Producer | null> => {
  try {
    const producer = await prisma.producer.findUnique({ where: { id } })
    return producer
  } catch (error) {
    throw new Error('Failed to fetch producer by ID')
  }
}

export const createProducer = async (input: any): Promise<Producer> => {
  try {
    const newProducer = await prisma.producer.create({ data: input })
    return newProducer
  } catch (error) {
    throw new Error('Failed to create producer')
  }
}

export const updateProducer = async (id: number, input: any): Promise<Producer | null> => {
  try {
    const updatedProducer = await prisma.producer.update({ where: { id }, data: input })
    return updatedProducer
  } catch (error) {
    throw new Error('Failed to update producer')
  }
}

export const deleteProducer = async (id: number): Promise<Producer | null> => {
  try {
    const deletedProducer = await prisma.producer.delete({ where: { id } })
    return deletedProducer
  } catch (error) {
    throw new Error('Failed to delete producer')
  }
}
