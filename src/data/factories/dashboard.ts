import { type Request, type Response } from 'express'
import { DashboardRepository } from '@/data/contracts/repositories'
import { DashboardService } from '@/data/services'
import { DashboardController } from '@/application/controllers'
import { PrismaService as DbService } from '@/infra'

export class DashboardFactory {
  async make (req: Request, res: Response): Promise<void> {
    const dashboardRepository = new DashboardRepository(new DbService())
    const dashboardService = new DashboardService(dashboardRepository)
    const dashboardController = new DashboardController(dashboardService)
    await dashboardController.handle(req, res)
  }
}
