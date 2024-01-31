import { DashboardRepository } from '@/data/contracts/repositories'
import { DashboardError } from '@/domain/errors'
import { PrismaService as DbService } from '@/infra'

describe('DashboardRepository', () => {
  let sut: DashboardRepository
  let dbService: DbService

  const dashboard = {
    totalArea: 3000,
    totalFarms: 2,
    agriculturalAndVegetationArea: {
      agriculturable: 200,
      vegetation: 200
    },
    farmsByCulture: {
      any_crop: 2,
      any_crop2: 2,
      any_crop3: 2
    },
    farmsByState: {
      any_state: 2
    }
  }
  const producerData = [{
    id: 1,
    cpfCnpj: 'any_cpf',
    name: 'any_name',
    farmName: 'any_farmname',
    city: 'any_city',
    state: 'any_state',
    totalArea: 1000,
    arableArea: 100,
    vegetationArea: 100,
    crops: ['any_crop', 'any_crop2', 'any_crop3']
  },
  {
    id: 2,
    cpfCnpj: 'any_cpf',
    name: 'any_name',
    farmName: 'any_farmname',
    city: 'any_city',
    state: 'any_state',
    totalArea: 2000,
    arableArea: 100,
    vegetationArea: 100,
    crops: ['any_crop', 'any_crop2', 'any_crop3']
  }]
  beforeEach(() => {
    dbService = new DbService()
    sut = new DashboardRepository(dbService)
  })

  afterEach(async () => {
    await dbService.disconnect()
  })
  it('should call DashboardRepository to list totalArea and totalFarms when DbService returns data', async () => {
    jest.spyOn(dbService, 'getAllProducers').mockResolvedValue(producerData)

    const result = await sut.perform()
    expect(dbService.getAllProducers).toHaveBeenCalledWith()
    expect(dbService.getAllProducers).toHaveBeenCalledTimes(1)
    expect(result).toEqual(dashboard)
  })

  it('should handle DashboardRepository error when DbService try list producers data', async () => {
    // Mock to simulate an error when calling DbService's create method
    jest.spyOn(dbService, 'getAllProducers').mockRejectedValue(new DashboardError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform()
    ).rejects.toThrow()

    // Check if DbService's create method was called correctly
    expect(dbService.getAllProducers).toHaveBeenCalledWith()
    expect(dbService.getAllProducers).toHaveBeenCalledTimes(1)
  })
})
