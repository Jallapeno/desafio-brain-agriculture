import { ProducerUpdateError } from '@/domain/errors'
import { PrismaClient } from '@prisma/client'
import { ProducerUpdateService } from '@/data/services'

describe('ProducerUpdateService', () => {
  let sut: ProducerUpdateService
  let prismaMock: PrismaClient
  const producerUpdateData = {
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
    sut = new ProducerUpdateService(prismaMock)
  })

  afterEach(async () => {
    await prismaMock.$disconnect()
  })

  it('should call ProducerUpdateService with corrects params to update a producer by id in the database', async () => {
    jest.spyOn(prismaMock.producer, 'update').mockResolvedValue(producerUpdateData)

    const { id, ...rest } = producerUpdateData
    const result = await sut.perform(id, rest)

    expect(prismaMock.producer.update).toHaveBeenCalledWith({
      where: {
        id
      },
      data: rest
    })

    expect(prismaMock.producer.update).toHaveBeenCalledTimes(1)

    expect(result).toEqual(producerUpdateData)
  })

  it('should handle error when updating a producer by id', async () => {
    jest.spyOn(prismaMock.producer, 'update').mockRejectedValue(new ProducerUpdateError())

    const { id, ...rest } = producerUpdateData

    await expect(
      sut.perform(id, rest)
    ).rejects.toThrow('Error to update a producer')

    expect(prismaMock.producer.update).toHaveBeenCalledWith({
      where: {
        id
      },
      data: rest
    })
  })
})
