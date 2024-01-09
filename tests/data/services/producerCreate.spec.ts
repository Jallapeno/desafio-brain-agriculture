import { type ProducerCreate } from '@/domain/features'
import { PrismaClient } from '@prisma/client'

class ProducerCreateService {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async perform (params: ProducerCreate.Params): Promise<ProducerCreate.Result> {
    try {
      const result = await this.prisma.producer.create({
        data: {
          cpfCnpj: params.cpfCnpj,
          name: params.name,
          farmName: params.farmName,
          city: params.city,
          state: params.state,
          totalArea: params.totalArea,
          arableArea: params.arableArea,
          vegetationArea: params.vegetationArea,
          crops: params.crops
        }
      })

      return result
    } finally {
      await this.prisma.$disconnect()
    }
  }
}

describe('ProducerCreateService', () => {
  let sut: ProducerCreateService
  let prismaMock: PrismaClient

  beforeEach(() => {
    prismaMock = new PrismaClient()
    sut = new ProducerCreateService(prismaMock)
  })

  afterEach(async () => {
    await prismaMock.$disconnect()
  })

  it('should call ProducerCreateService with corrects params to create a new producer in the database', async () => {
    // Mock to simulate Prisma's create method
    jest.spyOn(prismaMock.producer, 'create').mockResolvedValue({
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
    })

    const result = await sut.perform({
      cpfCnpj: 'any_cpf',
      name: 'any_name',
      farmName: 'any_farmname',
      city: 'any_city',
      state: 'any_state',
      totalArea: 100,
      arableArea: 100,
      vegetationArea: 100,
      crops: ['any_crop', 'any_crop2', 'any_crop3']
    })

    // Check if Prisma's create method was called correctly
    expect(prismaMock.producer.create).toHaveBeenCalledWith({
      data: {
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
    })

    // Check whether the service result is as expected
    expect(result).toEqual({
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
    })
  })
})
