import { ProducerListOnceError } from '@/domain/errors'
import { PrismaClient } from '@prisma/client'
import { ProducerListOnceService } from '@/data/services'

describe('ProducerListOnceService', () => {
  let sut: ProducerListOnceService
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
    sut = new ProducerListOnceService(prismaMock)
  })

  afterEach(async () => {
    await prismaMock.$disconnect()
  })

  it('should call ProducerListOnceService to list a producer by id', async () => {
    jest.spyOn(prismaMock.producer, 'findUnique').mockResolvedValue(producerData)

    const result = await sut.perform({ id: 1 })

    expect(prismaMock.producer.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })

    expect(prismaMock.producer.findUnique).toHaveBeenCalledTimes(1)

    expect(result).toEqual(producerData)
  })

  it('should handle error when list a producer by id', async () => {
    // Mock to simulate an error when calling Prisma's create method
    jest.spyOn(prismaMock.producer, 'findUnique').mockRejectedValue(new ProducerListOnceError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform({ id: 1 })
    ).rejects.toThrow('Error to list producer')

    // Check if Prisma's create method was called correctly
    expect(prismaMock.producer.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })
  })
})
