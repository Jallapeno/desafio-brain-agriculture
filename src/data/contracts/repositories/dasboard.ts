import { type Dashboard } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class DashboardRepository {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async perform (): Promise<Dashboard.Result> {
    try {
      const producers = await this.prisma.producer.findMany()
      const totalArea = producers ? producers.reduce((acc, farm) => acc + farm.totalArea, 0) : 0
      const totalFarms = producers ? producers.length : 0
      const result = {
        totalArea,
        totalFarms
      }
      return result
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
