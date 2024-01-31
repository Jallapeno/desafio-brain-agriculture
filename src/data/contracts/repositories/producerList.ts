import { ProducerError } from '@/domain/errors'
import { type ProducerList } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class ProducerListRepository {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async perform (): Promise<ProducerList.Result[] | null> {
    try {
      const result = await this.prisma.producer.findMany()
      return result
    } catch (error) {
      throw new ProducerError('Database connection error', '@ProducerListRepository', 500)
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
