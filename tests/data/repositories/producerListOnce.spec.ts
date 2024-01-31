import { ProducerError } from '@/domain/errors'
import { ProducerListOnceRepository } from '@/data/contracts/repositories'
import { PrismaService as DbService } from '@/infra'

describe('ProducerListOnceRepository', () => {
  let sut: ProducerListOnceRepository
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
    sut = new ProducerListOnceRepository(dbService)
  })

  it('should call ProducerListOnceRepository when DbService returns data', async () => {
    jest.spyOn(dbService, 'listById').mockResolvedValue(producerData)

    const result = await sut.perform(1)

    // Check if DbService's findUnique method was called correctly
    expect(dbService.listById).toHaveBeenCalledWith(1)

    // checks if the findUnique function is called only once
    expect(dbService.listById).toHaveBeenCalledTimes(1)

    // Check whether the repository result is as expected
    expect(result).toEqual(producerData)
  })

  it('Should handle ProducerListOnceRepository error when DbService try list a producer by id', async () => {
    // Mock to simulate an error when calling DbService's findUnique method
    jest.spyOn(dbService, 'listById').mockRejectedValue(new ProducerError(
      'Database connection error',
      '@ProducerListOnceRepository',
      500
    ))

    // Expect the call to perform to result in an error
    await expect(
      dbService.listById(1)
    ).rejects.toThrow()

    // Check if DbService's findUnique method was called correctly
    expect(dbService.listById).toHaveBeenCalledWith(1)
  })
})
