import { ProducerCreateError } from '@/domain/errors'
import { PrismaClient } from '@prisma/client'
import { ProducerCreateService } from '@/data/services'

describe('ProducerCreateService', () => {
  let sut: ProducerCreateService
  let prismaMock: PrismaClient
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
    prismaMock = new PrismaClient()
    sut = new ProducerCreateService(prismaMock)
  })

  afterEach(async () => {
    await prismaMock.$disconnect()
  })

  it('should call ProducerCreateService with corrects params to create a new producer in the database', async () => {
    // Mock to simulate Prisma's create method
    jest.spyOn(prismaMock.producer, 'create').mockResolvedValue({ ...producerCreateData, id: 1 })

    const result = await sut.perform(producerCreateData)

    // Check if Prisma's create method was called correctly
    expect(prismaMock.producer.create).toHaveBeenCalledWith({
      data: producerCreateData
    })

    // Check whether the service result is as expected
    expect(result).toEqual({ ...producerCreateData, id: 1 })
  })

  it('should handle error when creating a new producer', async () => {
    // Mock to simulate an error when calling Prisma's create method
    jest.spyOn(prismaMock.producer, 'create').mockRejectedValue(new ProducerCreateError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform(producerCreateData)
    ).rejects.toThrow('Error to create new producer')

    // Check if Prisma's create method was called correctly
    expect(prismaMock.producer.create).toHaveBeenCalledWith({
      data: producerCreateData
    })
  })
})
