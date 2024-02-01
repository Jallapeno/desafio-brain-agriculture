import { ProducerCreateError } from '@/domain/errors'
import { type ProducerCreate } from '@/domain/features'
import { type PrismaService as DbService } from '@/infra'

export class ProducerCreateRepository {
  private readonly dbService: DbService

  constructor (dbService: DbService) {
    this.dbService = dbService
  }

  async perform (params: ProducerCreate.Params): Promise<ProducerCreate.Result> {
    try {
      const result = await this.dbService.createProducer(params)
      return result
    } catch (error) {
      throw new ProducerCreateError()
    }
  }
}
