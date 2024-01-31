import { type PrismaClient } from '@prisma/client'
import { DashboardError } from '@/domain/errors'
import { type Dashboard } from '@/domain/features'

export class DashboardRepository {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async perform (): Promise<Dashboard.Result> {
    try {
      const producers = await this.prisma.producer.findMany()
      const totalArea = producers ? producers.reduce((acc, farm) => acc + farm.totalArea, 0) : 0
      const totalFarms = producers ? producers.length : 0
      // Data for pie chart by state
      const farmsByState = producers.reduce((acc: any, farm) => {
        acc[farm.state] = (acc[farm.state] || 0) + 1
        return acc
      }, {})

      // Data for pie chart by culture
      const farmsByCulture = producers.reduce((acc: any, farm) => {
        farm.crops.forEach(culture => {
          acc[culture] = (acc[culture] || 0) + 1
        })
        return acc
      }, {})

      // Data for pie chart by land use
      const agriculturalAndVegetationArea = producers.reduce((acc, farm) => {
        acc.agriculturable += farm.arableArea
        acc.vegetation += farm.vegetationArea
        return acc
      }, { agriculturable: 0, vegetation: 0 })

      const result = {
        totalArea,
        totalFarms,
        farmsByState,
        farmsByCulture,
        agriculturalAndVegetationArea
      }
      return result
    } catch (error) {
      throw new DashboardError()
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
