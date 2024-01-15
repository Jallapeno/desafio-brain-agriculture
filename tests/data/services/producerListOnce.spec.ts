import { ProducerListOnceError } from '@/domain/errors'
import { ProducerListOnceService } from '@/data/services'
import { mock, type MockProxy } from 'jest-mock-extended'
import { type ProducerListOnceRepository } from '@/data/contracts/repositories'

describe('ProducerListOnceService', () => {
  let sut: ProducerListOnceService
  let producerListOnceRepository: MockProxy<ProducerListOnceRepository>
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
    producerListOnceRepository = mock()
    sut = new ProducerListOnceService(
      producerListOnceRepository
    )
  })

  it('should calls ProducerListOnceService when ProducerListOnceRepository returns data', async () => {
    jest.spyOn(producerListOnceRepository, 'perform').mockResolvedValue(producerData)

    const result = await sut.perform(1)

    expect(producerListOnceRepository.perform).toHaveBeenCalledWith(1)

    expect(producerListOnceRepository.perform).toHaveBeenCalledTimes(1)

    expect(result).toEqual(producerData)
  })

  it('should handle error when ProducerListOnceService try calls ProducerListOnceRepository', async () => {
    // Mock to simulate an error when calling Prisma's create method
    jest.spyOn(producerListOnceRepository, 'perform').mockRejectedValue(new ProducerListOnceError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform(1)
    ).rejects.toThrow('Error to list producer')

    // Check if producerListOnceRepository was called correctly
    expect(producerListOnceRepository.perform).toHaveBeenCalledWith(1)
  })
})
