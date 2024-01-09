import { type ProducerCreate } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class ProducerCreateService {
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
