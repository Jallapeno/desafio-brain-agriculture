import { ProducerError } from '@/domain/errors'
import { type ProducerUpdate } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class ProducerUpdateRepository {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async perform (id: number, params: ProducerUpdate.Params): Promise<ProducerUpdate.Result> {
    try {
      const result = await this.prisma.producer.update({ where: { id }, data: params })
      return result
    } catch (error) {
      throw new ProducerError('Database connection error', '@ProducerUpdateRepository', 500)
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
