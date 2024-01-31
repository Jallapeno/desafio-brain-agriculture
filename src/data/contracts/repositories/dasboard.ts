import { DashboardError } from '@/domain/errors'
import { type Dashboard } from '@/domain/features'
import { type PrismaService as DbService } from '@/infra'

export class DashboardRepository {
  private readonly dbService: DbService

  constructor (dbService: DbService) {
    this.dbService = dbService
  }

  async perform (): Promise<Dashboard.Result> {
    try {
      const producers = await this.dbService.getAllProducers()
      const totalArea = producers ? producers.reduce((acc, farm: any) => acc + farm.totalArea, 0) : 0
      const totalFarms = producers ? producers.length : 0
      // Data for pie chart by state
      const farmsByState = producers?.reduce((acc: any, farm: any) => {
        acc[farm.state] = (acc[farm.state] || 0) + 1
        return acc
      }, {})

      // Data for pie chart by culture
      const farmsByCulture = producers?.reduce((acc: any, farm: any) => {
        farm.crops.forEach((culture: any) => {
          acc[culture] = (acc[culture] || 0) + 1
        })
        return acc
      }, {})

      // Data for pie chart by land use
      const agriculturalAndVegetationArea = producers?.reduce((acc, farm: any) => {
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
    }
  }
}
