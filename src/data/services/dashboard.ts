import { type DashboardRepository } from '@/data/contracts/repositories'
import { DashboardError } from '@/domain/errors'
import { type Dashboard } from '@/domain/features'

export class DashboardService {
  constructor (private readonly dashboardRepository: DashboardRepository) {}

  async perform (): Promise<Dashboard.Result> {
    try {
      return await this.dashboardRepository.perform()
    } catch (error) {
      throw new DashboardError()
    }
  }
}
