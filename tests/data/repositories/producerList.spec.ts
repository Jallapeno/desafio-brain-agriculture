import { ProducerListError } from '@/domain/errors'
import { PrismaClient } from '@prisma/client'
import { ProducerListRepository } from '@/data/contracts/repositories'

describe('ProducerListRepository', () => {
  let sut: ProducerListRepository
  let prismaMock: PrismaClient

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
    prismaMock = new PrismaClient()
    sut = new ProducerListRepository(prismaMock)
  })

  afterEach(async () => {
    await prismaMock.$disconnect()
  })

  it('should call ProducerListRepository to list all producers when Prisma returns data', async () => {
    jest.spyOn(prismaMock.producer, 'findMany').mockResolvedValue([producerData])

    const result = await sut.perform()
    // Check if Prisma's findMany method was called correctly
    expect(prismaMock.producer.findMany).toHaveBeenCalledWith()

    // checks if the findMany function is called only once
    expect(prismaMock.producer.findMany).toHaveBeenCalledTimes(1)

    // Check whether the repository result is as expected
    expect(result).toEqual([producerData])
  })

  it('should handle ProducerListRepository error when Prisma try list all producers', async () => {
    // Mock to simulate an error when calling Prisma's findMany method
    jest.spyOn(prismaMock.producer, 'findMany').mockRejectedValue(new ProducerListError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform()
    ).rejects.toThrow('Error to list all producers')

    // Check if Prisma's findMany method was called correctly
    expect(prismaMock.producer.findMany).toHaveBeenCalledWith()
  })
})
