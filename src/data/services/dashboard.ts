import { type DashboardRepository } from '@/data/contracts/repositories'
import { type Dashboard } from '@/domain/features'

export class DashboardService {
  constructor (private readonly dashboardRepository: DashboardRepository) {}

  async perform (): Promise<Dashboard.Result> {
    try {
      return await this.dashboardRepository.perform()
    } catch (error) {
      console.log(error)

      throw new Error()
    }
  }
}
