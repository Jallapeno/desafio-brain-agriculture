import { type ProducerCreate } from '@/domain/features'
import { type PrismaClient } from '@prisma/client'

export class ProducerCreateService {
  constructor (private readonly prisma: PrismaClient) { }

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
