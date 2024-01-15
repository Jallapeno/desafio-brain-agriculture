import { mock, type MockProxy } from 'jest-mock-extended'
import { type DashboardRepository } from '@/data/contracts/repositories'
import { DashboardService } from '@/data/services'

describe('DashboardService', () => {
  let sut: DashboardService
  let dashboardRepository: MockProxy<DashboardRepository>
  const dashboard = {
    totalArea: 3000,
    totalFarms: 2
  }
  beforeEach(() => {
    dashboardRepository = mock()
    sut = new DashboardService(dashboardRepository)
  })

  it('should call DashboardService when DashboardRepository returns data', async () => {
    jest.spyOn(dashboardRepository, 'perform').mockResolvedValue(dashboard)
    const result = await sut.perform()
    expect(dashboardRepository.perform).toHaveBeenCalledWith()

    expect(dashboardRepository.perform).toHaveBeenCalledTimes(1)

    expect(result).toEqual(dashboard)
  })
})
