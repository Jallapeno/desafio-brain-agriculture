import { ProducerCreateError } from '@/domain/errors'
import { ProducerCreateRepository } from '@/data/contracts/repositories'
import { PrismaService as DbService } from '@/infra'

describe('ProducerCreateRepository', () => {
  let sut: ProducerCreateRepository
  let dbService: DbService

  const producerCreateData = {
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
    sut = new ProducerCreateRepository(dbService)
  })

  it('should call ProducerCreateRepository with corrects params to DbService create a new producer in the database', async () => {
    // Mock to simulate dbService create method
    jest.spyOn(dbService, 'createProducer').mockResolvedValue({ ...producerCreateData, id: 1 })

    const result = await sut.perform(producerCreateData)

    // Check if dbService create method was called correctly
    expect(dbService.createProducer).toHaveBeenCalledWith(producerCreateData)

    // checks if the create function is called only once
    expect(dbService.createProducer).toHaveBeenCalledTimes(1)

    // Check whether the service result is as expected
    expect(result).toEqual({ ...producerCreateData, id: 1 })
  })

  it('should handle ProducerCreateRepository error when DbService try create a new producer in DB', async () => {
    // Mock to simulate an error when calling DbService's create method
    jest.spyOn(dbService, 'createProducer').mockRejectedValue(new ProducerCreateError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform(producerCreateData)
    ).rejects.toThrow()

    // Check if DbService's create method was called correctly
    expect(dbService.createProducer).toHaveBeenCalledWith(producerCreateData)
  })
})
