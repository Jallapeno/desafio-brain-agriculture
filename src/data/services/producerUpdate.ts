import { type ProducerUpdate } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class ProducerUpdateService {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async perform (id: number, params: ProducerUpdate.Params): Promise<ProducerUpdate.Result> {
    try {
      const result = await this.prisma.producer.update({ where: { id }, data: params })
      return result
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
