import { mock, type MockProxy } from 'jest-mock-extended'
import { type DashboardRepository } from '@/data/contracts/repositories'
import { DashboardService } from '@/data/services'
import { DashboardError } from '@/domain/errors'

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

  it('should handle error when DashboardService calls DashboardRepository', async () => {
    // Mock to simulate an error when calling Prisma's create method
    jest.spyOn(dashboardRepository, 'perform').mockRejectedValue(new DashboardError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform()
    ).rejects.toThrow('Error to list dashboard data')

    // Check if Prisma's create method was called correctly
    expect(dashboardRepository.perform).toHaveBeenCalledWith()
  })
})
