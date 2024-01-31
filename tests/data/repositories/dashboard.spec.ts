import { DashboardRepository } from '@/data/contracts/repositories'
import { PrismaClient } from '@prisma/client'

describe('DashboardRepository', () => {
  let sut: DashboardRepository
  let prismaMock: PrismaClient
  const dashboard = {
    totalArea: 3000,
    totalFarms: 2,
    agriculturalAndVegetationArea: {
      agriculturable: 200,
      vegetation: 200
    },
    farmsByCulture: {
      any_crop: 2,
      any_crop2: 2,
      any_crop3: 2
    },
    farmsByState: {
      any_state: 2
    }
  }
  const producerData = [{
    id: 1,
    cpfCnpj: 'any_cpf',
    name: 'any_name',
    farmName: 'any_farmname',
    city: 'any_city',
    state: 'any_state',
    totalArea: 1000,
    arableArea: 100,
    vegetationArea: 100,
    crops: ['any_crop', 'any_crop2', 'any_crop3']
  },
  {
    id: 2,
    cpfCnpj: 'any_cpf',
    name: 'any_name',
    farmName: 'any_farmname',
    city: 'any_city',
    state: 'any_state',
    totalArea: 2000,
    arableArea: 100,
    vegetationArea: 100,
    crops: ['any_crop', 'any_crop2', 'any_crop3']
  }]
  beforeEach(() => {
    prismaMock = new PrismaClient()
    sut = new DashboardRepository(prismaMock)
  })

  afterEach(async () => {
    await prismaMock.$disconnect()
  })
  it('should call DashboardRepository to list totalArea and totalFarms when Prisma returns data', async () => {
    jest.spyOn(prismaMock.producer, 'findMany').mockResolvedValue(producerData)

    const result = await sut.perform()
    expect(prismaMock.producer.findMany).toHaveBeenCalledWith()
    expect(prismaMock.producer.findMany).toHaveBeenCalledTimes(1)
    expect(result).toEqual(dashboard)
  })
})
