import { type ProducerList } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class ProducerListService {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async perform (): Promise<ProducerList.Result> {
    try {
      const result = await this.prisma.producer.findMany()
      return result
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
