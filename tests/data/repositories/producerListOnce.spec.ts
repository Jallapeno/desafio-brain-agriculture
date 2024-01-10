import { ProducerListOnceError } from '@/domain/errors'
import { PrismaClient } from '@prisma/client'
import { ProducerListOnceRepository } from '@/data/contracts/repositories'

describe('ProducerListOnceRepository', () => {
  let sut: ProducerListOnceRepository
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
    sut = new ProducerListOnceRepository(prismaMock)
  })

  afterEach(async () => {
    await prismaMock.$disconnect()
  })

  it('should call ProducerListOnceRepository when Prisma returns data', async () => {
    jest.spyOn(prismaMock.producer, 'findUnique').mockResolvedValue(producerData)

    const result = await sut.perform({ id: 1 })

    // Check if Prisma's findUnique method was called correctly
    expect(prismaMock.producer.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })

    // checks if the findUnique function is called only once
    expect(prismaMock.producer.findUnique).toHaveBeenCalledTimes(1)

    // Check whether the repository result is as expected
    expect(result).toEqual(producerData)
  })

  it('Should handle ProducerListOnceRepository error when Prisma try list a producer by id', async () => {
    // Mock to simulate an error when calling Prisma's findUnique method
    jest.spyOn(prismaMock.producer, 'findUnique').mockRejectedValue(new ProducerListOnceError())

    // Expect the call to perform to result in an error
    await expect(
      prismaMock.producer.findUnique({ where: { id: 1 } })
    ).rejects.toThrow('Error to list producer')

    // Check if Prisma's findUnique method was called correctly
    expect(prismaMock.producer.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })
  })
})
