import { type ProducerListOnce } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class ProducerListOnceService {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async perform (params: ProducerListOnce.Params): Promise<ProducerListOnce.Result | null> {
    try {
      const result = await this.prisma.producer.findUnique({ where: { id: params.id } })
      return result
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
