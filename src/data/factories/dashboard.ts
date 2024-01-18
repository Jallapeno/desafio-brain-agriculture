import { type Request, type Response } from 'express'
import { type PrismaClient } from '@prisma/client'
import { DashboardRepository } from '@/data/contracts/repositories'
import { DashboardService } from '@/data/services'
import { DashboardController } from '@/application/controllers'

export class DashboardFactory {
  async make (req: Request, res: Response, prisma: PrismaClient): Promise<void> {
    const dashboardRepository = new DashboardRepository(prisma)
    const dashboardService = new DashboardService(dashboardRepository)
    const dashboardController = new DashboardController(dashboardService)
    await dashboardController.handle(req, res)
  }
}
