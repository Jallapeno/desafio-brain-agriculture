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
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
