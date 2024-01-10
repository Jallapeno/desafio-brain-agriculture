import { type ProducerListOnce } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class ProducerListOnceService {
  constructor (private readonly prisma: PrismaClient) { }

  async perform (params: ProducerListOnce.Params): Promise<ProducerListOnce.Result | null> {
    try {
      const result = await this.prisma.producer.findUnique({ where: { id: params.id } })
      return result
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
