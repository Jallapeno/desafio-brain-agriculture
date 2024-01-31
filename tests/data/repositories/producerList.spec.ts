import { ProducerError } from '@/domain/errors'
import { ProducerListRepository } from '@/data/contracts/repositories'
import { PrismaService as DbService } from '@/infra'

describe('ProducerListRepository', () => {
  let sut: ProducerListRepository
  let dbService: DbService

  const producerData = {
    id: 1,
    cpfCnpj: 'any_cpf',
    name: 'any_name',
    farmName: 'any_farmname',
    city: 'any_city',
    state: 'any_state',
    totalArea: 100,
    arableArea: 100,
    vegetationArea: 100,
    crops: ['any_crop', 'any_crop2', 'any_crop3']
  }

  beforeEach(() => {
    dbService = new DbService()
    sut = new ProducerListRepository(dbService)
  })

  it('should call ProducerListRepository to list all producers when DbService returns data', async () => {
    jest.spyOn(dbService, 'getAllProducers').mockResolvedValue([producerData])

    const result = await sut.perform()
    // Check if DbService's findMany method was called correctly
    expect(dbService.getAllProducers).toHaveBeenCalledWith()

    // checks if the findMany function is called only once
    expect(dbService.getAllProducers).toHaveBeenCalledTimes(1)

    // Check whether the repository result is as expected
    expect(result).toEqual([producerData])
  })

  it('should handle ProducerListRepository error when DbService try list all producers', async () => {
    // Mock to simulate an error when calling DbService's findMany method
    jest.spyOn(dbService, 'getAllProducers').mockRejectedValue(new ProducerError(
      'Database connection error',
      '@ProducerListRepository',
      500
    ))

    // Expect the call to perform to result in an error
    await expect(
      sut.perform()
    ).rejects.toThrow()

    // Check if DbService's findMany method was called correctly
    expect(dbService.getAllProducers).toHaveBeenCalledWith()
  })
})
