import { type DashboardService } from '@/data/services'
import { type Request, type Response } from 'express'
import { mock, type MockProxy } from 'jest-mock-extended'
import { DashboardController } from '@/application/controllers'

describe('DashboardController', () => {
  let sut: DashboardController
  let dashboardService: MockProxy<DashboardService>
  let req: Partial<Request>
  let res: Partial<Response>
  const dashboard = {
    totalArea: 3000,
    totalFarms: 2
  }

  beforeEach(() => {
    dashboardService = mock()
    sut = new DashboardController(dashboardService)
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })
  it('should return 201 with result when DashboardController performs successfully', async () => {
    dashboardService.perform.mockResolvedValue(dashboard)

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(dashboard)
  })
})
