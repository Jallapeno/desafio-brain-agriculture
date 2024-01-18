import { ProducerCreateError } from '@/domain/errors'
import { ProducerCreateService } from '@/data/services'
import { mock, type MockProxy } from 'jest-mock-extended'
import { type ProducerCreateRepository } from '@/data/contracts/repositories'

describe('ProducerCreateService', () => {
  let sut: ProducerCreateService
  let producerCreateRepository: MockProxy<ProducerCreateRepository>
  const producerCreateData = {
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
    producerCreateRepository = mock()
    sut = new ProducerCreateService(producerCreateRepository)
  })

  it('should call ProducerCreateService when ProducerCreateRepository returns data', async () => {
    // Mock to simulate Prisma's create method
    jest.spyOn(producerCreateRepository, 'perform').mockResolvedValue({ ...producerCreateData, id: 1 })

    const result = await sut.perform(producerCreateData)

    // Check if Prisma's create method was called correctly
    expect(producerCreateRepository.perform).toHaveBeenCalledWith(producerCreateData)

    // checks if the create function is called only once
    expect(producerCreateRepository.perform).toHaveBeenCalledTimes(1)

    // Check whether the service result is as expected
    expect(result).toEqual({ ...producerCreateData, id: 1 })
  })

  it('should handle error when ProducerCreateService calls ProducerCreateRepository to create a new producer', async () => {
    // Mock to simulate an error when calling Prisma's create method
    jest.spyOn(producerCreateRepository, 'perform').mockRejectedValue(new ProducerCreateError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform(producerCreateData)
    ).rejects.toThrow('Error to create new producer')

    // Check if Prisma's create method was called correctly
    expect(producerCreateRepository.perform).toHaveBeenCalledWith(producerCreateData)
  })

  // it('should handle error when total area is exceeded', async () => {
  //   // Simulate a scenario where the sum of arableArea and vegetationArea is greater than totalArea
  //   const paramsWithExceededArea = {
  //     ...producerCreateData,
  //     arableArea: 150,
  //     vegetationArea: 100
  //   }

  //   // No need to spy on the real call to producerCreateRepository.perform,
  //   // since we expect the if logic to return a ProducerCreateError
  //   // without calling the repository

  //   // Expect the call to perform to result in an error
  //   await expect(
  //     sut.perform(paramsWithExceededArea)
  //   ).rejects.toEqual(new ProducerError(
  //     'The sum of arable area and vegetation must not be greater than the total area of the farm',
  //     '@ProducerCreateService',
  //     400
  //   ))
  // })
})
