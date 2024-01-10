import { ProducerListError } from '@/domain/errors'
import { PrismaClient } from '@prisma/client'
import { ProducerListService } from '@/data/services'

describe('ProducerListService', () => {
  let sut: ProducerListService
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
    sut = new ProducerListService(prismaMock)
  })

  afterEach(async () => {
    await prismaMock.$disconnect()
  })

  it('should call ProducerListService to list all producers', async () => {
    jest.spyOn(prismaMock.producer, 'findMany').mockResolvedValueOnce([producerData])

    const result = await sut.perform()

    expect(prismaMock.producer.findMany).toHaveBeenCalledWith()

    expect(prismaMock.producer.findMany).toHaveBeenCalledTimes(1)

    expect(result).toEqual([producerData])
  })

  it('should handle error when list all producers', async () => {
    // Mock to simulate an error when calling Prisma's create method
    jest.spyOn(prismaMock.producer, 'findMany').mockRejectedValue(new ProducerListError())

    // Expect the call to perform to result in an error
    await expect(
      sut.perform()
    ).rejects.toThrow('Error to list all producers')

    // Check if Prisma's create method was called correctly
    expect(prismaMock.producer.findMany).toHaveBeenCalledWith()
  })
})
