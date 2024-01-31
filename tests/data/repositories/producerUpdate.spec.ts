import { ProducerError } from '@/domain/errors'
import { ProducerUpdateRepository } from '@/data/contracts/repositories'
import { PrismaService as DbService } from '@/infra'

describe('ProducerUpdateRepository', () => {
  let sut: ProducerUpdateRepository
  let dbService: DbService

  const producerUpdateData = {
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
    sut = new ProducerUpdateRepository(dbService)
  })

  it('should call ProducerUpdateRepository with corrects params to DbService update a producer in the database', async () => {
    jest.spyOn(dbService, 'updateProducerById').mockResolvedValue(producerUpdateData)

    const { id, ...rest } = producerUpdateData
    const result = await sut.perform(id, rest)

    expect(dbService.updateProducerById).toHaveBeenCalledWith(id, rest)

    expect(dbService.updateProducerById).toHaveBeenCalledTimes(1)

    expect(result).toEqual(producerUpdateData)
  })

  it('should handle ProducerUpdateRepository error when DbService try update a producer by id', async () => {
    jest.spyOn(dbService, 'updateProducerById').mockRejectedValue(new ProducerError(
      'Database connection error',
      '@ProducerUpdateRepository',
      500
    ))

    const { id, ...rest } = producerUpdateData

    await expect(
      sut.perform(id, rest)
    ).rejects.toThrow()

    expect(dbService.updateProducerById).toHaveBeenCalledWith(id, rest)
  })
})
