import { ProducerError } from '@/domain/errors'
import { ProducerUpdateService } from '@/data/services'
import { mock, type MockProxy } from 'jest-mock-extended'
import { type ProducerUpdateRepository } from '@/data/contracts/repositories'

describe('ProducerUpdateService', () => {
  let sut: ProducerUpdateService
  let producerUpdateRepository: MockProxy<ProducerUpdateRepository>
  const producerUpdateData = {
    id: 1,
    cpfCnpj: 'any_cpf',
    name: 'any_name',
    farmName: 'any_farmname',
    city: 'any_city',
    state: 'any_state',
    totalArea: 200,
    arableArea: 100,
    vegetationArea: 100,
    crops: ['any_crop', 'any_crop2', 'any_crop3']
  }

  beforeEach(() => {
    producerUpdateRepository = mock()
    sut = new ProducerUpdateService(producerUpdateRepository)
  })

  it('should call ProducerUpdateService when ProducerUpdateRepository returns data', async () => {
    jest.spyOn(producerUpdateRepository, 'perform').mockResolvedValue(producerUpdateData)

    const { id, ...rest } = producerUpdateData
    const result = await sut.perform(id, rest)

    expect(producerUpdateRepository.perform).toHaveBeenCalledWith(id, rest)

    expect(producerUpdateRepository.perform).toHaveBeenCalledTimes(1)

    expect(result).toEqual(producerUpdateData)
  })

  it('should handle error when total area is exceeded', async () => {
    const { id, ...rest } = producerUpdateData

    const paramsWithExceededArea = {
      ...rest,
      arableArea: 150,
      vegetationArea: 100
    }

    await expect(
      sut.perform(id, paramsWithExceededArea)
    ).resolves.toEqual(new ProducerError(
      'The sum of arable area and vegetation must not be greater than the total area of the farm',
      '@ProducerCreateService'
    ))
  })
})
