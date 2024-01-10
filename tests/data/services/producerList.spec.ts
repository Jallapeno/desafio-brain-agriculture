import { ProducerListError } from '@/domain/errors'
import { ProducerListService } from '@/data/services'
import { mock, type MockProxy } from 'jest-mock-extended'
import { type ProducerListRepository } from '../contracts/repositories'

describe('ProducerListService', () => {
  let sut: ProducerListService
  let producerListRepository: MockProxy<ProducerListRepository>
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
    producerListRepository = mock()
    sut = new ProducerListService(producerListRepository)
  })

  it('should call ProducerListService when ProducerListRepository returns data', async () => {
    jest.spyOn(producerListRepository, 'perform').mockResolvedValue([producerData])

    const result = await sut.perform()

    expect(producerListRepository.perform).toHaveBeenCalledWith()

    expect(producerListRepository.perform).toHaveBeenCalledTimes(1)

    expect(result).toEqual([producerData])
  })

  it('should handle error when ProducerListService calls ProducerListRepository to list all producers', async () => {
    // Mock to simulate an error when calling Prisma's create method
    jest.spyOn(producerListRepository, 'perform').mockRejectedValue(new ProducerListError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform()
    ).rejects.toThrow('Error to list all producers')

    // Check if Prisma's create method was called correctly
    expect(producerListRepository.perform).toHaveBeenCalledWith()
  })
})
