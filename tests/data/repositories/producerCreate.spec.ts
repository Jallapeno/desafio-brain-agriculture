import { ProducerError } from '@/domain/errors'
import { PrismaClient } from '@prisma/client'
import { ProducerCreateRepository } from '@/data/contracts/repositories'

describe('ProducerCreateRepository', () => {
  let sut: ProducerCreateRepository
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
    sut = new ProducerCreateRepository(prismaMock)
  })

  afterEach(async () => {
    await prismaMock.$disconnect()
  })
  it('should call ProducerCreateRepository with corrects params to Prisma create a new producer in the database', async () => {
    // Mock to simulate Prisma's create method
    jest.spyOn(prismaMock.producer, 'create').mockResolvedValue({ ...producerCreateData, id: 1 })

    const result = await sut.perform(producerCreateData)

    // Check if Prisma's create method was called correctly
    expect(prismaMock.producer.create).toHaveBeenCalledWith({
      data: producerCreateData
    })

    // checks if the create function is called only once
    expect(prismaMock.producer.create).toHaveBeenCalledTimes(1)

    // Check whether the service result is as expected
    expect(result).toEqual({ ...producerCreateData, id: 1 })
  })

  it('should handle ProducerCreateRepository error when Prisma try create a new producer in DB', async () => {
    // Mock to simulate an error when calling Prisma's create method
    jest.spyOn(prismaMock.producer, 'create').mockRejectedValue(new ProducerError(
      'Error to create a new producer',
      '@ProducerCreateRepository'
    ))

    // Expect the call to perform to result in an error
    await expect(
      sut.perform(producerCreateData)
    ).rejects.toThrow('Error to create a new producer')

    // Check if Prisma's create method was called correctly
    expect(prismaMock.producer.create).toHaveBeenCalledWith({
      data: producerCreateData
    })
  })
})
