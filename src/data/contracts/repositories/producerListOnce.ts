// import { type ProducerListOnceError } from '@/domain/errors'
import { type ProducerListOnce } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class ProducerListOnceRepository {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async perform (id: number): Promise<ProducerListOnce.Result | null> {
    try {
      const result = await this.prisma.producer.findUnique({ where: { id } })
      return result
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
