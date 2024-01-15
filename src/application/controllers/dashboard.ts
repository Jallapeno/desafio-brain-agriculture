import { type Request, type Response } from 'express'
import { type DashboardService } from '@/data/services'

export class DashboardController {
  constructor (private readonly dashboardService: DashboardService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const result = await this.dashboardService.perform()
      console.log(result)

      res.status(200).json(result)
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message })
    }
  }
}
